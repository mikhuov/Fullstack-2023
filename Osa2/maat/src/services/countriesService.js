import axios from 'axios';
const baseUrl = 'https://restcountries.com/v3.1/all';

const getAllCountries = () => {
  return axios.get(baseUrl);
};

export default { getAllCountries: getAllCountries }