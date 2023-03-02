import axios from 'axios';
const baseUrl = 'http://localhost:3001/persons/';

const getAllPersons = () => {
  return axios.get(baseUrl);
};

const createNewPerson = person => {
  return axios.post(baseUrl, person);
};

const updatePerson = (id, person) => {
  return axios.put(`${baseUrl}${id}`, person);
};

const deletePerson = id => {
  return axios.delete(`${baseUrl}${id}`);
};


export default { getAllPersons: getAllPersons, createNewPerson: createNewPerson, deletePerson: deletePerson, updatePerson: updatePerson }