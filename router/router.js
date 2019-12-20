module.exports = async function(fastify, opts) {
    fastify.get(
      "/api/v1/validateAccessToken",
      {
        preValidation: [fastify.authenticate]
      },
      async function(req, res) {
         res.send({msg: "Successfully Authenticated"});
      }
    )
  }