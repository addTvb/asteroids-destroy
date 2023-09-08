export const getNumWord = (num: number, dec: string[]) => {
	let number = num;
	if (num > 100) number = num % 100;
	if (num <= 20 && num >= 10) return `${num} ${dec[2]}`;
	if (num > 20) number = num % 10;
	const word = number === 1 ? dec[0] : number > 1 && number < 5 ? dec[1] : dec[2];

	return `${num} ${word}`;
};
