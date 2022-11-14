import * as amqp from "amqplib/callback_api";
import dotenv from "dotenv";

dotenv.config();
let mqChannel:amqp.Channel;
let mqConnection:amqp.Connection
export default class RabbitMQ {
    
    public getConnection = () => {
        if (!mqConnection) {
            throw new Error("Connection not available");
        }
        return mqConnection;
    }

    public getChannel = () => {
        if (!mqChannel) {
            throw new Error("channel not available");
        }
        return mqChannel;
    }

    public init = (callback: (error: Error | null, channel:amqp.Channel | null) => void): void => {
    
        try {
            //connect rabbit MQ;
            amqp.connect(process.env.RABBIT_MQ_URL,(err0:any, connection:amqp.Connection)=>{
                if(err0){
                    throw new Error(err0);
                }
                mqConnection = connection;
                mqConnection.createChannel(async (err1:any, channel:amqp.Channel) => {
                    if (err1) {
                        throw new Error(err1);
                    }
                    mqChannel = channel;
                    callback(null, channel);
                })
            });
            
        } catch (err: any) {
            callback(err, null);
        }
    };
};