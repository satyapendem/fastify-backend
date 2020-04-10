/**
 * Author: Satya
 * @param {*} fastify 
 * Router
 */
const boom = require('boom');
async function AuthRouter(fastify){

    fastify.post('/api/v1/generateAccessToken', async (req,res)=>{
        try {
            const {email, userid, password} = req.body;
            if(!email || !userid || !password){
                res.status(400).send({error: true,msg: "Manadatory params are missing"});
                return;
            }
            // //DB checks
            // let userData = await db.query("SELECT email from user where user_id=?",[userid]);
            // if(userData && userData.lenth>0){
            //     //generate JWT
            // }
         const token = fastify.jwt.sign({email, userid, password}, {expiresIn: 86400});
         res.status(200).send({token, email})
        } catch (error) {
            throw boom.boomify(error);
        }
    })

}

module.exports = AuthRouter;