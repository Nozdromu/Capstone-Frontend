import { io, Manager, Socket } from "socket.io-client"

var BasicIO = (() => {
    const socket = io( {
        withCredentials: true,
        transports: ['websocket'],
        path: '/chat/', // added this line of code
    });
    console.log(socket);
    socket.on('connection', (res) => {
        console.log(res);
        socket.emit('success', 'back to server');
    })
    socket.emit('success','hello');
})()

export default BasicIO