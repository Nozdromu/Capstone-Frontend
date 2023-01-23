import { io, Manager, Socket } from "socket.io-client"
import { useCallback } from 'react';

var BasicIO = (() => {
    const socket = io('http://localhost:8080', {
        autoConnect: true
    });
    const bundled = [];
    const setup = (callback) => {
        bundled.push(callback);
  
    }
    socket.on('chat', (data) => {
        bundled[0].apply(data);
    })
    // socket.on('connect', (res) => {
    //     console.log(socket);
    // })
    // socket.emit('success',{data:'aaaa'});
    // socket.on('success',(data)=>{
    //     console.log(data);
    // })
    var send = (message) => {
        socket.emit('chat', message);
    }

    return {
        sendMessage: send,
        setrecive:setup
    }
})()

export default BasicIO