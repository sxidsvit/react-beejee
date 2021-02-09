import React, { useReducer } from 'react'
import { AlertContext } from './AlertContext'
import { alertReducer } from './AlertReducer'
import { SHOW_ALERT, HIDE_ALERT } from './types'

export const AlertState = ({ children }) => {
  const [state, dispatch] = useReducer(alertReducer, null)
  const hide = () => dispatch({ type: HIDE_ALERT })
  const show = (text, type) => dispatch({
    type: SHOW_ALERT,
    payload: { text, type }
  })

  return (
    <AlertContext.Provider value={{
      hide, show, alert: state
    }}>
      {children}
    </AlertContext.Provider>
  )
}
