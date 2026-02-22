import React, { useState } from 'react';
import GradeDataService from '../services/GradeService';
import { validateGradeData } from '../utils/validation';

const AddGrade = () => {
  const initialGradeState = {
    id: null,
    name: '',
    subject: '',
    type: '',
    value: '',
  };
  const [grade, setGrade] = useState(initialGradeState);
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState({});

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setGrade({ ...grade, [name]: value });
    
    // Clear error for this field when user starts typing
    if (errors[name]) {
      setErrors({ ...errors, [name]: '' });
    }
  };

  const validateForm = () => {
    const validation = validateGradeData(grade);
    
    if (!validation.isValid) {
      setErrors(validation.errors);
      return false;
    }
    
    setErrors({});
    return true;
  };

  const saveGrade = () => {
    if (!validateForm()) {
      return;
    }

    const data = {
      name: grade.name,
      subject: grade.subject,
      type: grade.type,
      value: grade.value,
    };

    GradeDataService.create(data)
      .then((response) => {
        setGrade({
          id: response.data.id,
          name: response.data.name,
          subject: response.data.img,
          type: response.data.type,
          value: response.data.value,
        });
        setSubmitted(true);
        console.log(response.data);
      })
      .catch((e) => {
        console.log('Error creating grade:', e);
        // Handle server-side validation errors
        if (e.response && e.response.data) {
          console.log('Server validation errors:', e.response.data);
        }
      });
  };

  const newGrade = () => {
    setGrade(initialGradeState);
    setSubmitted(false);
    setErrors({});
  };

  return (
    <div className="submit-form">
      {submitted ? (
        <div>
          <h4>You submitted successfully!</h4>
          <button className="btn btn-success" onClick={newGrade}>
            Add
          </button>
        </div>
      ) : (
        <div>
          <div className="form-group">
            <label htmlFor="name">Name</label>
            <input
              type="text"
              className={`form-control ${errors.name ? 'is-invalid' : ''}`}
              id="name"
              required
              value={grade.name}
              onChange={handleInputChange}
              name="name"
              placeholder="Enter student name"
            />
            {errors.name && (
              <div className="invalid-feedback">
                {errors.name}
              </div>
            )}
          </div>

          <div className="form-group">
            <label htmlFor="subject">Subject</label>
            <input
              type="text"
              className={`form-control ${errors.subject ? 'is-invalid' : ''}`}
              id="subject"
              required
              value={grade.subject}
              onChange={handleInputChange}
              name="subject"
              placeholder="Enter subject name"
            />
            {errors.subject && (
              <div className="invalid-feedback">
                {errors.subject}
              </div>
            )}
          </div>
          
          <div className="form-group">
            <label htmlFor="type">Type</label>
            <input
              type="text"
              className={`form-control ${errors.type ? 'is-invalid' : ''}`}
              id="type"
              required
              value={grade.type}
              onChange={handleInputChange}
              name="type"
              placeholder="Enter grade type (e.g., Test, Homework)"
            />
            {errors.type && (
              <div className="invalid-feedback">
                {errors.type}
              </div>
            )}
          </div>
          
          <div className="form-group">
            <label htmlFor="value">Value</label>
            <input
              type="number"
              step="0.01"
              min="0"
              max="100"
              className={`form-control ${errors.value ? 'is-invalid' : ''}`}
              id="value"
              required
              value={grade.value}
              onChange={handleInputChange}
              name="value"
              placeholder="Enter grade value (0-100)"
            />
            {errors.value && (
              <div className="invalid-feedback">
                {errors.value}
              </div>
            )}
          </div>
          
          <button onClick={saveGrade} className="btn btn-success">
            Submit
          </button>
        </div>
      )}
    </div>
  );
};

export default AddGrade;
