import { Request, Response } from 'express';
import Dashboard from '../services/dashboard.services';
import OrdersPerUser from '../types/dashboard/ordersPerUser.type';
import ProductsInOrder from '../types/dashboard/productsInOrder.type';
import TopProduct from '../types/dashboard/topProduct.type';

const dashboard = new Dashboard();


export const showProductsInOrdersController = async (
	_req: Request,
	res: Response
): Promise<void> => {
	try {
		const productsInOrders: Array<ProductsInOrder> =
			(await dashboard.showProductsInOrders()) as Array<ProductsInOrder>
		if (!productsInOrders) {
			res.status(500)
				.json({
					status: 'Error 500: Internal Server Error',
					productsInOrders: {},
					message: 'Unable to show products in orders.',
				})
				.end();
			return;
		}

		res.status(200)
			.json({
				status: '200 Ok',
				totalProductsInOrders: productsInOrders.length,
				productsInOrders: productsInOrders,
				message: 'Products in orders shown successfully.',
			})
			.end();
		return;
	} catch (error) {
		console.error(
			`Dashboard Controller: Error while showing products in orders: ${
				(error as Error).message
			}`
		);
	}
};


export const showRecentOrdersPerUserController = async (
	req: Request,
	res: Response
): Promise<void> => {
	try {
		const userID: string = req.params.userID;

		const ordersPerUser: Array<OrdersPerUser> =
			(await dashboard.showOrdersPerUser(userID)) as Array<OrdersPerUser>;

		if (!ordersPerUser) {
			res.status(500)
				.json({
					status: 'Error 500: Internal Server Error',
					ordersPerUser: {},
					message: 'Unable to show orders per user.',
				})
				.end();
			return;
		}
		res.status(200)
			.json({
				status: '200 Ok',
				recentOrders: ordersPerUser,
				message: 'Orders per user shown successfully.',
			})
			.end();
		return;
	} catch (error) {
		console.error(
			`Dashboard Controller: Error while showing orders per user: ${
				(error as Error).message
			}`
		);
	}
};

export const showTopProductsController = async (
	_req: Request,
	res: Response
): Promise<void> => {
	try {
		const topProducts: Array<TopProduct> =
			(await dashboard.showTopProducts()) as Array<TopProduct>;

		if (!topProducts) {
			res.status(500)
				.json({
					status: 'Error 500: Internal Server Error',
					topProducts: {},
					message: 'Unable to show top products.',
				})
				.end();
			return;
		}

		res.status(200)
			.json({
				status: '200 Ok',
				topProducts: topProducts,
				message: 'Top products shown successfully.',
			})
			.end();
		return;
	} catch (error) {
		console.error(
			`Dashboard Controller: Error while showing top products: ${
				(error as Error).message
			}`
		);
	}
};
