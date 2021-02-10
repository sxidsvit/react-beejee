const cors = 'https://cors-anywhere.herokuapp.com/'

// how is developer
export const developer = 'sxidsvit'

// alerts' texts
export const loginSuccessText = 'You logged as admin and can edit any task'
export const loginErrorText = 'Something went wrong. Please try again later ...'

export const newTaskSuccessText = 'New task added successfully'
export const newTaskErrorText = 'Something went wrong. Please try again later ...'

export const editTaskSuccessText = 'New task edited successfully'
export const editTaskErrorText = 'Something went wrong. Please try again later ...'

//  text for status code
export const statusArray = [
  { code: Number(0), text: 'not completed' },
  { code: Number(1), text: 'not completed, edited' },
  { code: Number(10), text: 'completed' },
  { code: Number(11), text: 'completed, edited' },
]
export const statusArrayForUser = [
  { code: Number(0), text: 'not completed' },
  { code: Number(1), text: 'not completed' },
  { code: Number(10), text: 'completed' },
  { code: Number(11), text: 'completed' },
]
//  admin' login & password 
export const admin = 'admin'
export const password = 123

//  pagination
export const dataPerPage = 3

//  url for testing errors
export const baseUrlWrong = 'https://uxcandy11.com/~shapoval/test-task-backend/v2/'

//  urls
export const baseUrl = 'https://uxcandy.com/~shapoval/test-task-backend/v2/'
export const getUrl = `${baseUrl}?developer=${developer}`
export const createUrl = `${cors}${baseUrl}create?developer=${developer}`
export const loginUrl = `${cors}${baseUrl}login?developer=${developer}`
export const editUrl = `${cors}${baseUrl}edit/`
