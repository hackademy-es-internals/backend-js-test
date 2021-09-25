import { Request, Response, NextFunction } from 'express';
import logging from '../config/logging';
import jwt from 'jsonwebtoken';
import config from '../config/config';

const NAMESPACE = 'Auth';

const extractJWT = (req: Request, res: Response, next: NextFunction) => {
    logging.info(NAMESPACE, 'Valid token');
    // req.headers.authorization
    // warning: split ' ' not ''
    // Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6IkdyYWNpYSIsImlhdCI6MTYzMjU2NDY0MywiZXhwIjozMjY1NDg5Mjg2LCJpc3MiOiJjb29sSXNzdWVyIn0.gbvP3weOwftC9ucROwx_mvjiL9Kt1ebtL_HiB9hmrX4
    // [0] Bearer
    // [1] token
    let token = req.headers.authorization?.split(' ')[1];

    if (token) {
        jwt.verify(token, config.server.token.secret, (error, decoded) => {
            if (error) {
                return res.status(404).json({
                    message: error.message,
                    error
                });
            } else {
                // we can pass along our decoded to our endpoint using res.locals, a clever way to go ahead and save variables and pass them along to functions or middlewares that are going to be using this payload next
                res.locals.jwt = decoded;
                // save the token decoded, go ahead and pass that along
                next();
            }
        });
    } else {
        return res.status(401).json({
            message: 'Unauthorized'
        });
    }
};

export default extractJWT;
