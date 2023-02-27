import { userTypeSpecs } from './user.type.spec';
import { productTypeSpecs } from './product.type.spec';
import { orderTypeSpecs } from './order.type.spec';
import { orderProductTypeSpecs } from './orderProduct.type.spec';

describe('├─── Types Suites', () => {
	userTypeSpecs();
	productTypeSpecs();
	orderTypeSpecs();
	orderProductTypeSpecs();
});
