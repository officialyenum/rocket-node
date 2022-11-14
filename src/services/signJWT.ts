import jwt from 'jsonwebtoken';
import { config } from '../config/config';

const NAMESPACE = 'Auth';
const signJWT = (user: any, callback: (error: Error | null, token: string | null) => void): void => {
    const timeSinchEpoch = new Date().getTime();
    const expirationtime = timeSinchEpoch + Number(config.token.expireTime) * 100000;
    const expirationTimeInSeconds = Math.floor(expirationtime / 1000);

    try {
        jwt.sign(
            {
                _id: user._id.toString(),
                username: user.username
            },
            config.token.secret,
            {
                issuer: config.token.issuer,
                algorithm: 'HS256',
                expiresIn: expirationTimeInSeconds
            },
            (error:Error|null, token:string|undefined) => {
                if (error) {
                    callback(error, null);
                } else if (token) {
                    callback(null, token);
                }
            }
        );
    } catch (err: any) {
        callback(err, null);
    }
};

export default signJWT;
