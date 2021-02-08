import React, { Fragment, useState } from 'react'
import FormNewData from '../FormNewData/FormNewData'
import FormLogin from '../FormLogin/FormLogin'

const ModeSelector = () => {
  const [mode, setMode] = useState('')

  const onModeSelectHandler = (mode) => () => {
    console.log('onModeSelectHandler - mode: ', mode);
    setMode(mode)
  }
  return (
    <Fragment>
      <div style={{ display: 'flex', justifyContent: 'center', padding: ' 50px 0' }}>
        <button onClick={onModeSelectHandler('newTask')} className="btn btn-success mr-3">
          Create new task</button>
        <button onClick={onModeSelectHandler('adminLogin')} className="btn btn-danger">
          Login as admin</button>
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
