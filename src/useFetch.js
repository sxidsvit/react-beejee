/* eslint-disable space-before-function-paren */
import { useState } from 'react'
import { getUrl, createUrl } from './constants.js'

function useFetch() {
  const [status, setStatus] = useState('')
  const [totalTasks, setTotalTasks] = useState(0)
  const [tasks, setTasks] = useState([])

  //  Fetch data from server DB
  const fetchData = async (params = '') => {
    const url = params
      ? `${getUrl}&${params}`
      : `${getUrl}`
    console.log('fetchData - url: ', url);
    try {
      let res = await fetch(url)
      const fetchedData = await res.json()
      const { status, message: { tasks, total_task_count } } = fetchedData
      setStatus(status)
      setTotalTasks(total_task_count)
      setTasks(tasks)
    } catch (e) {
      console.log(`${e.message}: cервер не возвращает нужные данные. Попробуйте позже ...`)
    }
  }

  //  Create data on server DB
  const createData = async (formData) => {
    console.log('createData: ', formData.get("username"))
    console.log('createData: ', formData.get("email"))
    console.log('createData: ', formData.get("text"))
    const url = `${createUrl}`
    try {
      let res = await fetch(url, {
        method: 'POST',
        mode: 'cors',
        headers: {
          'Cache-Control': 'no-cache',
          'Content-Type': 'multipart/form-data',
        },
        body: formData
      })
      const fetchedData = await res.json()
      const { status, message } = fetchedData
      setStatus(status)
      setTasks(message)
    } catch (e) {
      console.log(`${e.message}`)
    }
  }


  return {
    fetchData,
    createData,
    status,
    totalTasks,
    tasks,
  }
}

export default useFetch
