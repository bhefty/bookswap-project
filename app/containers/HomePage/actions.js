import * as types from './constants'

export const changeText = (text) => ({
  type: types.CHANGE_TEXT,
  text
})

export const increment = () => ({
  type: types.INCREMENT
})

export const decrement = () => ({
  type: types.DECREMENT
})
