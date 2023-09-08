import { getNumWord } from './getNumWord';

export const formatLunarDistance = (distance: string) => {
	const num = Math.ceil(Number(distance));
	const dec = ['лунная орбита', 'лунные орбиты', 'лунных орбит'];
	return getNumWord(num, dec);
};
