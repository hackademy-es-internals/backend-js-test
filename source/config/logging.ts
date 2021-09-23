const getTimestamps = (): string => {
    return new Date().toISOString();
}; // current date in nice human readable format

const info = (namespace: string, message: string, object?: any) => {
    if (object) {
        console.log(`[${getTimestamps()}] [INFO] [${namespace}] ${message}`, object);
    } else {
        console.log(`[${getTimestamps()}] [INFO] [${namespace}] ${message}`);
    }
};

const warn = (namespace: string, message: string, object?: any) => {
    if (object) {
        console.warn(`[${getTimestamps()}] [WARN] [${namespace}] ${message}`, object);
    } else {
        console.warn(`[${getTimestamps()}] [WARN] [${namespace}] ${message}`);
    }
};

const error = (namespace: string, message: string, object?: any) => {
    if (object) {
        console.error(`[${getTimestamps()}] [ERROR] [${namespace}] ${message}`, object);
    } else {
        console.error(`[${getTimestamps()}] [ERROR] [${namespace}] ${message}`);
    }
};

const debug = (namespace: string, message: string, object?: any) => {
    if (object) {
        console.debug(`[${getTimestamps()}] [DEBUG] [${namespace}] ${message}`, object);
    } else {
        console.debug(`[${getTimestamps()}] [DEBUG] [${namespace}] ${message}`);
    }
};

export default {
    info,
    warn,
    error,
    debug
};
