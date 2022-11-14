
import { NextFunction, Request, Response } from "express"
import { User } from "../../entity/User"
import bcryptjs from "bcryptjs";
import signJWT from '../../services/signJWT';
import { AppDataSource } from "../../data-source";
import { DataSource } from "typeorm";
import RabbitMQ from "../../library/rabbitMQ";

const userRepository = AppDataSource.getRepository(User);
const rabbitMQ = new RabbitMQ();
class UserController {
    
    public async all(request: Request, response: Response, next: NextFunction) {
        const users = await userRepository.find()
        // const users:User[] = await AppDataSource.getRepository(User).createQueryBuilder("user").getMany()
        return response.status(201).json({
            status: true,
            message: 'Retrieved Users Successfully',
            data: users
        })
    }


    public async one(request: Request, response: Response, next: NextFunction) {
        const _id:number = parseInt(request.params.id)
        const user = await userRepository.findOneBy({ id: _id })
        const channel = rabbitMQ.getChannel();
        channel.sendToQueue('get_user', Buffer.from(JSON.stringify(user)));
        return response.status(201).json({
            status: true,
            message: 'Retrieved User Successfully',
            data: user
        })
    }

    public async create(request: Request, response: Response, next: NextFunction) {
        const user = await userRepository.save(request.body)
        const channel = rabbitMQ.getChannel();
        channel.sendToQueue('created_user', Buffer.from(JSON.stringify(user)));
        return response.status(201).json({
            status: true,
            message: 'Created User Successfully',
            data: user
        })
    }

    public async update(request: Request, response: Response, next: NextFunction) {
        const _id:number = parseInt(request.params.id)
        const user:User = await userRepository.findOneBy({ id: _id })
        userRepository.merge(user, request.body);
        await userRepository.save(user).then((newUser) => {
            return response.status(201).json({
                status: true,
                message: 'Updated Successfully',
                data: newUser
            })
        }).catch((err) => {
            return response.status(500).json({
                status: false,
                message: 'An Error Occurred Updating User',
                error: err
            })
        });
    }

    public async delete(request: Request, response: Response, next: NextFunction) {
        const _id:number = parseInt(request.params.id)
        let userToRemove = await userRepository.findOneBy({ id: _id })
        const user = await userRepository.remove(userToRemove)
        return response.status(201).json({
            status: true,
            message: 'Deleted User Successfully',
            data: user
        })
    }

    public async me(request: Request, response: Response, next: NextFunction) {
        const _id:number = response.locals.jwt._id;
        const user = await userRepository.findOneBy({ id: _id })
        return response.status(201).json({
            status: true,
            message: 'Retrieved User Successfully',
            data: user
        })
    }

}

export default UserController;