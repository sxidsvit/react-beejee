/* eslint-disable space-before-function-paren */
import { useState, useEffect } from 'react'
import axios from 'axios'
import { getUrl, createUrl, loginUrl, editUrl, developer } from '../../constants.js'
import { ApiContext } from './ApiContext'

export const ApiData = ({ children }) => {
  const [status, setStatus] = useState(null)
  const [totalTasks, setTotalTasks] = useState(0)
  const [tasks, setTasks] = useState([])
  const [message, setMessage] = useState('')
  const [token, setToken] = useState(null)

  // Get token saved in previous session from localStorage
  useEffect(() => {
    if (localStorage.getItem('token')) setToken(localStorage.getItem('token'))
  }, [setToken])

  //  Fetch data from server DB
  const fetchData = async (params = '') => {
    const url = params
      ? `${getUrl}&${params}`
      : `${getUrl}`
    setStatus(null)
    try {
      let res = await fetch(url)
      const fetchedData = await res.json()
      const { status, message: { tasks, total_task_count } } = fetchedData
      setStatus(status)
      setTotalTasks(total_task_count)
      setTasks(tasks)
    } catch (e) {
      console.log(`${e.message}: server does not return the required data. Try later ...`)
    }
  }

  //  Create new task in server DB
  const createData = async (formData) => {
    const url = `${createUrl}`
    setStatus(null)
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
      const { status } = fetchedData
      setStatus(status)
    } catch (e) {
      console.log(`${e.message}`)
    }
  }

  //  Login as admin
  const loginAsAdmin = async (formData) => {
    const url = `${loginUrl}`
    setStatus(null)
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
      const { status, message: { token: serverToken } } = fetchedData
      setStatus(status)
      localStorage.setItem('token', serverToken)
      setToken(serverToken)
    } catch (e) {
      console.log(`${e.message}`)
    }
  }

  //  Edit task
  const editTask = async (formData, id) => {
    const url = `${editUrl}${id}?developer=${developer}`
    setStatus(null)
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
      const { status, message = '' } = fetchedData
      setStatus(status)
      setMessage(message)
    } catch (e) {
      console.log(`${e.message}`)
    }
  }

  return (
    <ApiContext.Provider value={{
      fetchData, createData, loginAsAdmin, editTask,
      status, totalTasks, tasks, token, setToken, message
      // status, totalTasks, tasks, message
    }}>
      { children}
    </ApiContext.Provider>
  )
}