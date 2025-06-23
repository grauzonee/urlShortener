import { getDb } from './DbService';
import { createHash } from 'crypto';
import config from 'config';
import { MongoError } from 'mongodb';

// Create hash for an incoming url
export async function getShortUrl(originalUrl: string): Promise<URL> {
    if (!validateURL(originalUrl)) {
        throw new Error("Invalid URL!");
    }
    let hash = createHash('sha256').update(originalUrl).digest('base64').substring(0, 6);
    const db = getDb();

    try {
        const redirectsCol = db.collection('redirects');
        await redirectsCol.insertOne({ originalUrl: originalUrl, hash: hash });
        if (!config.has('App.baseUrl')) {
            throw new Error('Property baseUrl is not set in the configuration file!');
        }
        return new URL(hash, config.get('App.baseUrl'));
    } catch (error) {
        if (error instanceof MongoError) {
            if (error.code === 11000) {
                return new URL(hash, config.get('App.baseUrl'));
            }
        }

        throw error;
    }
}

// Find document in DB and create URL where use should be redirected to
export async function getRedirectUrl(hash: string): Promise<URL> {
    const cleanHash = hash.replace(/\//g, "");
    const db = getDb();
    const redirects = db.collection('redirects');
    const dbEntity = await redirects.findOne({ hash: cleanHash });
    if (dbEntity) {
        return new URL(dbEntity.originalUrl);
    }
    return new URL('/not-found', config.get('App.baseUrl'));
}

// Helper function to validate incoming URL
function validateURL(url: string): Boolean {
    try {
        new URL(url);
        return true;
    } catch (error) {
        return false;
    }
}
