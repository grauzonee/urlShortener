import request from 'supertest';
import { server } from '../src/index';

describe('POST /api/shorten', () => {
    it('returns 400 if url is missing', async () => {
        const res = await request(server)
            .post('/api/shorten')
            .send({});
        expect(res.statusCode).toBe(400);
        expect(res.body.error).toBe("Missing 'url'");
    });
    it('returns hash if URL is provided', async () => {
        const res = await request(server)
            .post('/api/shorten')
            .send({ url: 'https://google.com' });
        expect(res.statusCode).toBe(200);
        expect(res.body.success).toBe(true);
        expect(typeof res.body.hash).toBe('string');
    });
});
