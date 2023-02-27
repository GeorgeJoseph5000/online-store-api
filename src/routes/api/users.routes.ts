import { Router } from 'express';
import * as usersController from '../../controllers/users.controller';
import {
	authenticateUserToken,
	validateUserRole,
} from '../../middlewares/authentication.middleware';
import validateRequest from '../../middlewares/validation.middleware';
import {
	userAuthenticateBodyValidationRules,
	userBodyValidationRules,
	userParamsValidationRules,
} from '../../schemas/users.schemas';

const usersRoute: Router = Router();

usersRoute
	.route('/register')
	.post(
		userBodyValidationRules,
		validateRequest,
		usersController.createController
	);

usersRoute
	.route('/login')
	.post(
		userAuthenticateBodyValidationRules,
		validateRequest,
		usersController.authenticateController
	);

usersRoute
	.route('/')
	.get(authenticateUserToken, usersController.showAllController);

usersRoute
	.route('/:userID')
	.get(
		userParamsValidationRules,
		validateRequest,
		authenticateUserToken,
		validateUserRole,
		usersController.showController
	)
	.put(
		userParamsValidationRules,
		userBodyValidationRules,
		validateRequest,
		authenticateUserToken,
		validateUserRole,
		usersController.updateController
	)
	.delete(
		userParamsValidationRules,
		validateRequest,
		authenticateUserToken,
		validateUserRole,
		usersController.deleteController
	);

export default usersRoute;
