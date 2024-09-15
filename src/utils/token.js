const tokenKey = 'auth'

function getToken() {
  return localStorage.getItem(tokenKey)
}

function setToken(token) {
  localStorage.setItem(tokenKey, token)
}

function removeToken() {
  localStorage.removeItem(tokenKey)
}

export const tokenUtils = {
  getToken,
  setToken,
  removeToken,
}


