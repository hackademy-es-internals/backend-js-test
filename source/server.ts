import http from 'http';
import express from 'express';
import bodyParser from 'body-parser';
import logging from './config/logging';
import conf from './config/config';
import bookRoutes from './routes/book';
import userRoutes from './routes/user';
import mongooose from 'mongoose';

//declar namespace
const NAMESPACE = 'Server'; // what we use to determine where our logs are coming from
//declare router
const router = express(); // what defines api behavior

// Connect to Mongo
mongooose
    .connect(conf.mongo.url, conf.mongo.options)
    .then((resutl) => {
        logging.info(NAMESPACE, `Connected to Mongo`);
    })
    .catch((error) => {
        logging.error(NAMESPACE, error.message, error);
    });
// logging the request
// inject a middleware for loggig the request
router.use((req, res, next) => {
    logging.info(NAMESPACE, `METHOD - [${req.method}] URL - [${req.url}], IP = [${req.socket.remoteAddress}]`);
    // access the response
    res.on('finish', () => {
        logging.info(NAMESPACE, `METHOD - [${req.method}] URL - [${req.url}], IP = [${req.socket.remoteAddress}], STATUS - [${res.statusCode}]`); // statusCode is the status we return depending on the route that user picks
    });

    next();
});

// parse the body of the request
router.use(bodyParser.urlencoded({ extended: false })); // allow us to send nested json to our api
router.use(bodyParser.json()); // allow us to not have to call json.parse or json.stringify (react)

// define the rules of our api
router.use((req, res, next) => {
    res.header('Access-Controle-Allow-Origin', '*'); // only in local development, in production better use ip predefined
    res.header('Access-Controle-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');

    if (req.method == 'OPTIONS') {
        // OPTION???
        res.header('Access-Control-Allow-Methods', 'GET PATCH DELETE POST PUT');
        return res.status(200).json({});
    }

    next();
});

// define routes
router.use('/books', bookRoutes); // with prefix
router.use('/users', userRoutes); // with prefix
// router.use('/sample', bookRoutes); // with sample prefix

// error handling
router.use((req, res, next) => {
    const error = new Error('not found');

    return res.status(404).json({
        message: error.message
    });

    next();
});

// create the server
const httpServer = http.createServer(router);
httpServer.listen(conf.server.port, () => logging.info(NAMESPACE, `Server running on ${conf.server.hostname}:${conf.server.port}`));
