"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getShortUrl = getShortUrl;
const DbService_1 = require("./DbService");
const crypto_1 = require("crypto");
const config_1 = __importDefault(require("config"));
const mongodb_1 = require("mongodb");
async function getShortUrl(originalUrl) {
    if (!validateURL(originalUrl)) {
        throw new Error("Invalid URL!");
    }
    let hash = (0, crypto_1.createHash)('sha256').update(originalUrl).digest('base64').substring(0, 6);
    const db = (0, DbService_1.getDb)();
    try {
        const redirectsCol = db.collection('redirects');
        await redirectsCol.insertOne({ originalUrl: originalUrl, hash: hash });
        if (!config_1.default.has('App.baseUrl')) {
            throw new Error('Property baseUrl is not set in the configuration file!');
        }
        return new URL(hash, config_1.default.get('App.baseUrl'));
    }
    catch (error) {
        if (error instanceof mongodb_1.MongoError) {
            if (error.code === 11000) {
                return new URL(hash, config_1.default.get('App.baseUrl'));
            }
        }
        throw error;
    }
}
function validateURL(url) {
    try {
        new URL(url);
        return true;
    }
    catch (error) {
        return false;
    }
}
