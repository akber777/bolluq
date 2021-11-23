import { baseUrl } from "../services/api";
import axios from "axios";

export const statistics = async (key) => {
  const res = await axios.get(baseUrl + "statistics");

  return await res.data;
};

export const language = async (key) => {
  const res = await axios.get(baseUrl + "languages");

  return await res.data;
};

export const aboutApi = async (key) => {
  const res = await axios.get(baseUrl + "about");

  return await res.data;
};

export const certificates = async (key) => {
  const res = await axios.get(baseUrl + "certificates");

  return await res.data;
};

export const newsApi = async (key) => {
  const res = await axios.get(baseUrl + `news/?page=${key.queryKey[1]}`);

  return await res.data;
};

export const newsDetailApi = async (key) => {
  const res = await axios.get(baseUrl + `news/${key.queryKey[1]}`);

  return await res.data;
};

export const partners = async (key) => {
  const res = await axios.get(baseUrl + "partners");

  return await res.data;
};

export const histories = async (key) => {
  const res = await axios.get(baseUrl + "histories");

  return await res.data;
};

export const principles = async (key) => {
  const res = await axios.get(baseUrl + "principles");

  return await res.data;
};

export const productions = async (key) => {
  const res = await axios.get(baseUrl + "productions");

  return await res.data;
};

export const productionDetail = async (key) => {
  const res = await axios.get(baseUrl + `production/${key.queryKey[1]}`);

  return await res.data;
};

export const ourBrands = async (key) => {
  const res = await axios.get(
    baseUrl + `our-brands/${key.queryKey[1]}?page=${key.queryKey[2]}`
  );

  return await res.data;
};

export const foreignBrands = async (key) => {
  const res = await axios.get(
    baseUrl + `foreign-brands/${key.queryKey[1]}?page=${key.queryKey[2]}`
  );

  return await res.data;
};

export const homePageTopSlider = async (key) => {
  const res = await axios.get(baseUrl + `sliders`);

  return await res.data;
};

export const homePageSliderProducts = async (key) => {
  const res = await axios.get(baseUrl + `products`);

  return await res.data;
};
