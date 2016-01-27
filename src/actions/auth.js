import { LOGIN, LOGOUT } from '../constants'

/*
  Returned as {action: result }
 */

export function login() {
  return {
    type: LOGIN,
    jwt: true
  }
}

export function logout() {
  return {
    type: LOGOUT,
    jwt: false
  }
}
