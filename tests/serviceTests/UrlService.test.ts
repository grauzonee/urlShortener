import { connectDb, getDb, closeDb } from '../../src/services/DbService';
import { getShortUrl } from '../../src/services/UrlService';

beforeAll(async () => {
    await connectDb();
});
afterAll(async () => {
    await closeDb();
});

test('Invalid URL should throw an error', async () => {
    expect.assertions(1);
    await expect(getShortUrl("invalid")).rejects.toThrow("Invalid URL!");
});

test('Valid url should produce a hash', async () => {
    expect.assertions(1);
    const hash = await getShortUrl("https://google.com");
    expect(hash).toBeInstanceOf(URL);
});

test('THe same original URL should produce the same hashes', async () => {
    expect.assertions(1);
    const hash = await getShortUrl("https://google.com");
    const hash1 = await getShortUrl("https://google.com");
    expect(hash.toString()).toEqual(hash1.toString());
});
