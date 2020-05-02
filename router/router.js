/**
 * Author: Satya
 * @param {*} fastify 
 * Router
 */
const boom = require('boom');
const pdf = require('html-pdf');

async function Router(fastify){

    fastify.get('/routeValidation',{
        preValidation:[fastify.jwtauthentication]
    }, async (req,res)=>{
        res.status(200).send({msg: "Successfully authenticated"});
    });


    fastify.post('/htmltopdf', async (req, res)=>{
        try {
            let {html} = req.body;
            if(!html){
                res.status(400).send({msg:"html string is mandatory"});
                return;
            }
            pdf.create(html).toBuffer(function(err, buffer){
                if(err){
                    res.status(500).send({msg:"Error while converting to pdf",error: err});
                    return;
                }
                res.type('application/pdf');
                res.status(200).send(buffer);
              });
        } catch (error) {
            throw boom.boomify(error);
        }
    })

}

module.exports = Router;