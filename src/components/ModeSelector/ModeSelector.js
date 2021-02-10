import React, { Fragment, useState, useContext, useEffect } from 'react'
import FormNewData from '../FormNewData/FormNewData'
import FormLogin from '../FormLogin/FormLogin'
import { ApiContext } from '../../context/Api/ApiContext'


const ModeSelector = () => {
  const [mode, setMode] = useState(null)
  // Get reactive token from context
  const { setToken } = useContext(ApiContext)

  useEffect(() => {
    if (localStorage.getItem('token')) setMode('adminLogout')
  }, [setMode])

  const onModeSelectHandler = (mode) => () => {
    setMode(mode)
    // Trigering Login/Logout
    if (mode === 'adminLogout') {
      localStorage.removeItem('token')
      setToken(null)
      setMode(null)
    }
  }

  let buttons

  if (mode === 'newTask' || 'adminLogin' || null) {
    buttons =
      (<>
        <button onClick={onModeSelectHandler('newTask')} className="btn btn-success">
          New task</button>
        <button onClick={onModeSelectHandler('adminLogin')} className="btn btn-danger">
          Login </button>
      </>)
  }
  if (mode === 'adminLogout') {
    buttons =
      (<>
        <button onClick={onModeSelectHandler('newTask')} className="btn btn-success">
          New task</button>
        <button onClick={onModeSelectHandler('adminLogout')} className="btn btn-danger">
          Logout </button>
      </>)
  }


  return (
    <Fragment>
      <div className="d-flex justify-content-center pt-1">
        {buttons}
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
