import type { AxiosResponse } from 'axios';
import { axiosInstance } from './axiosInstance';
import { AllAsteroidResponse } from 'types/asteroid';

export const getAllAsteroids = async (startDate: string) => {
  const { data }: AxiosResponse<AllAsteroidResponse> = await axiosInstance({
    method: 'GET',
    url: '/feed',
    params: {
        start_date: startDate,
        end_date: startDate,
    },
  });

  return data;
};
