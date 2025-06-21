import { assert } from 'console';
import { connectDb, getDb, closeDb } from '../../src/services/DbService';
import config from 'config';
import { MongoClient, Db } from 'mongodb';

jest.mock('config', () => ({
    has: jest.fn(),
    get: jest.fn()
}));

test("db before connection should be null", () => {
    const db = getDb();
    expect(db).toBeUndefined();
});

test("Connect to DB without configured URI should throw an exception", async () => {
    (config.has as jest.Mock).mockImplementation((key: string) => {
        return key === "App.db.mongo.db";
    });
    await expect(connectDb()).rejects.toThrow("Mongo URI is not configured!");
});

test("Connect to DB without configured DB should throw an exception", async () => {
    (config.has as jest.Mock).mockImplementation((key: string) => {
        return key === "App.db.mongo.uri";
    });
    await expect(connectDb()).rejects.toThrow("Mongo DB is not configured!");
});

test("Connection to DB should return MongoClient when configurations are OK", async () => {
    (config.has as jest.Mock).mockImplementation((key: string) => {
        return true;
    });
    (config.get as jest.Mock).mockImplementation((key: string) => {
        if (key == "App.db.mongo.uri") {
            return "mongodb://localhost:27017";
        }
        if (key == "App.db.mongo.db") {
            return "urlShortener";
        }
    });
    expect.assertions(1)
    const conn = await connectDb();
    expect(conn).toBeInstanceOf(MongoClient);
});

test("db after connection should not be null", () => {
    const db = getDb();
    expect(db).toBeInstanceOf(Db);
});

test("Close connection", async () => {
    expect.assertions(1);
    await closeDb();
    const db = getDb();
    expect(db).toBeNull();
}); 
