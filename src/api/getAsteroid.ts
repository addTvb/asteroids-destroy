import type { AxiosResponse } from 'axios';
import { axiosInstance } from './axiosInstance';
import { AsteroidResponse } from 'types/asteroid';

export const getAsteroid = async (id?: string) => {
	const { data }: AxiosResponse<AsteroidResponse> = await axiosInstance({
		method: 'GET',
		url: `/neo/${id}`,
	});

	return data;
};
