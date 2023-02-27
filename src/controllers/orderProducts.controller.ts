import { Request, Response } from 'express';
import OrderProductModel from '../models/orderProduct.model';
import OrderProduct from '../types/orderProduct.type';
import * as productsController from './products.controller';
import * as ordersController from './orders.controller';
import {
	getDateAndTime,
	setDateAndTime,
} from '../helpers/modules/datetime.modules';
import Datetime from '../types/datetime.type';


const orderProductModel = new OrderProductModel();

export const addProductController = async (
	req: Request,
	res: Response
): Promise<void> => {
	try {
		const isProductFound: boolean =
			(await productsController.checkExistenceController(
				req
			)) as unknown as boolean;

		if (!isProductFound) {
			res.status(404)
				.json({
					status: 'Error 404: Not Found',
					message: 'Product is NOT found.',
				})
				.end();
			return;
		}

		const isOrderFound: boolean =
			(await ordersController.checkExistenceController(
				req
			)) as unknown as boolean;

		if (!isOrderFound) {
			res.status(404)
				.json({
					status: 'Error 404: Not Found',
					message: 'Order is NOT found.',
				})
				.end();
			return;
		}

		const isOrderCompleted: boolean =
			(await ordersController.checkStatusController(
				req
			)) as unknown as boolean;

		if (isOrderCompleted) {
			res.status(405)
				.json({
					status: 'Error 405: Method Not Allowed',
					message: 'Order had been completed.',
				})
				.end();
			return;
		}

		const result: Datetime = await getDateAndTime(req.params.orderID);

		req = await setDateAndTime(
			req,
			result.date_time as string,
			result.date_time_readable as string
		);

		const orderProduct: OrderProduct = (await orderProductModel.addProduct(
			req.params.orderID as string,
			req.body
		)) as OrderProduct;

		if (!orderProduct) {
			res.status(500)
				.json({
					status: 'Error 500: Internal Server Error',
					orderProduct: {},
					message: `Unable to add product no. ${req.body.product_id} into order no. ${req.params.orderID}`,
				})
				.end();
			return;
		}

		res.status(200)
			.json({
				status: '200 Ok',
				orderProduct: orderProduct,
				message: 'Product added successfully to the order.',
			})
			.end();
		return;
	} catch (error) {
		console.error(
			`OrderProduct Controller: Error while adding new product to order: ${
				(error as Error).message
			}`
		);
	}
};

export const showProductController = async (
	req: Request,
	res: Response
): Promise<void> => {
	try {
		const orderProduct: OrderProduct = (await orderProductModel.showProduct(
			req.params.orderID,
			req.params.productID
		)) as OrderProduct;

		if (!orderProduct) {
			res.status(500)
				.json({
					status: 'Error 500: Internal Server Error',
					orderProduct: {},
					message: `Unable to show product no. ${req.params.productID} within order no. ${req.params.orderID}`,
				})
				.end();
			return;
		}

		res.status(200)
			.json({
				status: '200 Ok',
				orderProduct: orderProduct,
				message: 'Product shown successfully from the order.',
			})
			.end();
		return;
	} catch (error) {
		console.error(
			`OrderProduct Controller: Error while showing product from order: ${
				(error as Error).message
			}`
		);
	}
};


export const showAllProductsController = async (
	req: Request,
	res: Response
): Promise<void> => {
	try {
		const orderProducts: Array<OrderProduct> =
			(await orderProductModel.showAllProducts(
				req.params.orderID
			)) as Array<OrderProduct>;

		if (!orderProducts) {
			res.status(500)
				.json({
					status: 'Error 500: Internal Server Error',
					orderProducts: {},
					message: `Unable to show products within order no. ${req.params.orderID}`,
				})
				.end();
			return;
		}

		res.status(200)
			.json({
				status: '200 Ok',
				totalProductsInOrder: orderProducts.length,
				orderProducts: orderProducts,
				message: 'Products shown successfully from the order.',
			})
			.end();
		return;
	} catch (error) {
		console.error(
			`OrderProduct Controller: Error while showing products from order: ${
				(error as Error).message
			}`
		);
	}
};
