export const validateEmail = (email) => {
  if (!email || email.trim() === '') {
    return { valid: false, error: 'Email is required' };
  }
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return { valid: false, error: 'Please enter a valid email' };
  }
  return { valid: true, error: null };
};

export const validatePassword = (password) => {
  if (!password || password.trim() === '') {
    return { valid: false, error: 'Password is required' };
  }
  if (password.length < 6) {
    return { valid: false, error: 'Password must be at least 6 characters' };
  }
  return { valid: true, error: null };
};

export const validateConfirmPassword = (password, confirmPassword) => {
  if (!confirmPassword || confirmPassword.trim() === '') {
    return { valid: false, error: 'Please confirm your password' };
  }
  if (password !== confirmPassword) {
    return { valid: false, error: 'Passwords do not match' };
  }
  return { valid: true, error: null };
};

export const validateLoginForm = (email, password) => {
  const errors = {};
  
  const emailResult = validateEmail(email);
  if (!emailResult.valid) errors.email = emailResult.error;
  
  const passwordResult = validatePassword(password);
  if (!passwordResult.valid) errors.password = passwordResult.error;
  
  return {
    valid: Object.keys(errors).length === 0,
    errors
  };
};

export const validateSignupForm = (email, password, confirmPassword) => {
  const errors = {};
  
  const emailResult = validateEmail(email);
  if (!emailResult.valid) errors.email = emailResult.error;
  
  const passwordResult = validatePassword(password);
  if (!passwordResult.valid) errors.password = passwordResult.error;
  
  const confirmResult = validateConfirmPassword(password, confirmPassword);
  if (!confirmResult.valid) errors.confirmPassword = confirmResult.error;
  
  return {
    valid: Object.keys(errors).length === 0,
    errors
  };
};
