import axios from 'axios';

export const axiosInstance = axios.create({
	baseURL: 'https://api.nasa.gov/neo/rest/v1',
	params: {
		api_key: import.meta.env.VITE_API_KEY,
	},
});
