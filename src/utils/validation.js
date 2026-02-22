/**
 * Validation utilities for input sanitization and validation
 * Prevents XSS, SQL injection, and other malicious input attacks
 */

/**
 * Sanitizes string input by removing potentially dangerous characters
 * @param {string} input - The input string to sanitize
 * @returns {string} - Sanitized string
 */
export const sanitizeString = (input) => {
  if (!input || typeof input !== 'string') {
    return '';
  }
  
  // Remove potentially dangerous characters
  return input
    .replace(/[<>"'&]/g, '') // Remove HTML/XML characters
    .replace(/[\\/*?|{}[\]()^$]/g, '') // Remove regex/special chars
    .trim() // Remove leading/trailing whitespace
    .slice(0, 200); // Limit length to prevent DoS
};

/**
 * Validates and sanitizes a name field
 * @param {string} name - The name to validate
 * @returns {Object} - Validation result with value and error
 */
export const validateName = (name) => {
  const sanitizedName = sanitizeString(name);
  
  if (!sanitizedName) {
    return { value: '', error: 'Name is required' };
  }
  
  if (sanitizedName.length < 2) {
    return { value: sanitizedName, error: 'Name must be at least 2 characters long' };
  }
  
  if (sanitizedName.length > 100) {
    return { value: sanitizedName, error: 'Name cannot exceed 100 characters' };
  }
  
  // Allow letters, numbers, spaces, hyphens, and apostrophes
  const nameRegex = /^[a-zA-ZÀ-ÿ\s\-'.]+$/;
  if (!nameRegex.test(sanitizedName)) {
    return { value: sanitizedName, error: 'Name contains invalid characters' };
  }
  
  return { value: sanitizedName, error: null, isValid: true };
};

/**
 * Validates and sanitizes a subject field
 * @param {string} subject - The subject to validate
 * @returns {Object} - Validation result with value and error
 */
export const validateSubject = (subject) => {
  const sanitizedSubject = sanitizeString(subject);
  
  if (!sanitizedSubject) {
    return { value: '', error: 'Subject is required' };
  }
  
  if (sanitizedSubject.length > 100) {
    return { value: sanitizedSubject, error: 'Subject cannot exceed 100 characters' };
  }
  
  // Allow letters, numbers, spaces, and common symbols
  const subjectRegex = /^[a-zA-ZÀ-ÿ0-9\s\-.,:]+$/;
  if (!subjectRegex.test(sanitizedSubject)) {
    return { value: sanitizedSubject, error: 'Subject contains invalid characters' };
  }
  
  return { value: sanitizedSubject, error: null };
};

/**
 * Validates and sanitizes a type field
 * @param {string} type - The type to validate
 * @returns {Object} - Validation result with value and error
 */
export const validateType = (type) => {
  const sanitizedType = sanitizeString(type);
  
  if (!sanitizedType) {
    return { value: '', error: 'Type is required' };
  }
  
  if (sanitizedType.length > 50) {
    return { value: sanitizedType, error: 'Type cannot exceed 50 characters' };
  }
  
  // Allow letters, numbers, spaces, and hyphens
  const typeRegex = /^[a-zA-ZÀ-ÿ0-9\s-]+$/;
  if (!typeRegex.test(sanitizedType)) {
    return { value: sanitizedType, error: 'Type contains invalid characters' };
  }
  
  return { value: sanitizedType, error: null };
};

/**
 * Validates a numeric value
 * @param {string|number} value - The value to validate
 * @returns {Object} - Validation result with value and error
 */
export const validateValue = (value) => {
  // Convert to number if it's a string
  const numValue = typeof value === 'string' ? parseFloat(value) : value;
  
  if (isNaN(numValue)) {
    return { value: 0, error: 'Value must be a valid number' };
  }
  
  if (numValue < 0) {
    return { value: 0, error: 'Value cannot be negative' };
  }
  
  if (numValue > 100) {
    return { value: 100, error: 'Value cannot exceed 100' };
  }
  
  return { value: Math.round(numValue * 100) / 100, error: null }; // Round to 2 decimal places
};

/**
 * Validates search input to prevent injection attacks
 * @param {string} searchInput - The search input to validate
 * @returns {string} - Validated and sanitized search input
 */
export const validateSearchInput = (searchInput) => {
  if (!searchInput || typeof searchInput !== 'string') {
    return '';
  }
  
  // Remove potentially dangerous characters for search
  const sanitized = searchInput
    .replace(/[<>"'&%_]/g, '') // Remove HTML/XML and SQL wildcards
    .replace(/[\\/*?|{}[\]()^$]/g, '') // Remove regex/special chars
    .trim()
    .slice(0, 100); // Limit search length
  
  return sanitized;
};

/**
 * Validates an ID parameter
 * @param {string|number} id - The ID to validate
 * @returns {Object} - Validation result with value and error
 */
export const validateId = (id) => {
  if (!id) {
    return { value: null, error: 'ID is required' };
  }
  
  // Convert number to string if needed
  const stringId = typeof id === 'number' ? id.toString() : id;
  
  // Validate that it's a valid string representation of a number
  const numId = typeof stringId === 'string' ? parseInt(stringId, 10) : stringId;
  
  return { value: stringId, error: null, isValid: true };
};

/**
 * Comprehensive validation for grade data
 * @param {Object} gradeData - The grade data to validate
 * @returns {Object} - Validation result with validated data and errors
 */
export const validateGradeData = (gradeData) => {
  const errors = {};
  const validatedData = {};
  
  // Validate each field
  const nameResult = validateName(gradeData.name);
  if (nameResult.error) errors.name = nameResult.error;
  validatedData.name = nameResult.value;
  
  const subjectResult = validateSubject(gradeData.subject);
  if (subjectResult.error) errors.subject = subjectResult.error;
  validatedData.subject = subjectResult.value;
  
  const typeResult = validateType(gradeData.type);
  if (typeResult.error) errors.type = typeResult.error;
  validatedData.type = typeResult.value;
  
  const valueResult = validateValue(gradeData.value);
  if (valueResult.error) errors.value = valueResult.error;
  validatedData.value = valueResult.value;
  
  return {
    data: validatedData,
    errors,
    isValid: Object.keys(errors).length === 0
  };
};