import { io } from "socket.io-client"


var BasicIO = function(){
    const socket = io('http://localhost:8080', {
        autoConnect: true
    });
    var getsocket=()=>{
        return socket;
    }
    return {
        socket:getsocket
    }
}

export default BasicIO;