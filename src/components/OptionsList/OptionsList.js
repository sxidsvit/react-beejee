import React from 'react'
import { statusArray } from '../../constants'

const OptionsList = () => {

  return (
    <React.Fragment>
      {statusArray.map(item =>
        <option key={item.code} className="text-success" value={item.code}>{item.text}</option>)}
    </React.Fragment>
  )
}

export default OptionsList