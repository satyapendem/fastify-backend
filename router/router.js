/**
 * Author: Satya
 * @param {*} fastify 
 * Router
 */

async function Router(fastify){

    fastify.get('/routeValidation',{
        preValidation:[fastify.jwtauthentication]
    }, async (req,res)=>{
        res.status(200).send({msg: "Successfully authenticated"});
    })

}

module.exports = Router;