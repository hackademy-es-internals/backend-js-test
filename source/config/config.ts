import dotenv from 'dotenv';

dotenv.config();

const MONGO_OPTIONS = {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    socketTimeoutMS: 3000,
    keepAlive: true,
    // poolSize: 50, is not supported
    autoIndex: false
    // retryWrites: false
};
//mongodb+srv://nico:toor@cluster0.m6xs4.mongodb.net/books?retryWrites=true&w=majority

const MONGO_USERNAME = process.env.MONGO_USERNAME || 'nico';
const MONGO_PASSWORD = process.env.MONGO_PASSWORD || 'toor';
const MONGO_HOST = process.env.MONGO_URL || 'cluster0.m6xs4.mongodb.net/books?retryWrites=true&w=majority';

const MONGO = {
    host: MONGO_HOST,
    username: MONGO_USERNAME,
    password: MONGO_PASSWORD,
    options: MONGO_OPTIONS,
    url: `mongodb+srv://${MONGO_USERNAME}:${MONGO_PASSWORD}@${MONGO_HOST}`
};

const SERVER_HOSTNAME = process.env.SERVER_HOSTNAME || 'localhost';
const SERVER_PORT = process.env.SERVER_PORT || 1337;

const SERVER = {
    hostname: SERVER_HOSTNAME,
    port: SERVER_PORT
};

const config = {
    mongo: MONGO,
    server: SERVER
};
// allow to access all of the variable defined above from inside another file type something like config.server.port
export default config;
