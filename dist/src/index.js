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
exports.server = void 0;
var DbService_1 = require("./services/DbService");
var UrlService_1 = require("./services/UrlService");
var chalk_1 = __importDefault(require("chalk"));
var http_1 = __importDefault(require("http"));
var url_1 = require("url");
exports.server = http_1.default.createServer(function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var pathname, body_1, redirectUrl;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                console.log(req);
                pathname = (0, url_1.parse)(req.url || '').pathname;
                if (req.method === 'POST' && pathname === '/api/shorten') {
                    body_1 = '';
                    req.on('data', function (chunk) {
                        body_1 += chunk.toString();
                    });
                    req.on('end', function () { return __awaiter(void 0, void 0, void 0, function () {
                        var data, newUrl, error_1;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0:
                                    _a.trys.push([0, 2, , 3]);
                                    data = JSON.parse(body_1);
                                    if (!data.url) {
                                        res.writeHead(400, { 'Content-Type': 'application/json' });
                                        res.end(JSON.stringify({ error: "Missing 'url' property" }));
                                    }
                                    return [4 /*yield*/, (0, UrlService_1.getShortUrl)(data.url)];
                                case 1:
                                    newUrl = _a.sent();
                                    res.writeHead(200, { 'Content-Type': 'application/json' });
                                    res.end(JSON.stringify({ success: true, data: newUrl.toString() }));
                                    return [3 /*break*/, 3];
                                case 2:
                                    error_1 = _a.sent();
                                    console.error("Error occurred in try: ", error_1);
                                    res.writeHead(500, { 'Content-Type': 'application/json' });
                                    if (error_1 instanceof Error) {
                                        return [2 /*return*/, res.end(JSON.stringify({ error: "Some error occured on the server, please try later" + error_1.message }))];
                                    }
                                    return [3 /*break*/, 3];
                                case 3: return [2 /*return*/];
                            }
                        });
                    }); });
                }
                if (req.method === 'GET' && pathname === '/not-found') {
                    res.writeHead(404, { 'Content-Type': 'application/json' });
                    return [2 /*return*/, res.end(JSON.stringify({ message: "Sorry, this URL is invalid..." }))];
                }
                if (!(req.method === 'GET' && pathname !== '')) return [3 /*break*/, 2];
                return [4 /*yield*/, (0, UrlService_1.getRedirectUrl)(pathname)];
            case 1:
                redirectUrl = _a.sent();
                res.writeHead(302, { Location: redirectUrl.toString() });
                res.end('You are being redirected..');
                _a.label = 2;
            case 2: return [2 /*return*/];
        }
    });
}); });
var PORT = 3000;
var SHUTDOWN_TIMEOUT = 10000;
function start() {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, (0, DbService_1.connectDb)()];
                case 1:
                    _a.sent();
                    exports.server.listen(PORT, function () {
                        console.log("Listening on port " + PORT);
                    });
                    setupShutdownHandlers();
                    return [2 /*return*/];
            }
        });
    });
}
function gracefulShutdown() {
    return __awaiter(this, void 0, void 0, function () {
        var shutdownPromises;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    console.log("Starting graceful shutdown...");
                    shutdownPromises = [];
                    shutdownPromises.push(new Promise(function (resolve) {
                        exports.server.close(function () {
                            console.log("Server was successfully stopped");
                            resolve();
                        });
                    }));
                    shutdownPromises.push((0, DbService_1.closeDb)().then(function () { console.log("DB connection was successfully closed"); })
                        .catch(function (err) { return console.error(chalk_1.default.redBright("Error when closing DB: "), err); }));
                    return [4 /*yield*/, Promise.race([Promise.all(shutdownPromises), new Promise(function (_, reject) { return setTimeout(function () { return reject(new Error("Shutdown timeout")); }, SHUTDOWN_TIMEOUT); })])
                            .catch(function (err) {
                            console.error('Shutdown error:', err);
                            throw err;
                        })];
                case 1:
                    _a.sent();
                    console.log('Shutdown completed successfully');
                    return [2 /*return*/];
            }
        });
    });
}
function setupShutdownHandlers() {
    var _this = this;
    var handleShutdown = function () { return __awaiter(_this, void 0, void 0, function () {
        var err_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, gracefulShutdown()];
                case 1:
                    _a.sent();
                    process.exit(0);
                    return [3 /*break*/, 3];
                case 2:
                    err_1 = _a.sent();
                    console.error("Gracefull shutdown failed: ", err_1);
                    process.exit(1);
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    }); };
    process.on('SIGTERM', handleShutdown);
    process.on('SIGINT', handleShutdown);
    process.on('uncaughtException', function (err) { return __awaiter(_this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    console.error('Uncaught exception: ', err);
                    return [4 /*yield*/, gracefulShutdown()];
                case 1:
                    _a.sent();
                    process.exit(1);
                    return [2 /*return*/];
            }
        });
    }); });
}
console.log(require.main);
if (require.main === module) {
    start().catch(function (err) {
        console.error('Failed to start server:', err);
        process.exit(1);
    });
}
