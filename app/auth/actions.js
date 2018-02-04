import {
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  LOGOUT,
  SET_SESSION
} from './constants'

export const loginRequest = () => ({
  type: LOGIN_REQUEST
})

export const loginSuccess = () => ({
  type: LOGIN_SUCCESS
})

export const loginFailure = (error) => ({
  type: LOGIN_FAILURE,
  error
})

export const logout = () => ({
  type: LOGOUT
})

export const setSession = (authResult) => ({
  type: SET_SESSION,
  authResult
})
