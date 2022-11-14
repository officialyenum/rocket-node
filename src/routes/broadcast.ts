import { Server } from 'socket.io';

export const emitOnlineUsers = (io:Server, sockets:Set<String|unknown>) => {
    io.emit("online-users", sockets.size);
};