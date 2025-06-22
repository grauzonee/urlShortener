"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const DbService_1 = require("../../src/services/DbService");
const config_1 = __importDefault(require("config"));
const mongodb_1 = require("mongodb");
jest.mock('config', () => ({
    has: jest.fn(),
    get: jest.fn()
}));
test("db before connection should be null", () => {
    expect((0, DbService_1.getDb)()).rejects.toThrow("Can't use DB before connection! Run connectDb() first!");
});
test("Connect to DB without configured URI should throw an exception", async () => {
    config_1.default.has.mockImplementation((key) => {
        return key === "App.db.mongo.db";
    });
    await expect((0, DbService_1.connectDb)()).rejects.toThrow("Mongo URI is not configured!");
});
test("Connect to DB without configured DB should throw an exception", async () => {
    config_1.default.has.mockImplementation((key) => {
        return key === "App.db.mongo.uri";
    });
    await expect((0, DbService_1.connectDb)()).rejects.toThrow("Mongo DB is not configured!");
});
test("Connection to DB should return MongoClient when configurations are OK", async () => {
    expect.assertions(1);
    const conn = await (0, DbService_1.connectDb)();
    expect(conn).toBeInstanceOf(mongodb_1.MongoClient);
});
test("db after connection should not be null", () => {
    const db = (0, DbService_1.getDb)();
    expect(db).toBeInstanceOf(mongodb_1.Db);
});
test("Close connection", async () => {
    expect.assertions(1);
    await (0, DbService_1.closeDb)();
    const db = (0, DbService_1.getDb)();
    expect(db).toBeNull();
});
