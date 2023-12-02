import axios, {AxiosInstance, AxiosError} from 'axios';
import {prefToken} from '../preferences';
import {keyWords} from '../constants';

const baseAxios = async (): Promise<AxiosInstance> => {
  const token = await prefToken.get();

  const customAxios: AxiosInstance = axios.create({
    baseURL: keyWords.BASE_URL,
    timeout: 5000, // "5" sec
    headers: {
      authorization: `Bearer ${token}`,
      accept: 'application/json',
    },
  });

  // Add a response interceptor
  customAxios.interceptors.response.use(
    response => {
      // Do something with successful response data
      return response;
    },
    (error: AxiosError) => {
      // Handle errors here
      if (error.response) {
        // The request was made and the server responded with a status code
        console.error('Response error:', error.response.data);
        console.error('Status code:', error.response.status);
      } else if (error.request) {
        // The request was made but no response was received
        console.error('No response received:', error.request);
      } else {
        // Something happened in setting up the request that triggered an Error
        console.error('Error setting up the request:', error.message);
      }

      // Return a rejected promise with the error
      return Promise.reject(error);
    },
  );

  return customAxios;
};

export default baseAxios;
