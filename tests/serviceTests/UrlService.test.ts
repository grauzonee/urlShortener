import { connectDb, getDb, closeDb } from '../../src/services/DbService';
import { createAlias } from '../../src/services/UrlService';

beforeAll(async () => {
    await connectDb();
});
afterAll(async () => {
    await closeDb();
});

test('Invalid URL should throw an error', async () => {
    expect.assertions(1);
    await expect(createAlias("invalid")).rejects.toThrow("Invalid URL!");
});

test('Valid url should produce a hash', async () => {
    expect.assertions(1);
    const hash = await createAlias("https://google.com");
    expect(hash).toMatch(/^[a-zA-Z0-9]+$/);
});

test('THe same original URL should produce the same hashes', async () => {
    expect.assertions(1);
    const hash = await createAlias("https://google.com");
    const hash1 = await createAlias("https://google.com");
    expect(hash).toEqual(hash1);
});
