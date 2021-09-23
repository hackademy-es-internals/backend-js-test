"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var getTimestamps = function () {
    return new Date().toISOString();
}; // current date in nice human readable format
var info = function (namespace, message, object) {
    if (object) {
        console.log("[" + getTimestamps() + "] [INFO] [" + namespace + "] " + message, object);
    }
    else {
        console.log("[" + getTimestamps() + "] [INFO] [" + namespace + "] " + message);
    }
};
var warn = function (namespace, message, object) {
    if (object) {
        console.warn("[" + getTimestamps() + "] [WARN] [" + namespace + "] " + message, object);
    }
    else {
        console.warn("[" + getTimestamps() + "] [WARN] [" + namespace + "] " + message);
    }
};
var error = function (namespace, message, object) {
    if (object) {
        console.error("[" + getTimestamps() + "] [ERROR] [" + namespace + "] " + message, object);
    }
    else {
        console.error("[" + getTimestamps() + "] [ERROR] [" + namespace + "] " + message);
    }
};
var debug = function (namespace, message, object) {
    if (object) {
        console.debug("[" + getTimestamps() + "] [DEBUG] [" + namespace + "] " + message, object);
    }
    else {
        console.debug("[" + getTimestamps() + "] [DEBUG] [" + namespace + "] " + message);
    }
};
exports.default = {
    info: info,
    warn: warn,
    error: error,
    debug: debug
};
