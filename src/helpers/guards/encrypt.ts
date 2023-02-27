import bcrypt from 'bcrypt';
import config from '../../config/env.config';

export const encrypt = (plain: string): string => {
	return bcrypt.hashSync(
		`${plain}${config.bcryptPassword}`,
		parseInt(config.saltRounds as string, 10) 
	);
};
