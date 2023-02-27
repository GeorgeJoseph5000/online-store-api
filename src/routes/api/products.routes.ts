import { Router } from 'express';
import * as productsController from '../../controllers/products.controller';
import { authenticateUserToken } from '../../middlewares/authentication.middleware';
import validateRequest from '../../middlewares/validation.middleware';
import {
	productBodyValidationRules,
	productParamsValidationRules,
} from '../../schemas/products.schemas';

const productsRoute: Router = Router();

productsRoute
	.route('/create')
	.post(
		productBodyValidationRules,
		validateRequest,
		authenticateUserToken,
		productsController.createController
	);

productsRoute
	.route('/')
	.get(authenticateUserToken, productsController.showAllController);

productsRoute
	.route('/:productID')
	.get(
		productParamsValidationRules,
		validateRequest,
		authenticateUserToken,
		productsController.showController
	)
	.put(
		productParamsValidationRules,
		productBodyValidationRules,
		validateRequest,
		authenticateUserToken,
		productsController.updateController
	)
	.delete(
		productParamsValidationRules,
		validateRequest,
		authenticateUserToken,
		productsController.deleteController
	);

export default productsRoute;
