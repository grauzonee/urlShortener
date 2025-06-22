console.log('here');
import { connectDb, getDb, closeDb } from './services/DbService';
import { getShortUrl } from './services/UrlService';
import chalk from "chalk";
import http from "http";
import { parse } from "url";

const server = http.createServer(async (req, res) => {

    const { pathname } = parse(req.url || '');
    if (req.method === 'POST' && pathname === '/api/shorten') {
        let body = '';
        req.on('data', chunk => {
            body += chunk.toString();
        });
        req.on('end', async () => {
            try {
                const data = JSON.parse(body);
                console.log("Received data:");
                console.log(data);
                if (!data.url) {
                    res.writeHead(400, { 'Content-Type': 'application/json' });
                    return res.end(JSON.stringify({ error: "Missing 'url' property" }));
                }
                const newUrl = await getShortUrl(data.url);
                res.writeHead(200, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ success: true, data: newUrl.toString() }))
            } catch (error) {
                res.writeHead(500, { 'Content-Type': 'application/json' });
                if (error instanceof Error) {
                    return res.end(JSON.stringify({ error: "Some error occured on the server, please try later" + error.message }));
                }
            }
        });
    }
});
const PORT = 3000;
const SHUTDOWN_TIMEOUT = 10000;
async function start() {
    await connectDb();
    server.listen(PORT, () => {
        console.log("Listening on port " + PORT);
    });
    setupShutdownHandlers();
}

async function gracefulShutdown() {
    console.log("Starting graceful shutdown...");
    const shutdownPromises: Promise<void>[] = [];
    shutdownPromises.push(new Promise((resolve) => {
        server.close(() => {
            console.log("Server was successfully stopped");
            resolve();
        });
    }));
    shutdownPromises.push(
        closeDb().then(() => { console.log("DB connection was successfully closed") })
            .catch(err => console.error(chalk.redBright("Error when closing DB: "), err))
    );

    await Promise.race([Promise.all(shutdownPromises), new Promise((_, reject) => setTimeout(() => reject(new Error("Shutdown timeout")), SHUTDOWN_TIMEOUT))])
        .catch(err => {
            console.error('Shutdown error:', err);
            throw err;
        });

    console.log('Shutdown completed successfully');
}

function setupShutdownHandlers() {
    const handleShutdown = async () => {
        try {
            await gracefulShutdown();
            process.exit(0);
        } catch (err) {
            console.error("Gracefull shutdown failed: ", err);
            process.exit(1);
        }
    }
    process.on('SIGTERM', handleShutdown);
    process.on('SIGINT', handleShutdown);

    process.on('uncaughtException', async (err) => {
        console.error('Uncaught exception: ', err);
        await gracefulShutdown();
        process.exit(1);
    });
}

start().catch(err => {
    console.error('Failed to start server:', err);
    process.exit(1);
});

