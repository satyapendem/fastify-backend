/**
 * Socket Controller
 */

 const client={};
class SocketController{

    connect(ws, req){
        let url = req.url;
        url = url.replace('/',"");
        client[url] = ws;
        console.log("Client connected");
        let refThis = this;
        ws.on('message', (data)=>{
            if(!data)
                return;
            console.log("Data received: ", data);
            data = JSON.parse(data);
            let {clientId} = data;
            let socket = client[clientId];
            if(socket){
                socket.send(JSON.stringify({msg: `Hi ${clientId}`}));
            } 

            //ws.send(JSON.stringify({msg:"Hi client message received!!!"}))
           

        })

    }

    publishMessage(data){
        let {clientId} = data;
        if(!clientId)
            return;
        let socket = client[clientId];
        if(socket){
            socket.send(JSON.stringify({msg: `Hi ${clientId}`}));
        }    

    }
}

module.exports = new SocketController();