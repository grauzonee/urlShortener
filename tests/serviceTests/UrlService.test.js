"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const DbService_1 = require("../../src/services/DbService");
const UrlService_1 = require("../../src/services/UrlService");
beforeAll(async () => {
    await (0, DbService_1.connectDb)();
});
afterAll(async () => {
    await (0, DbService_1.closeDb)();
});
test('Invalid URL should throw an error', async () => {
    expect.assertions(1);
    await expect((0, UrlService_1.getShortUrl)("invalid")).rejects.toThrow("Invalid URL!");
});
test('Valid url should produce a hash', async () => {
    expect.assertions(1);
    const hash = await (0, UrlService_1.getShortUrl)("https://google.com");
    expect(hash).toBeInstanceOf(URL);
});
test('THe same original URL should produce the same hashes', async () => {
    expect.assertions(1);
    const hash = await (0, UrlService_1.getShortUrl)("https://google.com");
    const hash1 = await (0, UrlService_1.getShortUrl)("https://google.com");
    expect(hash.toString()).toEqual(hash1.toString());
});
