import { Pool } from 'pg';
import config from '../config/env.config';

const pool = new Pool({
	user: config.postgresUser,
	host: config.postgresHost,
	database: config.postgresDB,
	password: config.postgresPassword,
	port: config.postgresPort as unknown as number,
});

pool.on('error', (error: Error): void => {
	console.error(error.message);
	process.exit(-1);
});

// USED WHILE DEBUGGING:
// pool.on('connect', () => {
// 	console.log(
// 		`total: ${pool.totalCount}, idle: ${pool.idleCount}, waiting: ${pool.waitingCount}`
// 	);
// });

export default pool;
