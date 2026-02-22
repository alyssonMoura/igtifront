import http from '../http-common';
import { validateId, validateSearchInput, validateGradeData } from '../utils/validation';

const getAll = () => {
  return http.get('/grade');
};

const get = (id) => {
  // Validate ID parameter
  const idValidation = validateId(id);
  if (!idValidation.isValid) {
    throw new Error(idValidation.error);
  }
  
  return http.get(`/grade/${idValidation.value}`);
};

const create = (data) => {
  // Validate grade data
  const validation = validateGradeData(data);
  if (!validation.isValid) {
    throw new Error('Invalid grade data: ' + JSON.stringify(validation.errors));
  }
  
  return http.post('/grade', validation.data);
};

const update = (id, data) => {
  // Validate ID parameter
  const idValidation = validateId(id);
  if (!idValidation.isValid) {
    throw new Error(idValidation.error);
  }
  
  // Validate grade data
  const validation = validateGradeData(data);
  if (!validation.isValid) {
    throw new Error('Invalid grade data: ' + JSON.stringify(validation.errors));
  }
  
  return http.put(`/grade/${idValidation.value}`, validation.data);
};

const remove = (id) => {
  // Validate ID parameter
  const idValidation = validateId(id);
  if (!idValidation.isValid) {
    throw new Error(idValidation.error);
  }
  
  return http.delete(`/grade/${idValidation.value}`);
};

const removeAll = () => {
  return http.delete(`/grade`);
};

const findByName = (name) => {
  // Validate and sanitize search input
  const sanitizedSearch = validateSearchInput(name);
  
  if (!sanitizedSearch) {
    throw new Error('Invalid search input');
  }
  
  return http.get(`/grade?name=${encodeURIComponent(sanitizedSearch)}`);
};

const GradeService = {
  getAll,
  get,
  create,
  update,
  remove,
  removeAll,
  findByName,
};

export default GradeService;
