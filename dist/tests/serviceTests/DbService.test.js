"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var DbService_1 = require("../../src/services/DbService");
var config_1 = __importDefault(require("config"));
var mongodb_1 = require("mongodb");
jest.mock('config', function () { return ({
    has: jest.fn(),
    get: jest.fn()
}); });
test("db before connection should be null", function () {
    expect((0, DbService_1.getDb)()).rejects.toThrow("Can't use DB before connection! Run connectDb() first!");
});
test("Connect to DB without configured URI should throw an exception", function () { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                config_1.default.has.mockImplementation(function (key) {
                    return key === "App.db.mongo.db";
                });
                return [4 /*yield*/, expect((0, DbService_1.connectDb)()).rejects.toThrow("Mongo URI is not configured!")];
            case 1:
                _a.sent();
                return [2 /*return*/];
        }
    });
}); });
test("Connect to DB without configured DB should throw an exception", function () { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                config_1.default.has.mockImplementation(function (key) {
                    return key === "App.db.mongo.uri";
                });
                return [4 /*yield*/, expect((0, DbService_1.connectDb)()).rejects.toThrow("Mongo DB is not configured!")];
            case 1:
                _a.sent();
                return [2 /*return*/];
        }
    });
}); });
test("Connection to DB should return MongoClient when configurations are OK", function () { return __awaiter(void 0, void 0, void 0, function () {
    var conn;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                expect.assertions(1);
                return [4 /*yield*/, (0, DbService_1.connectDb)()];
            case 1:
                conn = _a.sent();
                expect(conn).toBeInstanceOf(mongodb_1.MongoClient);
                return [2 /*return*/];
        }
    });
}); });
test("db after connection should not be null", function () {
    var db = (0, DbService_1.getDb)();
    expect(db).toBeInstanceOf(mongodb_1.Db);
});
test("Close connection", function () { return __awaiter(void 0, void 0, void 0, function () {
    var db;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                expect.assertions(1);
                return [4 /*yield*/, (0, DbService_1.closeDb)()];
            case 1:
                _a.sent();
                db = (0, DbService_1.getDb)();
                expect(db).toBeNull();
                return [2 /*return*/];
        }
    });
}); });
