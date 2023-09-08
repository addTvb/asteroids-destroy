/**
 * @param date 'YYYY-MM-DD'
 * @returns 'DD mm YYYY', '12 сент 2023'
 */
export const getTextDate = (date: string) => {
	const splitted = date.split('-');
	const monthName = getMonthName(Number(splitted[1]))
    return `${splitted[2]} ${monthName} ${splitted[0]}`
};

const getMonthName = (monthIndex: number) => {
	switch (monthIndex) {
		case 1:
			return 'янв';
		case 2:
			return 'фев';
		case 3:
			return 'март';
		case 4:
			return 'апр';
		case 5:
			return 'май';
		case 6:
			return 'июнь';
		case 7:
			return 'июль';
		case 8:
			return 'авг';
		case 9:
			return 'сент';
		case 10:
			return 'октб';
		case 11:
			return 'нояб';
		case 12:
			return 'дек';
	}
};
