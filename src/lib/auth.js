export const setToken = (token, expires_in) => {
  const expiryDate = new Date(expires_in * 1000);

  localStorage.setItem('AUTH_TOKEN', token);
  localStorage.setItem('TOKEN_EXP', expiryDate);
};

export const getToken = () => {
  return localStorage.getItem('AUTH_TOKEN');
};

export const destroyTokens = (reload = false) => {
  localStorage.removeItem('AUTH_TOKEN');
  localStorage.removeItem('TOKEN_EXP');
  localStorage.removeItem('ROLE');
  localStorage.removeItem('USER_STATUS');

  if (reload === true) {
    window.location.reload();
  } else {
    window.location.replace('/login');
  }
};

export const sendUserRole = (role) => {
  localStorage.setItem('ROLE', role);
};

export const getUserRole = () => {
  return localStorage.getItem('ROLE');
};
