import { statusArray } from './constants'

export const keyGen = () => Date.now().toString().substr(8, 13)

export const getTextFromCode = (code) =>
  statusArray.filter(item => item.code === Number(code))[0].text
