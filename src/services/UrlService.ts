import { getDb } from './DbService';
import { createHash } from 'crypto';

export async function createAlias(originalUrl: string): Promise<string> {
    if (!validateURL(originalUrl)) {
        throw new Error("Invalid URL!");
    }
    let hash = createHash('sha256').update(originalUrl).digest('base64').substring(0, 6);
    const db = getDb();

    try {
        const redirectsCol = db.collection('redirects');
        await redirectsCol.insertOne({ originalUrl: originalUrl, hash: hash });
        return hash;
    } catch (error) {
        if (error.code === 11000) {
            return hash;
        }
        throw error;
    }
}

function validateURL(url: string): Boolean {
    try {
        new URL(url);
        return true;
    } catch (error) {
        return false;
    }
}
