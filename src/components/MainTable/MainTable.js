import React from 'react'
import Table from 'react-bootstrap/Table'
import { SortArrow } from '../SortArrow/SortArrow'

const MainTable = ({ data, sort, sortField, onSort, onRowSelect }) => {

  if (!data?.[0]) { return <></> }

  const fields = Object.keys(data[0]).filter(item => item !== 'id')
  console.log('fields: ', fields);

  return (
    <Table striped bordered hover variant="dark" responsive="sm">
      <thead>
        <tr>
          {
            fields.map(field => (
              <th onClick={onSort.bind(null, field)} key={field}>
                <div className="th-arrow">{field}
                  <SortArrow
                    sortField={sortField}
                    collumnName={field}
                    sortDirection={sort}
                  />
                </div>
              </th>
            ))
          }

        </tr>
      </thead>
      <tbody>
        {
          data.map(item => (
            <tr key={item[fields[0]] + item[fields[fields.length - 1]]} onClick={onRowSelect.bind(null, item)}>
              { fields.map(field => (<td key={field}>{item[field]}</td>))}
            </tr>
          ))
        }
      </tbody>
    </Table>
  )
}

export default MainTable
