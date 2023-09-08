export const setLocalStorage = (key: string, value: unknown) => {
	localStorage.setItem(key, JSON.stringify(value));
};
