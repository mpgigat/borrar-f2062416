import  express from 'express'
import cors from 'cors'
import http from 'http'
import * as io from "socket.io"
import { socketController } from "../sockets/controller.js";
class Server{
    constructor(){
        this.app=express();
        this.port=process.env.PORT;
        //this.port=3000
        this.server=http.createServer(this.app)
        this.io= new io.Server(this.server)

        this.middlewares();

        this.routes();
        this.sockets();

    }
  
    sockets(){
        this.io.on('connection',socketController)
    }

    middlewares(){
        this.app.use(cors());
        
        this.app.use(express.static('public'));        
    }

    routes(){   }

    listen(){
        this.server.listen(this.port ,()=>{
            console.log(`Servidor corriendo en el puerto ${this.port}`);
        });
    }
}

//module.exports=Server;
export {Server}