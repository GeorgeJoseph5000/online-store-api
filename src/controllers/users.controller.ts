import { Request, Response } from 'express';
import UserModel from '../models/user.model';
import User from '../types/user.type';
import jwt from 'jsonwebtoken';
import config from '../config/env.config';
import OrdersPerUser from '../types/dashboard/ordersPerUser.type';
import Dashboard from '../services/dashboard.services';

const userModel = new UserModel();

const dashboard = new Dashboard();


export const checkExistenceController = async (
	req: Request
): Promise<boolean | void> => {
	try {
		const isEmail: boolean = req.body.email ? true : false;

		let info: string = req.body.email;
		if (!isEmail) {
			info = req.params.userID;
		}

		const isFound: boolean = (await userModel.checkUserExistence(
			info,
			isEmail
		)) as boolean;

		return isFound;
	} catch (error) {
		console.error(
			`User Controller: Error while checking user: ${
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
					message: 'User email already exists.',
				})
				.end();
			return;
		}

		const user: User = (await userModel.create(req.body)) as User;

		if (!user) {
			res.status(500)
				.json({
					status: 'Error 500: Internal Server Error',
					user: {},
					message: `Unable to create user with email: ${req.body.email}`,
				})
				.end();
			return;
		}

		res.status(201)
			.json({
				status: '201 Created',
				user: user,
				message: 'User created successfully.',
			})
			.end();
		return;
	} catch (error) {
		console.error(
			`User Controller: Error while creating new user: ${
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
					message: 'User is NOT found.',
				})
				.end();
			return;
		}

		const user: User = (await userModel.show(req.params.userID)) as User;

		if (!user) {
			res.status(500)
				.json({
					status: 'Error 500: Internal Server Error',
					user: {},
					message: `Unable to show user no. ${req.params.userID}`,
				})
				.end();
			return;
		}

		const recentOrders: Array<OrdersPerUser> =
			(await dashboard.showOrdersPerUser(
				req.params.userID
			)) as Array<OrdersPerUser>;


		if (!recentOrders) {
			res.status(500)
				.json({
					status: 'Error 500: Internal Server Error',
					recentOrders: {},
					message: `Unable to show orders per user no. ${req.params.userID}`,
				})
				.end();
			return;
		}

		res.status(200)
			.json({
				status: '200 Ok',
				user: {
					...user,
					recentOrders,
				},
				message: 'User shown successfully.',
			})
			.end();
		return;
	} catch (error) {
		console.error(
			`User Controller: Error while showing user: ${
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
		const users: Array<User> = (await userModel.showAll()) as Array<User>;

		if (!users) {
			res.status(500)
				.json({
					status: 'Error 500: Internal Server Error',
					users: {},
					message: 'Unable to show users.',
				})
				.end();
			return;
		}

		res.status(200)
			.json({
				status: '200 Ok',
				totalUsers: users?.length,
				users: users,
				message: 'Users shown successfully.',
			})
			.end();
		return;
	} catch (error) {
		console.error(
			`User Controller: Error while showing users: ${
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
					message: 'User is NOT found.',
				})
				.end();
			return;
		}

		const user: User = (await userModel.update(
			req.params.userID,
			req.body
		)) as User;

		if (!user) {
			res.status(500)
				.json({
					status: 'Error 500: Internal Server Error',
					user: {},
					message: `Unable to update user no. ${req.params.userID}`,
				})
				.end();
			return;
		}


		res.status(200)
			.json({
				status: '200 Ok',
				user: user,
				message: 'User updated successfully.',
			})
			.end();
		return;
	} catch (error) {
		console.error(
			`User Controller: Error while updating user: ${
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
					message: 'User is NOT found.',
				})
				.end();
			return;
		}

		const user: User = (await userModel.delete(req.params.userID)) as User;

		if (!user) {
			res.status(500)
				.json({
					status: 'Error 500: Internal Server Error',
					user: {},
					message: `Unable to delete user no. ${req.params.userID}`,
				})
				.end();
			return;
		}

		res.status(200)
			.json({
				status: '200 Ok',
				user: user,
				message: 'User deleted successfully.',
			})
			.end();
		return;
	} catch (error) {
		console.error(
			`User Controller: Error while deleting user: ${
				(error as Error).message
			}`
		);
	}
};


export const authenticateController = async (
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
					message: 'User is NOT found.',
				})
				.end();
			return;
		}

		const user: User = (await userModel.authenticate(
			req.body.email,
			req.body.password
		)) as User;

		if (!user) {
			res.status(400)
				.json({
					status: 'Error 400: Bad Request',
					message: 'User email and/or password are wrong.',
				})
				.end();
			return;
		}

		const token = jwt.sign({ user }, config.tokenSecret as string);

		res.status(202)
			.json({
				status: '202 Accepted',
				user: { ...user, token },
				message: 'User authenticated successfully.',
			})
			.end();
		return;
	} catch (error) {
		console.error(
			`User Controller: Error while authenticating user: ${
				(error as Error).message
			}`
		);
	}
};
