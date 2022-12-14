import { ErrorWithMsg } from "./customError";

export const BASE_URL = 'https://theAshbringer.nomoredomains.club';

const handleResponse = (res) => {
  if (res.ok) {
    const json = res.json();
    if (json) {
      return json;
    }
  }
  return Promise.reject(res);
}

export const register = ({ password, email }) => {
  return fetch(`${BASE_URL}/signup`, {
    method: 'POST',
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ password, email })
  })
    .then((res) => {
      if (res.status === 201) {
        return handleResponse(res)
      }
      if (res.status === 400) {
        return Promise.reject(new ErrorWithMsg('Ошибка валидации'))
      }
      if (res.status === 409) {
        return Promise.reject(new ErrorWithMsg('Пользователь уже зарегистрирован'))
      }
      return Promise.reject(new ErrorWithMsg('Что-то пошло не так'))
    })
}

export const authorize = ({ password, email }) => {
  return fetch(`${BASE_URL}/signin`, {
    method: 'POST',
    credentials: 'include',
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ password, email })
  })
    .then((res) => {
      if (res.status === 200) {
        return handleResponse(res)
      }
      if (res.status === 400) {
        return Promise.reject(new ErrorWithMsg('Ошибка валидации'))
      }
      if (res.status === 401) {
        return Promise.reject(new ErrorWithMsg('Неверный логин или пароль'))
      }
      return Promise.reject(new ErrorWithMsg('Что-то пошло не так'))
    })
}

export const getContent = () => {
  console.log('getContent');
  return fetch(`${BASE_URL}/users/me`, {
    method: 'GET',
    credentials: 'include',
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((res) => handleResponse(res))
}

export const logout = () => {
  console.log('logout');
  return fetch(`${BASE_URL}/logout`, {
    credentials: 'include',
  })
    .then((res) => {
      if (res.status !== 204) {
        return Promise.reject(new ErrorWithMsg('Что-то пошло не так'))
      }
    })
}
