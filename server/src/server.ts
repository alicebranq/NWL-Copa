import Fastify from "fastify";

async function bootstrap() {
    // criando o servidor
    const fastify = Fastify({
        logger: true,
    })

    // se http://localhost:3333/pools/count, então:
    fastify.get('/pools/count', () => {
        return { count: 0 }
    }),

    await fastify.listen({port:3333})

} 

bootstrap() 