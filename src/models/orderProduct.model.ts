// import { DEFAULT_ORDER_PRODUCT } from './../constants/orderProduct.type.constant';
import { PoolClient } from 'pg';
import pool from '../database';
// import Order from '../types/order.type';
import OrderProduct from '../types/orderProduct.type';

class OrderProductsModel {
	addProduct = async (
		orderID: string,
		orderProduct: OrderProduct
	): Promise<OrderProduct | void> => {
		try {
			const client: PoolClient = await pool.connect();

			let sql: string = 'EMPTY SQL QUERY';
			let sentValues: Array<string | number> = [];

			sql =
				'UPDATE orders SET products_ids=ARRAY_APPEND(products_ids, ($2)::UUID), products_quantities=ARRAY_APPEND(products_quantities, ($3)::INTEGER) WHERE id=($1)::UUID RETURNING *';
			sentValues = [
				orderID,
				orderProduct.product_id,
				orderProduct.product_quantity,
			];

			await client.query(sql, sentValues);

			sql =
				'INSERT INTO order_products (order_id, product_id, product_quantity, date_time, date_time_readable) VALUES ($1::UUID, $2::UUID, $3::INTEGER, $4::TIMESTAMPTZ, $5::VARCHAR) RETURNING *';
			sentValues = [
				orderID,
				orderProduct.product_id,
				orderProduct.product_quantity,
				orderProduct.date_time as string,
				orderProduct.date_time_readable as string,
			];

			const result = await client.query(sql, sentValues);

			client.release();

			return result.rows[0];
		} catch (error) {
			console.error(
				`OrderProduct Model: Unable to add product ${
					orderProduct.product_id
				} into ${orderID}: ${(error as Error).message}`
			);
		}
	};

	showProduct = async (
		orderID: string,
		productID: string
	): Promise<OrderProduct | void> => {
		try {
			const client: PoolClient = await pool.connect();
			const sql =
				'SELECT * FROM order_products WHERE order_id=($1)::UUID AND product_id=($2)::UUID';
			const result = await client.query(sql, [orderID, productID]);

			client.release();

			return result.rows[0];
		} catch (error) {
			console.error(
				`OrderProduct Model: Unable to show product ${productID} within ${orderID}: ${
					(error as Error).message
				}`
			);
		}
	};

	
	showAllProducts = async (
		orderID: string
	): Promise<Array<OrderProduct> | void> => {
		try {
			const client: PoolClient = await pool.connect();
			const sql =
				'SELECT * FROM order_products WHERE order_id=($1)::UUID';
			const result = await client.query(sql, [orderID]);
			client.release();

			return result.rows;
		} catch (error) {
			console.error(
				`OrderProduct Model: Unable to show products within ${orderID}: ${
					(error as Error).message
				}`
			);
		}
	};
}

export default OrderProductsModel;
