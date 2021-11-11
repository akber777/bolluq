import { baseUrl } from "../services/api";
import axios from "axios";

export const statistics = async (key) => {
  const res = await axios.get(baseUrl + "statistics");

  return await res.data;
};
