import axios from "axios";

export const fetchCurrencies = () => axios.get(process.env.REACT_APP_API_URL ?? "");
