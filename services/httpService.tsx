import { apiEndpoints, axiosInstance } from '../config/httpConfig';

const getServices = async () => {
  const { data: services } = await axiosInstance.get(apiEndpoints.services);
  return services;
};

const getFormData = async () => {
  const { data: formData } = await axiosInstance.get(apiEndpoints.form);
  return formData;
};

export { getServices, getFormData };
