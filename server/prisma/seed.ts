import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient() 

async function main() {
    const user = await prisma.user.create({
        data: {
            name: 'Luiz Souza',
            email: 'luizin.souza10@gmail.com',
            avatarUrl: 'https://play-lh.googleusercontent.com/ZqSUbqjoUmb-2MpPNkzvh9O0jBiOffhdocrZRwZ2Jliwy3TJ8DawPvjZx_AonSiw7e5p',
        }
    })

    const pool = await prisma.pool.create({
        data: {
            title: 'Example Pool',
            code: 'BOL123',
            ownerId: user.id,

            participants: {
                create: {
                    userId: user.id
                }
            }
        }
    })

    await prisma.game.create({
        data: {
            date: '2022-11-08T12:00:00.201Z',
            // new Data().toISOString() 
            firstTeamCountryCode: 'DE',
            secondTeamCountryCode: 'BR'
        }
    })

    await prisma.game.create({
        data: {
            date: '2022-12-02T12:00:00.201Z',
            firstTeamCountryCode: 'AR',
            secondTeamCountryCode: 'BR',

            guesses: {
                create: {
                    firstTeamPoints: 2,
                    secondTeamPoints: 0,

                    participant: {
                        connect: {
                            userId_poolId: {
                                    userId: user.id,
                                    poolId: pool.id
                            }
                        }
                    }
                }

            }
        }
    })

}

main()