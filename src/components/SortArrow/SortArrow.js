import React from 'react'

export const SortArrow = (props) => {

  const sortDirection = props.sortDirection === 'asc' ? `arrow_drop_down` : `arrow_drop_up`
  const defaultSortDeraction = `arrow_drop_down`

  const styles = {
    spanStyle: {
      fontSize: '24px',
      cursor: 'pointer'
    }
  }

  return (
    <>
      { props.sortField === props.collumnName
        ? <span className="material-icons" style={styles.spanStyle} >
          {sortDirection} </span>
        : <span className="material-icons" style={styles.spanStyle} >
          {defaultSortDeraction} </span>}
    </>
  )
}
