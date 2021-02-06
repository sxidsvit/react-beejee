import { useState } from 'react'
import { urlWithDeveloper } from './constants.js'

function useFetch() {
  const [status, setStatus] = useState('')
  const [totalTasks, setTotalTasks] = useState(0)
  const [tasks, setTasks] = useState([])

  //  Fetch data from server
  const fetchData = async (params = '') => {
    const url = params
      ? `${urlWithDeveloper}&${params}`
      : `${urlWithDeveloper}`
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
  return {
    fetchData,
    status,
    totalTasks,
    tasks,
  }
}

export default useFetch
