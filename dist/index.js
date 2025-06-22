"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const DbService_1 = require("./services/DbService");
const UrlService_1 = require("./services/UrlService");
const chalk_1 = __importDefault(require("chalk"));
const http_1 = __importDefault(require("http"));
const url_1 = require("url");
try {
    const server = http_1.default.createServer(async (req, res) => {
        await (0, DbService_1.connectDb)();
        const { pathname } = (0, url_1.parse)(req.url || '');
        if (req.method === 'POST' && pathname === '/api/shorten') {
            let body = '';
            req.on('data', chunk => {
                body += chunk.toString();
            });
            req.on('end', async () => {
                try {
                    const data = JSON.parse(body);
                    if (!data.url) {
                        res.writeHead(400, { 'Content-Type': 'application/json' });
                        return res.end(JSON.stringify({ error: "Missing 'url' property" }));
                    }
                    const newUrl = await (0, UrlService_1.getShortUrl)(data.url);
                    res.writeHead(200, { 'Content-Type': 'application/json' });
                    res.end(JSON.stringify({ success: true, data: newUrl.toString() }));
                }
                catch (error) {
                    res.writeHead(500, { 'Content-Type': 'application/json' });
                    return res.end(JSON.stringify({ error: "Some error occured on the server, please ty later" }));
                }
            });
        }
    });
}
catch (error) {
    console.error(chalk_1.default.redBright("Error: "), error);
}
