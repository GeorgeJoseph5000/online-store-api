import { Router } from 'express';
import * as orderProductsController from '../../controllers/orderProducts.controller';
import { authenticateUserToken } from '../../middlewares/authentication.middleware';
import validateRequest from '../../middlewares/validation.middleware';
import { orderProductBodyValidationRules } from '../../schemas/orderProducts.schemas';
import { orderParamsValidationRules } from '../../schemas/orders.schemas';
import { productParamsValidationRules } from '../../schemas/products.schemas';

const orderProductsRoute: Router = Router();

orderProductsRoute
	.route('/:orderID/add')
	.post(
		orderParamsValidationRules,
		orderProductBodyValidationRules,
		validateRequest,
		authenticateUserToken,
		orderProductsController.addProductController
	);

orderProductsRoute
	.route('/:orderID/products')
	.get(
		orderParamsValidationRules,
		validateRequest,
		authenticateUserToken,
		orderProductsController.showAllProductsController
	);

orderProductsRoute
	.route('/:orderID/:productID')
	.get(
		orderParamsValidationRules,
		productParamsValidationRules,
		validateRequest,
		authenticateUserToken,
		orderProductsController.showProductController
	);

export default orderProductsRoute;
