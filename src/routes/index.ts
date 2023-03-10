import { Request, Response, Router } from 'express';
import usersRoute from './api/users.routes';
import productsRoute from './api/products.routes';
import ordersRoute from './api/orders.routes';
import orderProductsRoute from './api/orderProducts.routes';
import dashboardRoute from './api/dashboard.routes';

const mainRoute: Router = Router();

mainRoute.use('/users', usersRoute);
mainRoute.use('/products', productsRoute);
mainRoute.use('/orders', [ordersRoute, orderProductsRoute]);
mainRoute.use('/dashboard', dashboardRoute);

mainRoute.get('/', async (_req: Request, res: Response): Promise<void> => {
	res.status(404)
		.json({
			status: 'Error 404: Not Found',
			message: 'inside << main >> route',
			possibleRoutes: [
				'/users',
				'/products',
				'/orders',
				'/orders/:orderID',
				'/dashboard',
			],
		})
		.end();
	return;
});

export default mainRoute;
