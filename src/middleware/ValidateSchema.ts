import Joi, { ObjectSchema } from 'joi';
import { Request, Response, NextFunction } from 'express';
import { User } from '../entity/User';
import { Game } from '../entity/Game';

export const ValidateSchema = (schema: ObjectSchema) => {
    return async (req: Request, res: Response, next: NextFunction) => {
        try {
            await schema.validateAsync(req.body);
            next();
        } catch (err) {
            return res.status(422).json({
                message: err
            });
        }
    };
};


export const Schemas = {
    user: {
        create: Joi.object<User>({
            username: Joi.string().required()
        }),
        update: Joi.object<User>({
            username: Joi.string().required()
        })
    },
    post: {
        create: Joi.object<Game>({
            name: Joi.string().required(),
            reference: Joi.string()
                .regex(/^[0-9a-fA-F]{24}$/)
                .required()
        }),
        update: Joi.object<Game>({
            name: Joi.string().required(),
            reference: Joi.string()
                .regex(/^[0-9a-fA-F]{24}$/)
                .required()
        })
    }
};
