import { Request } from 'express';
import OrderModel from '../../models/order.model';
import Datetime from '../../types/datetime.type';
import Order from '../../types/order.type';


export const setDateAndTime = async (
	req: Request,
	dateTime?: string,
	dateTimeReadable?: string
): Promise<Request> => {
	const currentDateObject: Date = new Date();

	if (!dateTime) {
		dateTime = currentDateObject.toISOString();
	}
	if (!dateTimeReadable) {
		dateTimeReadable = currentDateObject.toString();
	}

	req.body.date_time = dateTime;
	req.body.date_time_readable = dateTimeReadable;

	return req;
};


export const getDateAndTime = async (orderID: string): Promise<Datetime> => {
	const orderModel = new OrderModel();

	const order: Order = (await orderModel.show(orderID)) as Order;

	const result: Datetime = {
		date_time: '',
		date_time_readable: '',
	};
	if (!order) {
		result.date_time = (order as Order).date_time as string;
		result.date_time_readable = (order as Order)
			.date_time_readable as string;
	}

	return result;
};
