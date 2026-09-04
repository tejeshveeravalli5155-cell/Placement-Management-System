// Helpers around the JWT issued by POST /auth/login.
// Token + user profile are kept in localStorage so a refresh doesn't log
// the admin out; PrivateRoute and the axios interceptor read from here.

const TOKEN_KEY = "pms_token";
const USER_KEY = "pms_user";

export function isLoggedIn() {
  return !!localStorage.getItem(TOKEN_KEY);
}

export function getToken() {
  return localStorage.getItem(TOKEN_KEY);
}

export function getUser() {
  const raw = localStorage.getItem(USER_KEY);
  return raw ? JSON.parse(raw) : null;
}

export function login(token, user) {
  localStorage.setItem(TOKEN_KEY, token);
  if (user) {
    localStorage.setItem(USER_KEY, JSON.stringify(user));
  }
}

export function logout() {
  localStorage.removeItem(TOKEN_KEY);
  localStorage.removeItem(USER_KEY);
}
