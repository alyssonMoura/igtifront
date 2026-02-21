import http from '../http-common';

const getAll = () => {
  return http.get('/grades');
};

const get = (id) => {
  return http.get(`/grade/${id}`);
};

const create = (data) => {
  return http.post('/grade', data);
};

const update = (id, data) => {
  return http.put(`/grade/${id}`, data);
};

const remove = (id) => {
  return http.delete(`/grade/${id}`);
};

const removeAll = () => {
  return http.delete(`/grade`);
};

const findByName = (name) => {
  return http.get(`/grade?name=${name}`);
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
