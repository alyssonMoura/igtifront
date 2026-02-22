import React, { useState, useEffect } from 'react';
import GradeDataService from '../services/GradeService';
import { Link } from 'react-router-dom';
import { validateSearchInput } from '../utils/validation';

const GradeList = () => {
  const [grade, setGrade] = useState([]);
  const [currentGrade, setCurrentGrade] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(-1);
  const [searchName, setSearchName] = useState('');
  const [searchError, setSearchError] = useState('');

  useEffect(() => {
    retrieveGrade();
  }, []);

  const onChangeSearchName = (e) => {
    const searchName = e.target.value;
    setSearchName(searchName);
    
    // Clear error when user starts typing
    if (searchError) {
      setSearchError('');
    }
  };

  const retrieveGrade = () => {
    GradeDataService.getAll()
      .then((response) => {
        setGrade(response.data);
        console.log(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const refreshList = () => {
    retrieveGrade();
    setCurrentGrade(null);
    setCurrentIndex(-1);
  };

  const setActiveGrade = (grade, index) => {
    setCurrentGrade(grade);
    setCurrentIndex(index);
  };

  const removeAllGrade = () => {
    GradeDataService.removeAll()
      .then((response) => {
        console.log(response.data);
        refreshList();
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const findByName = () => {
    // Validate search input
    const sanitizedSearch = validateSearchInput(searchName);
    
    if (!sanitizedSearch) {
      setSearchError('Please enter a valid search term');
      return;
    }
    
    setSearchError('');
    
    GradeDataService.findByName(sanitizedSearch)
      .then((response) => {
        setGrade(response.data);
        console.log(response.data);
      })
      .catch((e) => {
        console.log('Error searching grades:', e);
        if (e.message === 'Invalid search input') {
          setSearchError('Invalid search input detected');
        }
      });
  };

  return (
    <div className="list row">
      <div className="col-md-8">
        <div className="input-group mb-3">
          <input
            type="text"
            className={`form-control ${searchError ? 'is-invalid' : ''}`}
            placeholder="Search by name"
            value={searchName}
            onChange={onChangeSearchName}
            onKeyPress={(e) => {
              if (e.key === 'Enter') {
                findByName();
              }
            }}
          />
          <div className="input-group-append">
            <button
              className="btn btn-outline-secondary"
              type="button"
              onClick={findByName}
            >
              Search
            </button>
          </div>
          {searchError && (
            <div className="invalid-feedback">
              {searchError}
            </div>
          )}
        </div>
      </div>
      <div className="col-md-6">
        <h4>Grade List</h4>

        <ul className="list-group">
          {grade &&
            grade.map((grade, index) => (
              <li
                className={
                  'list-group-item ' + (index === currentIndex ? 'active' : '')
                }
                onClick={() => setActiveGrade(grade, index)}
                key={index}
              >
                {grade.name}
              </li>
            ))}
        </ul>

        <button className="m-3 btn btn-sm btn-danger" onClick={removeAllGrade}>
          Remove All
        </button>
      </div>
      <div className="col-md-6">
        {currentGrade ? (
          <div>
            <h4>Grade</h4>
            <div>
              <label>
                <strong>Name:</strong>
              </label>{' '}
              {currentGrade.name}
            </div>
            <div>
              <label>
                <strong>Subject:</strong>
              </label>{' '}
              {currentGrade.subject}
            </div>
            <div>
              <label>
                <strong>Type:</strong>
              </label>{' '}
              {currentGrade.type}
            </div>
            <div>
              <label>
                <strong>Value:</strong>
              </label>{' '}
              {currentGrade.value}
            </div>

            <Link
              to={'/grade/' + currentGrade.id}
              className="badge badge-warning"
            >
              Edit
            </Link>
          </div>
        ) : (
          <div>
            <br />
            <p>Please click on a Grade...</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default GradeList;
