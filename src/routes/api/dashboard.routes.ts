import { Router } from 'express';
import * as dashboardController from '../../controllers/dashboard.controller';
import { authenticateUserToken } from '../../middlewares/authentication.middleware';

const dashboardRoute: Router = Router();

dashboardRoute
	.route('/productsInOrders')
	.get(
		authenticateUserToken,
		dashboardController.showProductsInOrdersController
	);

dashboardRoute
	.route('/recentOrders/:userID')
	.get(
		authenticateUserToken,
		dashboardController.showRecentOrdersPerUserController
	);

dashboardRoute
	.route('/topProducts')
	.get(authenticateUserToken, dashboardController.showTopProductsController);

export default dashboardRoute;
