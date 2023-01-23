import { io, Manager, Socket } from "socket.io-client"
import { useCallback, useEffect } from 'react';

var BasicIO = (() => {
    var hookcount = 0;
    var done = false;
    const socket = io('http://localhost:8080', {
        autoConnect: true
    });
    const bundled = [];

    const setup = (hook) => {
        if (bundled.length > 10)
            bundled = [];
        bundled.push(hook);
        hookcount = bundled.length - 1;
        console.log(bundled.length);
    }

    const proseecHook = (data) => {

        bundled[hookcount].call(null, data);

    }
    socket.on('chat', (data) => {
        console.log(data);
        proseecHook(data);
    })

    var send = (message) => {
        socket.emit('chat', message);
    }
    var getdone = () => {
        return done;
    }

    return {
        issetup: getdone,
        sendMessage: send,
        setrecive: setup,
    }
})()

export default BasicIO