"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.connectDb = connectDb;
exports.getDb = getDb;
exports.closeDb = closeDb;
const mongodb_1 = require("mongodb");
const config_1 = __importDefault(require("config"));
let mongoClient;
let db = null;
async function connectDb() {
    if (!config_1.default.has("App.db.mongo.uri")) {
        throw new Error("Mongo URI is not configured!");
    }
    if (!config_1.default.has("App.db.mongo.db")) {
        throw new Error("Mongo DB is not configured!");
    }
    const uri = config_1.default.get("App.db.mongo.uri");
    const dbName = config_1.default.get("App.db.mongo.db");
    mongoClient = new mongodb_1.MongoClient(uri, {
        maxPoolSize: 10,
        connectTimeoutMS: 5000,
        socketTimeoutMS: 30000
    });
    await mongoClient.connect();
    db = mongoClient.db(dbName);
    const redirects = db.collection('redirects');
    await redirects.createIndex({ hash: 1 }, { unique: true });
    return mongoClient;
}
function getDb() {
    if (db === null) {
        throw new Error("Can't use DB before connection! Run connectDb() first!");
    }
    return db;
}
async function closeDb() {
    if (!mongoClient) {
        throw new Error("Connection has not been established, please run connectDb() first");
    }
    await mongoClient.close();
    mongoClient = null;
    db = null;
}
