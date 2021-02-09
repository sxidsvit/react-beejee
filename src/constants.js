const cors = 'https://cors-anywhere.herokuapp.com/'

// how is developer
export const developer = 'sxidsvit'

// alerts' texts
export const loginSuccessText = 'You logged as admin and can edit any task'

//  text for status code
export const statusArray = [
  { code: Number(0), text: 'not completed' },
  { code: Number(1), text: 'not completed, edited' },
  { code: Number(10), text: 'completed' },
  { code: Number(11), text: 'completed, edited' },
]
//  admin' login & password 
export const admin = 'admin'
export const password = 123

//  pagination
export const dataPerPage = 3

//  urls
export const baseUrl = 'https://uxcandy.com/~shapoval/test-task-backend/v2/'
export const getUrl = `${baseUrl}?developer=${developer}`
export const createUrl = `${cors}${baseUrl}create?developer=${developer}`
export const loginUrl = `${cors}${baseUrl}login?developer=${developer}`
export const editUrl = `${cors}${baseUrl}edit/`
