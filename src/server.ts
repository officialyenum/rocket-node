import express from 'express';
import { AppDataSource } from "./data-source"
import expressLayouts from 'express-ejs-layouts';
import * as path from 'path';
import * as routes from './routes';
import { User } from "./entity/User"
import { createServer } from "http";
import SocketIO from './library/socket';
import { config } from './config/config';
import RabbitMQ from './library/rabbitMQ';
import { Message } from 'amqplib';

const data = config.database;
console.log(`${data}`);

AppDataSource.initialize().then(() => {
    console.log("DB CONNECTED");
    //connect rabbit MQ;
    const rabbitMQ = new RabbitMQ();
    rabbitMQ.init(async (err, channel) => {
        if (err) {
            throw new Error(err.message);
        }
        console.log("CONNECTED TO RABBIT MQ");
        channel.assertQueue('get_user',{durable:false});
        channel.assertQueue('created_user',{durable:false});
        // create express app
        const app = express();

        // Setup express layouts
        app.use(expressLayouts);
        app.set('layout', 'layouts/layout');
        app.set('view engine', 'ejs');

        // Setup static files
        app.set('views', path.join(__dirname, 'views')); // specify the views directory
        app.use(express.static(path.join(__dirname, 'public'))); // specify the static assets directory


        /** Register Routes */
        routes.register(app);

        const PORT = process.env.SERVER_PORT || 3000;
        /** Register Sockets */
        const httpServer = createServer(app);
        const socketIO = new SocketIO();
        const io = socketIO.init(httpServer);
        
        routes.registerSocket(io);

        channel.consume('get_user',(msg:Message|null) => {
            console.log('message consumed');
            console.log(msg.content.toString());
        })
        // Listen to server
        httpServer.listen(PORT, () => {
            // tslint:disable-next-line:no-console
            console.log(`Server started at http://localhost:${PORT}`);
        });
        
        if(process.env.CREATE_TEST_USER === "true"){
            console.log("creating new users");
            await AppDataSource.manager.save(
                AppDataSource.manager.create(User, {
                    username: "t_saw",
                    email: "timber@saw.com",
                    firstName: "Timber",
                    lastName: "Saw",
                    password: "$2a$10$znoTGuELHhUssBTcUsaY9eutfZ3Vt/oskAqgs7srKwwpDy6njyo8S"
                })
            )

            await AppDataSource.manager.save(
                AppDataSource.manager.create(User, {
                    username: "p_assassin",
                    email: "phantom@assassin.com",
                    firstName: "Phantom",
                    lastName: "Assassin",
                    password: "$2a$10$fAEw7eWg7bsWSABuLUUFVuChP6SXt5bFFAZTTn.q9qTGRZB9Vrmw2"
                })
            )
        }

        console.log("Express server has started on port 3000. Open http://localhost:3000/users to see results")
        process.on('beforeExit',() => {
            console.log('closing connection');
            rabbitMQ.getConnection().close();
        })      
    })
            
            
}).catch(error => console.log(error))
