import { Request, Response } from 'express';
import ProductModel from '../models/product.model';
import Product from '../types/product.type';

const productModel = new ProductModel();


export const checkExistenceController = async (
	req: Request
): Promise<boolean | void> => {
	try {
		
		const productIdWithinBody: boolean = req.body.product_id ? true : false;
		let info: string = req.body.product_id;

		let isName: boolean = false;
		let productIdWithinParams: boolean = false;
		if (!productIdWithinBody) {
			productIdWithinParams = req.params.productID ? true : false;
			info = req.params.productID;

			if (!productIdWithinParams) {
				info = req.body.name;
				isName = true;
			}
		}

		const isFound: boolean = (await productModel.checkProductExistence(
			info,
			isName
		)) as boolean;

		return isFound;
	} catch (error) {
		console.error(
			`Product Controller: Error while checking product: ${
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
					message: 'Product name already exists.',
				})
				.end();
			return;
		}

		const product: Product = (await productModel.create(
			req.body
		)) as Product;

		if (!product) {
			res.status(500)
				.json({
					status: 'Error 500: Internal Server Error',
					product: {},
					message: `Unable to create product with name: ${req.body.name}`,
				})
				.end();
			return;
		}

		res.status(201)
			.json({
				status: '201 Created',
				product: product,
				message: 'Product created successfully.',
			})
			.end();
		return;
	} catch (error) {
		console.error(
			`Product Controller: Error while creating new product: ${
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
					message: 'Product is NOT found.',
				})
				.end();
			return;
		}

		const product: Product = (await productModel.show(
			req.params.productID
		)) as Product;

		if (!product) {
			res.status(500)
				.json({
					status: 'Error 500: Internal Server Error',
					product: {},
					message: `Unable to show product no. ${req.params.productID}`,
				})
				.end();
			return;
		}

		res.status(200)
			.json({
				status: '200 Ok',
				product: product,
				message: 'Product shown successfully.',
			})
			.end();
		return;
	} catch (error) {
		console.error(
			`Product Controller: Error while showing product: ${
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
		const products: Array<Product> =
			(await productModel.showAll()) as Array<Product>;

		if (!products) {
			res.status(500)
				.json({
					status: 'Error 500: Internal Server Error',
					products: {},
					message: 'Unable to show products.',
				})
				.end();
			return;
		}

		res.status(200)
			.json({
				status: '200 Ok',
				totalProducts: products?.length,
				products: products,
				message: 'Products shown successfully.',
			})
			.end();
		return;
	} catch (error) {
		console.error(
			`Product Controller: Error while showing products: ${
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
					message: 'Product is NOT found.',
				})
				.end();
			return;
		}

		const product: Product = (await productModel.update(
			req.params.productID,
			req.body
		)) as Product;

		if (!product) {
			res.status(500)
				.json({
					status: 'Error 500: Internal Server Error',
					product: {},
					message: `Unable to update product no. ${req.params.productID}`,
				})
				.end();
			return;
		}

		res.status(200)
			.json({
				status: '200 Ok',
				product: product,
				message: 'Product updated successfully.',
			})
			.end();
		return;
	} catch (error) {
		console.error(
			`Product Controller: Error while updating product: ${
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
					message: 'Product is NOT found.',
				})
				.end();
			return;
		}

		const product: Product = (await productModel.delete(
			req.params.productID
		)) as Product;

		if (!product) {
			res.status(500)
				.json({
					status: 'Error 500: Internal Server Error',
					product: {},
					message: `Unable to delete product no. ${req.params.productID}`,
				})
				.end();
			return;
		}

		res.status(200)
			.json({
				status: '200 Ok',
				product: product,
				message: 'Product deleted successfully.',
			})
			.end();
		return;
	} catch (error) {
		console.error(
			`Product Controller: Error while deleting product: ${
				(error as Error).message
			}`
		);
	}
};
