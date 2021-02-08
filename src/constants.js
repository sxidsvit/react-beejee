const cors = 'https://cors-anywhere.herokuapp.com/'
export const developer = 'sxidsvit'

export const statusArray = [
  { code: Number(0), text: 'not completed' },
  { code: Number(1), text: 'not completed, edited' },
  { code: Number(10), text: 'completed' },
  { code: Number(11), text: 'completed, edited' },
]

export const admin = 'admin'
export const password = 123
export const dataPerPage = 3

export const baseUrl = 'https://uxcandy.com/~shapoval/test-task-backend/v2/'

export const getUrl = `${baseUrl}?developer=${developer}`

export const createUrl = `${cors}${baseUrl}create?developer=${developer}`

export const loginUrl = `${cors}${baseUrl}login?developer=${developer}`

export const editUrl = `${cors}${baseUrl}edit/`
