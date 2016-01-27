import { LOGIN, LOGOUT } from '../constants'

const initialState = {
  user: {
    jwt: false
  }
}

export default function login(state = initialState, action) {
  if (action.type === LOGIN || action.type === LOGOUT) {
    state = {
      user: {
        jwt: action.jwt
      }
    }
  }

  return state
}
