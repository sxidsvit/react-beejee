import React from 'react'

const ModeSelector = ({ onSelect }) => {

  return (
    <div style={{ display: 'flex', justifyContent: 'center', padding: ' 50px 0' }}>
      <button onClick={onSelect('newTask')} className="btn btn-success mr-3">
        Create new task</button>
      <button onClick={onSelect('adminLogin')} className="btn btn-danger">
        Login as admin</button>
    </div>
  )
}

export default ModeSelector
