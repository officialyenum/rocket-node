import express from 'express';
import cors from "cors";
import webRoutes from './web';
import apiRoutes from './api';
import { Server } from 'socket.io';
import { emitOnlineUsers } from './broadcast';
import SocketIO from '../library/socket';

export const register = (app: express.Application) => {
    // Logging middleware
    app.use(cors({
        origin:"*"
    }))
    app.use((req, res, next) => {
        console.log(`Incoming -> Method: [${req.method}] - url : [${req.url}] - IP: [${req.socket.remoteAddress}]`);

        res.on('finish', () => {
            /** Log the response */
            console.log(`Outgoing -> Method: [${req.method}] - url : [${req.url}] - IP: [${req.socket.remoteAddress}] - Status: [${res.statusCode}]`);
        });
        next();
    });
    // Setup routes
    app.use(express.urlencoded({ extended: true }));
    app.use(express.json());
    /** Rules of our API */
    app.use((req, res, next) => {
        res.header('Access-Control-Allow-Origin', '*');
        res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
        if (req.method === 'OPTIONS') {
            res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
            return res.status(200).json({});
        }
        next();
    });

    // Setup Web routes in 'src/routes/web.ts'
    app.use('/', webRoutes);

    // Setup Api routes in 'src/routes/api.ts'
    app.use('/api', apiRoutes);

    /** Error Handling */
    app.use((req, res, next) => {
        const error = new Error('Not found');
        return res.status(404).json({
            message: error.message
        });
    });
};

const sockets = new Set();
const socketIO = new SocketIO();

export const registerSocket = (io:Server) => {
    io.on("connection", (socket) => {
        // ...
        console.log(`connected to`);
        sockets.add(socket.id);
        console.log(`${socket.id} user connected`);
        socket.on('disconnect', () => {
            if(sockets.has(socket.id)){
                sockets.delete(socket.id);
            }
            emitOnlineUsers(io, sockets)
            console.log('user disconnected');
        });
        console.log(`${sockets.size}`);
        emitOnlineUsers(io, sockets)
    });
};
