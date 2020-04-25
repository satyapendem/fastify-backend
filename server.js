/**
 * Author: Satya
 * Fastify server setup
 */

const fastify = require('fastify')({ logger: true });
const boom = require('boom');

const Socket = require('./controller/socketController');
//const Router = require('./router/router');
const Swagger = require('./swagger_options');
fastify.register(require('fastify-cors'), {
    origin: "*"
});
fastify.register(require('fastify-jwt'), {
    secret: "test@#$%$"
})
//swagger configuration
fastify.register(require('fastify-swagger'), Swagger.options);

fastify.addContentTypeParser('application/json', { parseAs: 'string' }, (req, body, done) => {
    try {
        const json = JSON.parse(body);
        done(null, json);
    } catch (err) {
        err.statusCode = 400;
        done(err, undefined);
    }
});

//fastify websocket
fastify.register(require('fastify-ws'));

fastify.register(require('./middleware/auth_middleware'));
fastify.register(require('./router/authRouter'));

fastify.post('/insertData', async (req, res) => {
    try {
        let { params } = req.body;
        res.status(200).send({ msg: "received data" });
    } catch (error) {
        throw boom.boomify(error);
    }
})

fastify.get('/demo/:id', {
    schema: {
        description: "Demo API route",
        tags: ['Demo'],
        summary: '',
        params: {
            description: "Id for demo API",
            type: 'object',
            properties: {
                id: { type: "number" }
            }
        },
        response: {
            200: {
                description: "Success Response",
                type: 'object',
                properties: {
                    hello: { type: "string" },
                    hai: { type: "string" },
                    images: {
                        type: "array",
                        items: {
                            type: "string"
                        }
                    },
                    objArr: {
                        type: "array",
                        keys: {type: "string"},
                        items:{
                            type: "object",
                            properties:{
                                hello: {type: "string"},
                                hai: {type: "string"}
                            }
                        }
                    }

                }
            }
        }
    }

}, async (req, res) => {
    res.status(200).send({ hello: "hello", hai: "hai", images: ["url1", "url2"], objArr: [{ hello: "hello", hai: "hai" }] });
})

fastify.register(require('./router/router'));



const start = async () => {
    try {
        await fastify.listen(5008);
        fastify.ws.on('connection', Socket.connect);
        fastify.swagger();
        fastify.log.info(`Server started at ${fastify.server.address().port}`);
    } catch (error) {
        fastify.log.error(error);
        process.exit(1);
    }
}
start();