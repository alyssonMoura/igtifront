import axios from 'axios';

//Define a URL base da origem para consumo do servico
const baseURL = process.env.REACT_APP_API_BASE_URL || 'http://localhost:3003/';

export default axios.create({
  baseURL,
  headers: {
    'Content-type': 'application/json',
  },
});
