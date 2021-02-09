/* eslint-disable no-undef */
import { statusArray } from './constants'

export const keyGen = () => Date.now().toString().substr(8, 13)

export const getTextFromCode = (code) =>
  statusArray.filter(item => item.code === Number(code))[0].text

export const statusMessage = (show, status, successText, errorText) => {
  if (status === 'ok') {
    show(`${successText}`, 'success')
  } else {
    show(`${errorText}`, 'danger')
  }
}
