import jwt from 'jsonwebtoken';
import { config } from '../config/config';
import bcryptjs from "bcryptjs";

const NAMESPACE = 'Auth';
const hashPass = (password: string, callback: (error: Error | null, hash: string | null) => void): void => {
    bcryptjs.hash(password, 10, async (hashError, hash) => {
        if (hashError) {
            callback(hashError, null);
        } else if (hash) {
            callback(null, hash);
        }
    })
};

export default hashPass;