import * as dotenv from 'dotenv';
import * as fs from 'fs';

export const appConfig = dotenv.parse(fs.readFileSync('.env'));
