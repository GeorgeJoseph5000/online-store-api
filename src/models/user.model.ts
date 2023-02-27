import User from '../types/user.type';
import pool from '../database';
import { PoolClient } from 'pg';
import { encrypt } from '../helpers/guards/encrypt';
import { compare } from '../helpers/guards/compare';

class UserModel {
	checkUserExistence = async (
		info: string,
		isEmail: boolean
	): Promise<boolean | void> => {
		try {
			const client: PoolClient = await pool.connect();
			let sql: string = 'EMPTY SQL QUERY';
			if (isEmail) {
				sql = 'SELECT * FROM users WHERE email=($1)::VARCHAR';
			} else {
				sql = 'SELECT * FROM users WHERE id=($1)::UUID';
			}
			const result = await client.query(sql, [info]);
			client.release();

			let isFound = false;
			if (result.rows[0]) {
				isFound = true;
			}

			return isFound;
		} catch (error) {
			console.error(
				`User Model: Unable to check ${info}: ${
					(error as Error).message
				}`
			);
		}
	};

	create = async (user: User): Promise<User | void> => {
		try {
			const client: PoolClient = await pool.connect();
			let sql: string = 'EMPTY SQL QUERY';
			let sentValues: Array<string> = [];
			if (process.env.NODE_ENV === 'test') {
				sql =
					'INSERT INTO users (id, first_name, last_name, user_name, email, password) VALUES ($1::UUID, $2::VARCHAR, $3::VARCHAR, $4::VARCHAR, $5::VARCHAR, $6::VARCHAR) RETURNING *';
				sentValues = [
					user.id as string,
					user.first_name,
					user.last_name,
					user.user_name,
					user.email,
					encrypt(user.password),
				];
			} else {
				sql =
					'INSERT INTO users (first_name, last_name, user_name, email, password) VALUES ($1::VARCHAR, $2::VARCHAR, $3::VARCHAR, $4::VARCHAR, $5::VARCHAR) RETURNING *';
				sentValues = [
					user.first_name,
					user.last_name,
					user.user_name,
					user.email,
					encrypt(user.password),
				];
			}
			const result = await client.query(sql, sentValues);


			client.release();
			return result.rows[0];
		} catch (error) {
			console.error(
				`User Model: Unable to create ${user.user_name}: ${
					(error as Error).message
				}`
			);
		}
	};


	show = async (userID: string): Promise<User | void> => {
		try {
			const client: PoolClient = await pool.connect();
			const sql: string = 'SELECT * FROM users WHERE id=($1)::UUID';
			const result = await client.query(sql, [userID]);
			client.release();
			return result.rows[0];
		} catch (error) {
			console.error(
				`User Model: Unable to show ${userID}: ${
					(error as Error).message
				}`
			);
		}
	};

	showAll = async (): Promise<Array<User> | void> => {
		try {
			const client: PoolClient = await pool.connect();
			const sql: string = 'SELECT * FROM users';
			const result = await client.query(sql);
			client.release();
			return result.rows;
		} catch (error) {
			console.error(
				`User Model: Unable to show users: ${(error as Error).message}`
			);
		}
	};

	update = async (userID: string, user: User): Promise<User | void> => {
		try {
			const client: PoolClient = await pool.connect();
			const sql: string =
				'UPDATE users SET first_name=($2)::VARCHAR, last_name=($3)::VARCHAR, user_name=($4)::VARCHAR, email=($5)::VARCHAR, password=($6)::VARCHAR WHERE id=($1)::UUID RETURNING *';
			const result = await client.query(sql, [
				userID,
				user.first_name,
				user.last_name,
				user.user_name,
				user.email,
				encrypt(user.password),
			]);
			client.release();
			return result.rows[0];
		} catch (error) {
			console.error(
				`User Model: Unable to update ${userID}: ${
					(error as Error).message
				}`
			);
		}
	};

	delete = async (userID: string): Promise<User | void> => {
		try {
			const client: PoolClient = await pool.connect();
			const sql: string =
				'DELETE FROM users WHERE id=($1)::UUID RETURNING *';
			const result = await client.query(sql, [userID]);
			client.release();
			return result.rows[0];
		} catch (error) {
			console.error(
				`User Model: Unable to delete ${userID}: ${
					(error as Error).message
				}`
			);
		}
	};

	authenticate = async (
		email: string,
		password: string
	): Promise<User | void> => {
		try {
			const client: PoolClient = await pool.connect();
			const sql: string = 'SELECT * FROM users WHERE email=($1)::VARCHAR';
			const result = await client.query(sql, [email]);
			client.release();

			if (result.rowCount > 0) {
				const hashedPassword: string = result.rows[0]['password'];
				const isPasswordValid = compare(password, hashedPassword);
				if (isPasswordValid) {
					return result.rows[0];
				}
			} else {
				console.log('User Model: Unable to authenticate user');
			}
		} catch (error) {
			console.error(
				`User Model: Unable to login ${email}: ${
					(error as Error).message
				}`
			);
		}
	};
}

export default UserModel;
