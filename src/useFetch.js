/* eslint-disable space-before-function-paren */
import { useState } from 'react'
import axios from 'axios'
import { getUrl, createUrl, loginUrl } from './constants.js'

function useFetch() {
  const [status, setStatus] = useState('')
  const [totalTasks, setTotalTasks] = useState(0)
  const [tasks, setTasks] = useState([])
  const [token, setToken] = useState('')

  //  Fetch data from server DB
  const fetchData = async (params = '') => {
    const url = params
      ? `${getUrl}&${params}`
      : `${getUrl}`
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

  //  Create new task in server DB
  const createData = async (formData) => {
    const url = `${createUrl}`
    try {
      let res = await axios({
        url: url,
        method: 'post',
        data: formData,
        headers: {
          'Cache-Control': 'no-cache',
          'Content-Type': 'multipart/form-data',
          'Accept': '*/*'
        },
        responseType: 'json',
      })
      const fetchedData = await res.data
      const { status, message } = fetchedData
      setStatus(status)
      setTasks(message)
    } catch (e) {
      console.log(`${e.message}`)
    }
  }

  //  Login as admin
  const loginAsAdmin = async (formData) => {
    const url = `${loginUrl}`
    console.log('loginAsAdmin - url: ', url);
    try {
      let res = await axios({
        url: url,
        method: 'post',
        data: formData,
        headers: {
          'Cache-Control': 'no-cache',
          'Content-Type': 'multipart/form-data',
          'Accept': '*/*'
        },
        responseType: 'json',
      })
      const fetchedData = await res.data
      const { status, message: { token } } = fetchedData
      setStatus(status)
      // setTasks(message)
      setToken(token)
      console.log('token: ', token)
      localStorage.setItem('token', token)
    } catch (e) {
      console.log(`${e.message}`)
    }
  }

  return {
    fetchData,
    createData,
    loginAsAdmin,
    status,
    totalTasks,
    tasks,
  }
}

export default useFetch
