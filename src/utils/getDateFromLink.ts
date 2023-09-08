export const getDateFromLink = (link: string) => {
	return link.split('&')[1].split('=')[1];
};
