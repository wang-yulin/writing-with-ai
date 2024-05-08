export const setToken = (token: string) =>
  window.sessionStorage.setItem("auth_token", token);

export const getToken = () => window.sessionStorage.getItem("auth_token");

export const clearToken = () => window.sessionStorage.removeItem("auth_token");
