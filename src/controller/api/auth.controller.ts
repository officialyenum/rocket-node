import { getRepository } from "typeorm"
import { NextFunction, Request, Response } from "express"
import { User } from "../../entity/User"
import * as bcryptjs from "bcryptjs";
import signJWT from '../../services/signJWT';
import { AppDataSource } from "../../data-source";
import hashPass from "../../services/hash";

class AuthController {

    protected userRepository;

    constructor(){
        this.userRepository = AppDataSource.getRepository(User);
    }

    async validateToken (request: Request, response: Response, next: NextFunction) {
        return response.status(200).json({ message: 'Token is valid' });
    };

    async register(request: Request, response: Response, next: NextFunction) {
        const { username, email, firstName, lastName, password } = request.body;
        bcryptjs.hash(password, 10, async (hashError, hash) => {
            if (hashError) {
                return response.status(500).json({
                    message: hashError.message,
                    error: hashError
                });
            }
            const user:User = await this.userRepository.create({
                username: username,
                email: email,
                firstName: firstName,
                lastName: lastName,
                password: hash
            });
            await this.userRepository.save(user).then((data) => {
                signJWT(data, (_error, token) => {
                    if(_error) {
                        return response.status(401).json({
                            message: 'Unauthorized',
                            error: _error
                        });
                    } else if(token){
                        return response.status(201).json({
                            message: 'Created Successfully',
                            token,
                            user: data
                        })
                    }
                })
            });
        })
    }

    async login(request: Request, response: Response, next: NextFunction) {
        const { username, email, password } = request.body;
        if(username){
            this.userRepository.findOneBy({ username: username }).then((user) => {
                if(!user){
                    return response.status(401).json({
                        message: 'Unauthorized'
                    });
                }
                bcryptjs.compare(password, user.password, async (error:Error, result:boolean) => {
                    if (error) {
                        return response.status(401).json({
                            message: 'Unauthorized',
                            error: error
                        });
                    } else if (result) {
                        signJWT(user, (_error:Error, token:string) => {
                            if (_error) {
                                return response.status(401).json({
                                    message: 'Unauthorized',
                                    error: _error
                                });
                            } else if (token) {
                                return response.status(201).json({
                                    message: 'Authenticated Successfully',
                                    token,
                                    user
                                });
                            }
                        })
                    }
                })
            })
        }else if(email){
            this.userRepository.findOneBy({ email: email }).then((user) => {
                if(!user){
                    return response.status(401).json({
                        message: 'Unauthorized'
                    });
                }
                bcryptjs.compare(password, user.password, async (error:Error, result:boolean) => {
                    if (error) {
                        return response.status(401).json({
                            message: 'Unauthorized',
                            error: error
                        });
                    } else if (result) {
                        signJWT(user, (_error:Error, token:string) => {
                            if (_error) {
                                return response.status(401).json({
                                    message: 'Unauthorized',
                                    error: _error
                                });
                            } else if (token) {
                                return response.status(201).json({
                                    message: 'Authenticated Successfully',
                                    token,
                                    user
                                });
                            }
                        })
                    }
                })
            })
        }
    }
}


export default AuthController;