import Product from '../types/product.type';
import pool from '../database';
import { PoolClient } from 'pg';

class ProductModel {
	checkProductExistence = async (
		info: string,
		isName: boolean
	): Promise<boolean | void> => {
		try {
			const client: PoolClient = await pool.connect();
			let sql: string = 'EMPTY SQL QUERY';
			if (isName) {
				sql = 'SELECT * FROM products WHERE name=($1)::VARCHAR';
			} else {
				sql = 'SELECT * FROM products WHERE id=($1)::UUID';
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
				`Product Model: Unable to check ${info}: ${
					(error as Error).message
				}`
			);
		}
	};

	create = async (product: Product): Promise<Product | void> => {
		try {
			const client: PoolClient = await pool.connect();
			let sql: string = 'EMPTY SQL QUERY';
			let sentValues: Array<string | number> = [];
			if (process.env.NODE_ENV === 'test') {
				sql =
					'INSERT INTO products (id, name, price, category) VALUES ($1::UUID, $2::VARCHAR, $3::FLOAT, $4::VARCHAR) RETURNING *';
				sentValues = [
					product.id as string,
					product.name,
					product.price,
					product.category,
				];
			} else {
				sql =
					'INSERT INTO products (name, price, category) VALUES ($1::VARCHAR, $2::FLOAT, $3::VARCHAR) RETURNING *';
				sentValues = [product.name, product.price, product.category];
			}
			const result = await client.query(sql, sentValues);
			client.release();

			return result.rows[0];
		} catch (error) {
			console.error(
				`Product Model: Unable to create ${product.name}: ${
					(error as Error).message
				}`
			);
		}
	};

	show = async (productID: string): Promise<Product | void> => {
		try {
			const client: PoolClient = await pool.connect();
			const sql: string = 'SELECT * FROM products WHERE id=($1)::UUID';
			const result = await client.query(sql, [productID]);
			client.release();

			
			return result.rows[0];
		} catch (error) {
			console.error(
				`Product Model: Unable to show ${productID}: ${
					(error as Error).message
				}`
			);
		}
	};

	
	showAll = async (): Promise<Array<Product> | void> => {
		try {
			const client: PoolClient = await pool.connect();
			const sql: string = 'SELECT * FROM products';
			const result = await client.query(sql);
			client.release();

			
			return result.rows;
		} catch (error) {
			console.error(
				`Product Model: Unable to show products: ${
					(error as Error).message
				}`
			);
		}
	};

	
	update = async (
		productID: string,
		product: Product
	): Promise<Product | void> => {
		try {
			const client: PoolClient = await pool.connect();
			const sql: string =
				'UPDATE products SET name=($2)::VARCHAR, price=($3)::FLOAT, category=($4)::VARCHAR WHERE id=($1)::UUID RETURNING *';
			const result = await client.query(sql, [
				productID,
				product.name,
				product.price,
				product.category,
			]);
			client.release();
			return result.rows[0];
		} catch (error) {
			console.error(
				`Product Model: Unable to update ${productID}: ${
					(error as Error).message
				}`
			);
		}
	};

	
	delete = async (productID: string): Promise<Product | void> => {
		try {
			const client: PoolClient = await pool.connect();
			const sql: string =
				'DELETE FROM products WHERE id=($1)::UUID RETURNING *';
			const result = await client.query(sql, [productID]);
			client.release();
			return result.rows[0];
		} catch (error) {
			console.error(
				`Product Model: Unable to delete ${productID}: ${
					(error as Error).message
				}`
			);
		}
	};
}

export default ProductModel;
