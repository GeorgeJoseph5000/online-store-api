import bcrypt from 'bcrypt';
import config from '../../config/env.config';

export const compare = (plain: string, hashed: string): boolean => {
	return bcrypt.compareSync(`${plain}${config.bcryptPassword}`, hashed);
};
