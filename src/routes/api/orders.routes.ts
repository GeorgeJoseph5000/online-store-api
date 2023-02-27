import { Router } from 'express';
import * as ordersController from '../../controllers/orders.controller';
import { authenticateUserToken } from '../../middlewares/authentication.middleware';
import validateRequest from '../../middlewares/validation.middleware';
import {
	orderBodyValidationRules,
	orderStatusBodyValidationRules,
	orderParamsValidationRules,
} from '../../schemas/orders.schemas';

const ordersRoute: Router = Router();

ordersRoute
	.route('/create')
	.post(
		orderBodyValidationRules,
		validateRequest,
		authenticateUserToken,
		ordersController.createController
	);

ordersRoute
	.route('/')
	.get(authenticateUserToken, ordersController.showAllController);

ordersRoute
	.route('/:orderID')
	.get(
		orderParamsValidationRules,
		validateRequest,
		authenticateUserToken,
		ordersController.showController
	)
	.put(
		orderParamsValidationRules,
		orderStatusBodyValidationRules,
		validateRequest,
		authenticateUserToken,
		ordersController.updateController
	)
	.delete(
		orderParamsValidationRules,
		validateRequest,
		authenticateUserToken,
		ordersController.deleteController
	);

export default ordersRoute;
