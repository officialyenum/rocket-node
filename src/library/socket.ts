import { Server, Socket } from "socket.io";
import { DefaultEventsMap } from "socket.io/dist/typed-events";

let io: Server<DefaultEventsMap, DefaultEventsMap, DefaultEventsMap, any>;
const sockets: Socket<DefaultEventsMap, DefaultEventsMap, DefaultEventsMap, any>[] = []
export default class SocketIO {
    public init = (httpServer:any) => {
        io = new Server(httpServer,{
            cors: {
                origin: '*',
            }
        });
        return io;
    }

    public getIO = () => {
        if (!io) {
            throw new Error("Socket IO not initialized");
        }
        return io;
    }

    public setSocket = () => {
        
    }

    public getSocket = () => {

    }
};