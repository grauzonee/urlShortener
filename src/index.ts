import { connectDb, getDb, closeDb } from './services/DbService';
import chalk from 'chalk';

try {
    await connectDb();
} catch (error) {
    console.error(chalk.redBright("Error: "), error);
}
