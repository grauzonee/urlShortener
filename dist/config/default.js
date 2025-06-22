"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = {
    App: {
        baseUrl: "http://localhost:3000",
        db: {
            mongo: {
                uri: "mongodb://root:example@localhost:27017/urlShortener?authSource=admin",
                db: "urlShortener"
            }
        }
    }
};
