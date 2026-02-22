import React, { useState, useEffect } from 'react';
import GradeDataService from '../services/GradeService';
import { validateId } from '../utils/validation';

const Grade = (props) => {
  const initialGradeState = {
    id: null,
    name: '',
    subject: '',
    type: '',
    value: '',
  };
  const [currentGrade, setCurrentGrade] = useState(initialGradeState);
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(true);

  const getGrade = (id) => {
    // Validar ID antes de fazer a chamada
    const idValidation = validateId(id);
    if (!idValidation.isValid) {
      console.error('ID inválido:', idValidation.error);
      setMessage('ID inválido fornecido');
      setLoading(false);
      return;
    }

    setLoading(true);
    GradeDataService.get(idValidation.value)
      .then((response) => {
        setCurrentGrade(response.data);
        console.log(response.data);
        setLoading(false);
      })
      .catch((e) => {
        console.log('Erro ao buscar grade:', e);
        setMessage('Erro ao carregar grade');
        setLoading(false);
      });
  };

  useEffect(() => {
    const id = props.match?.params?.id;
    if (id) {
      getGrade(id);
    } else {
      setMessage('ID não fornecido');
      setLoading(false);
    }
  }, [props.match?.params?.id]);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setCurrentGrade({ ...currentGrade, [name]: value });
  };

  const updateGrade = () => {
    // Validar ID antes de atualizar
    const idValidation = validateId(currentGrade.id);
    if (!idValidation.isValid) {
      setMessage('ID inválido para atualização');
      return;
    }

    GradeDataService.update(idValidation.value, currentGrade)
      .then((response) => {
        setMessage('Grade atualizada com sucesso!');
      })
      .catch((e) => {
        console.log('Erro ao atualizar grade:', e);
        setMessage('Erro ao atualizar grade');
      });
  };

  const deleteGrade = () => {
    // Validar ID antes de excluir
    const idValidation = validateId(currentGrade.id);
    if (!idValidation.isValid) {
      setMessage('ID inválido para exclusão');
      return;
    }

    if (window.confirm('Tem certeza que deseja excluir esta grade?')) {
      GradeDataService.remove(idValidation.value)
        .then((response) => {
          setMessage('Grade excluída com sucesso!');
          setTimeout(() => {
            props.history.push('/grade');
          }, 1000);
        })
        .catch((e) => {
          console.log('Erro ao excluir grade:', e);
          setMessage('Erro ao excluir grade');
        });
    }
  };

  return (
    <div>
      {loading ? (
        <div className="text-center">
          <p>Carregando grade...</p>
        </div>
      ) : currentGrade && currentGrade.id ? (
        <div className="edit-form">
          <h4>Grade</h4>
          {message && (
            <div className={`alert ${message.includes('sucesso') ? 'alert-success' : 'alert-danger'}`}>
              {message}
            </div>
          )}
          <form>
            <div className="form-group">
              <label htmlFor="name">Name</label>
              <input
                type="text"
                className="form-control"
                id="name"
                name="name"
                value={currentGrade.name || ''}
                onChange={handleInputChange}
                placeholder="Nome do estudante"
              />
            </div>
            <div className="form-group">
              <label htmlFor="subject">Subject</label>
              <input
                type="text"
                className="form-control"
                id="subject"
                name="subject"
                value={currentGrade.subject || ''}
                onChange={handleInputChange}
                placeholder="Matéria"
              />
            </div>
            <div className="form-group">
              <label htmlFor="type">Type</label>
              <input
                type="text"
                className="form-control"
                id="type"
                name="type"
                value={currentGrade.type || ''}
                onChange={handleInputChange}
                placeholder="Tipo (Teste, Trabalho, etc.)"
              />
            </div>
            <div className="form-group">
              <label htmlFor="value">Value</label>
              <input
                type="number"
                step="0.01"
                min="0"
                max="100"
                className="form-control"
                id="value"
                name="value"
                value={currentGrade.value || ''}
                onChange={handleInputChange}
                placeholder="Valor (0-100)"
              />
            </div>
          </form>

          <button className="badge badge-danger mr-2" onClick={deleteGrade}>
            Delete
          </button>

          <button
            type="submit"
            className="badge badge-success"
            onClick={updateGrade}
          >
            Update
          </button>
        </div>
      ) : (
        <div className="text-center">
          <br />
          <p>{message || 'Grade não encontrada ou ID inválido'}</p>
          <button 
            className="btn btn-primary" 
            onClick={() => props.history.push('/grade')}
          >
            Voltar para lista
          </button>
        </div>
      )}
    </div>
  );
};

export default Grade;
