import { Request, Response } from 'express';
import Order from '../types/order.type';
import OrderModel from '../models/order.model';
import { setDateAndTime } from '../helpers/modules/datetime.modules';


const orderModel = new OrderModel();

export const checkExistenceController = async (
	req: Request
): Promise<boolean | void> => {
	try {
		const orderIdWithinBody: boolean = req.body.order_id ? true : false;
		let info: string = req.body.order_id;

		let idWithinBody: boolean = false;
		if (!orderIdWithinBody) {
			idWithinBody = req.body.id ? true : false;
			info = req.body.id;

			if (!idWithinBody) {
				info = req.params.orderID;
			}
		}

		const isFound: boolean = (await orderModel.checkOrderExistence(
			info
		)) as boolean;

		return isFound;
	} catch (error) {
		console.error(
			`Order Controller: Error while checking order: ${
				(error as Error).message
			}`
		);
	}
};

export const checkStatusController = async (
	req: Request
): Promise<boolean | void> => {
	try {
		const orderIdWithinBody: boolean = req.body.order_id ? true : false;
		let info: string = req.body.order_id;

		let idWithinBody: boolean = false;
		if (!orderIdWithinBody) {
			idWithinBody = req.body.id ? true : false;
			info = req.body.id;

			if (!idWithinBody) {
				info = req.params.orderID;
			}
		}

		const isCompleted: boolean = (await orderModel.checkOrderStatus(
			info
		)) as boolean;

		return isCompleted;
	} catch (error) {
		console.error(
			`Order Controller: Error while checking order status: ${
				(error as Error).message
			}`
		);
	}
};

export const createController = async (
	req: Request,
	res: Response
): Promise<void> => {
	try {
		const isFound: boolean = (await checkExistenceController(
			req
		)) as unknown as boolean;

		if (isFound) {
			res.status(409)
				.json({
					status: 'Error 409: Conflict',
					message: 'Order id already exists.',
				})
				.end();
			return;
		}
		req = await setDateAndTime(req);
		const order: Order = (await orderModel.create(req.body)) as Order;
		if (!order) {
			res.status(500)
				.json({
					status: 'Error 500: Internal Server Error',
					order: {},
					message: `Unable to create order for user no. ${req.body.user_id}`,
				})
				.end();
			return;
		}

		res.status(201)
			.json({
				status: '201 Created',
				order: order,
				message: 'Order created successfully.',
			})
			.end();
		return;
	} catch (error) {
		console.error(
			`Order Controller: Error while creating new order: ${
				(error as Error).message
			}`
		);
	}
};

export const showController = async (
	req: Request,
	res: Response
): Promise<void> => {
	try {
		const isFound: boolean = (await checkExistenceController(
			req
		)) as unknown as boolean;

		if (!isFound) {
			res.status(404)
				.json({
					status: 'Error 404: Not Found',
					message: 'Order is NOT found.',
				})
				.end();
			return;
		}

		const order: Order = (await orderModel.show(
			req.params.orderID
		)) as Order;

		if (!order) {
			res.status(500)
				.json({
					status: 'Error 500: Internal Server Error',
					order: {},
					message: `Unable to show order no. ${req.params.orderID}`,
				})
				.end();
			return;
		}

		res.status(200)
			.json({
				status: '200 Ok',
				order: order,
				message: 'Order shown successfully.',
			})
			.end();
		return;
	} catch (error) {
		console.error(
			`Order Controller: Error while showing order: ${
				(error as Error).message
			}`
		);
	}
};


export const showAllController = async (
	_req: Request,
	res: Response
): Promise<void> => {
	try {
		const orders: Array<Order> =
			(await orderModel.showAll()) as Array<Order>;

		if (!orders) {
			res.status(500)
				.json({
					status: 'Error 500: Internal Server Error',
					orders: {},
					message: 'Unable to show orders.',
				})
				.end();
			return;
		}

		res.status(200)
			.json({
				status: '200 Ok',
				totalOrders: orders?.length,
				orders: orders,
				message: 'Orders shown successfully.',
			})
			.end();
		return;
	} catch (error) {
		console.error(
			`Order Controller: Error while showing orders: ${
				(error as Error).message
			}`
		);
	}
};

export const updateController = async (
	req: Request,
	res: Response
): Promise<void> => {
	try {
		const isFound: boolean = (await checkExistenceController(
			req
		)) as unknown as boolean;

		if (!isFound) {
			res.status(404)
				.json({
					status: 'Error 404: Not Found',
					message: 'Order is NOT found.',
				})
				.end();
			return;
		}

		const isCompleted: boolean = (await checkStatusController(
			req
		)) as unknown as boolean;

		if (isCompleted) {
			res.status(405)
				.json({
					status: 'Error 405: Method Not Allowed',
					message: 'Order had been completed.',
				})
				.end();
			return;
		}

		const order: Order = (await orderModel.updateOrderStatus(
			req.params.orderID,
			req.body.is_done
		)) as Order;

		if (!order) {
			res.status(500)
				.json({
					status: 'Error 500: Internal Server Error',
					order: {},
					message: `Unable to update status of order no. ${req.params.orderID}`,
				})
				.end();
			return;
		}

		res.status(200)
			.json({
				status: '200 Ok',
				order: order,
				message: 'Order status updated successfully.',
			})
			.end();
		return;
	} catch (error) {
		console.error(
			`Order Controller: Error while updating order: ${
				(error as Error).message
			}`
		);
	}
};

export const deleteController = async (
	req: Request,
	res: Response
): Promise<void> => {
	try {
		const isFound: boolean = (await checkExistenceController(
			req
		)) as unknown as boolean;

		if (!isFound) {
			res.status(404)
				.json({
					status: 'Error 404: Not Found',
					message: 'Order is NOT found.',
				})
				.end();
			return;
		}

		const order: Order = (await orderModel.delete(
			req.params.orderID
		)) as Order;

		if (!order) {
			res.status(500)
				.json({
					status: 'Error 500: Internal Server Error',
					order: {},
					message: `Unable to delete order no. ${req.params.orderID}`,
				})
				.end();
			return;
		}

		res.status(200)
			.json({
				status: '200 Ok',
				order: order,
				message: 'Order deleted successfully.',
			})
			.end();
		return;
	} catch (error) {
		console.error(
			`Order Controller: Error while deleting order: ${
				(error as Error).message
			}`
		);
	}
};
