import { MongoClient, Db } from "mongodb";
import config from 'config'

let mongoClient: MongoClient | null;
let db: Db | null = null;

// Function that creates DB connection and should be used only once
export async function connectDb(): Promise<MongoClient> {
    if (!config.has("App.db.mongo.uri")) {
        throw new Error("Mongo URI is not configured!");
    }
    if (!config.has("App.db.mongo.db")) {
        throw new Error("Mongo DB is not configured!");
    }
    const uri = config.get<string>("App.db.mongo.uri");
    const dbName = config.get<string>("App.db.mongo.db");
    mongoClient = new MongoClient(uri, {
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

// Helper function to get connection anywhere needed
export function getDb(): Db {
    if (db === null) {
        throw new Error("Can't use DB before connection! Run connectDb() first!");
    }
    return db;
}

// Close DB connection
export async function closeDb(): Promise<void> {
    if (!mongoClient) {
        throw new Error("Connection has not been established, please run connectDb() first");
    }
    await mongoClient.close();
    mongoClient = null;
    db = null;
}
