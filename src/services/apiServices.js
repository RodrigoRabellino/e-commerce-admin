import axios from "axios";
const API_URL = process.env.REACT_APP_API_URL;

export const fetchProducts = async (page) => {
  try {
    const response = await axios.get(`${API_URL}/product`);
    return response.data;
  } catch (error) {
    return error;
  }
};

export const fetchStarredProducts = async () => {
  try {
    const response = await axios.get(`${API_URL}/product/starred`);
    return response.data;
  } catch (error) {
    return error;
  }
};

export const fetchOneProduct = async (id) => {
  try {
    const response = axios.get(`${API_URL}/product/${id}`);
    return response;
  } catch (error) {
    return error;
  }
};

export const fetchCategories = async () => {
  try {
    const response = await axios.get(`${API_URL}/category`);
    return response.data;
  } catch (error) {
    console.log("error in fetchCategories", error);
  }
};

export const postNewProduct = async (data) => {
  const body = { ...data };
  console.log(body);
  try {
    const response = await axios.post(`${API_URL}/product`, body);
    return response.data;
  } catch (error) {
    console.log("error in loginAdmin", error);
  }
};

export const fetchAdminById = async (id, accessToken) => {
  const body = { accessToken };
  try {
    const response = await axios.get(`${API_URL}/admin/${id}`, body);
    console.log(response);
    return response.data;
  } catch (error) {
    console.log("error in fetchCategories", error);
  }
};
