import axios from "axios";

const api = () => {
  const { REACT_APP_API_URL } = process.env;

  const axiosInstance = axios.create({
    baseURL: REACT_APP_API_URL,
  });

  return axiosInstance;
};

export default api;

export const get = (url) =>
  api()
    .get(url)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      console.log(error);
    });

export const post = (url, data) =>
  api()
    .post(url, data)
    .then((response) => {
      console.log(response);
    })
    .catch((error) => {
      console.log(error);
    });

export const put = (url, data) =>
  api()
    .put(url, data)
    .then((response) => {
      console.log(response);
    })
    .catch((error) => {
      console.log(error);
    });

export const del = (url) =>
  api()
    .delete(url)
    .then((response) => {
      console.log(response);
    })
    .catch((error) => {
      console.log(error);
    });
