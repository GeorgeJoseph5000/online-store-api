import jwt, { JwtPayload } from 'jsonwebtoken';
import { NextFunction, Request, Response } from 'express';
import config from '../config/env.config';

const checkAuthType = (authHeader: string, authType: string): boolean => {
	let isBearer = false;

	if (authHeader.split(' ')[0].toLowerCase() === authType.toLowerCase() && authHeader.split(' ')[1]) {
		isBearer = true;
	}

	return isBearer;
};

const extractToken = (authHeader: string): string => {
	return authHeader.split(' ')[1];
};

export const authenticateUserToken = async (
	req: Request,
	res: Response,
	next: NextFunction
): Promise<void> => {
	try {
		const authorizationHeader = req.headers.authorization;
		if (!authorizationHeader) {
			res.status(401).json({
				status: '401 Unauthorized',
				message: 'No token provided.',
			});
			return;
		}

		const isBearer: boolean = checkAuthType(authorizationHeader, 'Bearer');
		if (!isBearer) {
			res.status(400).json({
				status: 'Error 400: Bad Request',
				message: 'Token type is NOT "Bearer".',
			});
			return;
		}

		const token = extractToken(authorizationHeader);

		const payload = jwt.verify(
			token,
			config.tokenSecret as string
		) as JwtPayload;

		if (!payload) {
			res.status(401).json({
				status: 'Error 401: Unauthorized',
				message: 'Token is NOT valid.',
			});
			return;
		}

		res.locals.user = payload.user;

		next();
	} catch (error) {
		console.error(
			`Authentication Middleware Error: Unable to login: ${
				(error as Error).message
			}`
		);
	}
};

export const validateUserRole = async (
	req: Request,
	res: Response,
	next: NextFunction
): Promise<void> => {
	try {
		const userID: string = req.params.userID ? req.params.userID : '';

		const authID: string = res.locals.user.id;

		if (userID !== authID) {
			res.status(401).json({
				status: 'Error 401: Unauthorized',
				message: 'User is NOT authorized for this operation.',
			});
			return;
		}

		next();
	} catch (error) {
		console.error(
			`Authentication Middleware Error: Unable to perform the desired operation: ${
				(error as Error).message
			}`
		);
	}
};
