import React, { Fragment, useState, useContext } from 'react'
import FormNewData from '../FormNewData/FormNewData'
import FormLogin from '../FormLogin/FormLogin'
import { ApiContext } from '../../context/Api/ApiContext'


const ModeSelector = () => {
  const [mode, setMode] = useState('')
  // Get reactive token from context
  const { token, setToken } = useContext(ApiContext)
  // Get not reactive token from localStorage
  // const notReactiveToken = localStorage.getItem('token')
  // const token = localStorage.getItem('token')

  const onModeSelectHandler = (mode) => () => {
    setMode(mode)
    // Trigering Login/Logout
    if (mode === 'adminLogin' && token) {
      localStorage.removeItem('token')
      setToken(null)
      setMode('')
    }
  }
  return (
    <Fragment>
      <div className="d-flex justify-content-center pt-1">
        <button onClick={onModeSelectHandler('newTask')} className="btn btn-success">
          New task</button>
        <button onClick={onModeSelectHandler('adminLogin')} className="btn btn-danger">
          {!token ? 'Login' : 'Logout'}
        </button>
      </div>
      {
        mode === 'newTask' && <FormNewData setMode={setMode} />
      }
      {
        mode === 'adminLogin' && <FormLogin setMode={setMode} />
      }
    </Fragment>
  )
}

export default ModeSelector
