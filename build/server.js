"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var http_1 = __importDefault(require("http"));
var express_1 = __importDefault(require("express"));
var body_parser_1 = __importDefault(require("body-parser"));
var logging_1 = __importDefault(require("./config/logging"));
var config_1 = __importDefault(require("./config/config"));
var sample_1 = __importDefault(require("./routes/sample"));
//declar namespace
var NAMESPACE = 'Server'; // what we use to determine where our logs are coming from
//declare router
var router = (0, express_1.default)(); // what defines api behavior
// logging the request
// inject a middleware for loggig the request
router.use(function (req, res, next) {
    logging_1.default.info(NAMESPACE, "METHOD - [" + req.method + "] URL - [" + req.url + "], IP = [" + req.socket.remoteAddress + "]");
    // access the response
    res.on('finish', function () {
        logging_1.default.info(NAMESPACE, "METHOD - [" + req.method + "] URL - [" + req.url + "], IP = [" + req.socket.remoteAddress + "], STATUS - [" + res.statusCode + "]"); // statusCode is the status we return depending on the route that user picks
    });
    next();
});
// parse the body of the request
router.use(body_parser_1.default.urlencoded({ extended: false })); // allow us to send nested json to our api
router.use(body_parser_1.default.json()); // allow us to not have to call json.parse or json.stringify (react)
// define the rules of our api
router.use(function (req, res, next) {
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
router.use(sample_1.default); // without prefix
// router.use('/sample', myroutes); // with sample prefix
// error handling
router.use(function (req, res, next) {
    var error = new Error('not found');
    return res.status(404).json({
        message: error.message
    });
    next();
});
// create the server
var httpServer = http_1.default.createServer(router);
httpServer.listen(config_1.default.server.port, function () { return logging_1.default.info(NAMESPACE, "Server running on " + config_1.default.server.hostname + ":" + config_1.default.server.port); });
