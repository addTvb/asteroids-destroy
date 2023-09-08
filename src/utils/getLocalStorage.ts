type LocalStorageResult = null | string | Array<unknown>;

export const getLocalStorage = (key: string): LocalStorageResult => {
	const local = localStorage.getItem(key);
	if (local) {
		const parsed = JSON.parse(local);
		return parsed;
	}
	return null;
};
