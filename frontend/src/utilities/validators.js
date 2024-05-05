export const validateUsername = (username) => {
  // Check if there's any data
  if (!username.trim()) {
    return 'Username is required';
  }
  // Check if there are any spaces in the username
  if (/\s/.test(username)) {
    return 'Username cannot contain spaces';
  }
  // Check if username length is between 3 and 16 characters
  if ( username.trim().length < 3 || username.trim().length > 16) {
    return 'Username should contain between 3 and 16 characters';
  }
}

export const validatePassword = (password) => {
  // Check if there's any data
  if (!password) {
    return'Password is required';
  }
  // Check if password contains between 8 and 128 characters
  if (password.length < 8) {
    return 'Password should contain at least 8 characters';
  }
  if (password.length > 128) {
    return 'Password cannot contain more than 128 characters';
  }
  // Check if password contains the following characters: special, uppercase, lowercase, number
  if (!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[-+_!@#$%^&*(),.?"':{}|<>]).+$/.test(password)) {
    return 'Password should contain at least one special character, one uppercase and lowercase letter and one number';
  }
}

export const validateEmail = (email) => {
  // Check if there's any data
  if (!email.trim()) {
    return 'Email is required';
  }
  // Check if there are any spaces in the email
  if (/\s/.test(email)) {
    return 'Email cannot contain spaces';
  }
  // Check if email contains less than 255 characters
  if (email.length > 255) {
    return 'Email cannot contain more than 255 characters'
  }
  // Check if email format is correct
  if (!/\S+@\S+\.\S+/.test(email)) {
    return 'Email is not valid';
  }
}