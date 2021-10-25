import axios from 'axios';

const baseURL = 'https://clinia-coding-challenge.s3.ca-central-1.amazonaws.com';

const axiosInstance = axios.create({
  headers: {
    'Access-Control-Allow-Origin': '*',
    'Content-Type': 'application/json',
    // "Authorization": `Bearer ${token}`
  },
});

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error?.response?.status === 401) {
      // ? Sign out
    }
    return Promise.reject(error);
  },
);

export const apiEndpoints = {
  services: `${baseURL}/services.json`,
  form: `${baseURL}/form.json`,
};

export { axiosInstance };
