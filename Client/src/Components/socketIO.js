import { io, Manager, Socket } from "socket.io-client"
import { useCallback,useEffect } from 'react';

var BasicIO = (() => {
    var hookcount=0;
    var done = false;
    const socket = io('http://localhost:8080', {
        autoConnect: true
    });
    const bundled = [];
    const setup = (hook) => {
        bundled.push(hook);
    }
    socket.on('chatback', (data) => {
        console.log(data);
        bundled[hookcount].apply();
        hookcount++;
    })

    var send = (message) => {
        socket.emit('chat', message);
    }   
    var getdone=()=>{
        return done;
    }

    return {
        issetup: getdone,
        sendMessage: send,
        setrecive: setup
    }
})()

export default BasicIO