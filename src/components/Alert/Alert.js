import React, { useContext } from 'react'
import { AlertContext } from '../../context/Alert/AlertContext'

const Alert = () => {
  const { alert, hide } = useContext(AlertContext)
  console.log('Alert - alert: ', alert);

  if (!alert) return null

  setTimeout(() => {
    hide()
  }, 3000);

  return (
    <div
      className={`alert alert-${alert.type || 'secondary'} text-center`}
      role="alert" >
      {alert.text}
    </div>
  )
}

export default Alert
