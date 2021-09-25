const getTimestamps = (): string => {
    return new Date().toISOString();
}; // current date in nice human readable format

const info = (namespace: string, message: string, object?: any) => {
    printLog(namespace, message, 'INFO', object);
};

const warn = (namespace: string, message: string, object?: any) => {
    printLog(namespace, message, 'WARN', object);
};

const error = (namespace: string, message: string, object?: any) => {
    printLog(namespace, message, 'ERROR', object);
};

const debug = (namespace: string, message: string, object?: any) => {
    printLog(namespace, message, 'DEBUG', object);
};

const printLog = (namespace: string, message: string, type: string, object?: any) => {
    if (object) {
        console.log(`[${getTimestamps()}] [${type}] [${namespace}] ${message}`, object);
    } else {
        console.log(`[${getTimestamps()}] [${type}] [${namespace}] ${message}`);
    }
};

export default {
    info,
    warn,
    error,
    debug
};
