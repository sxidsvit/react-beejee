import React from 'react'
import Table from 'react-bootstrap/Table'
import { SortArrow } from '../SortArrow/SortArrow'

const MainTable = ({ data, sort, sortField, onSort, onRowSelect }) => {
  const keyGen = () => Date.now().toString().substr(8, 13)

  if (!data?.[0]) { return <></> }

  const fields = Object.keys(data[0]).filter(item => item !== 'id')

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
          data.map((item, index) => (
            <tr key={keyGen} onClick={onRowSelect.bind(null, item)}>
              { fields.map(field => (<td key={field}>{item[field]}</td>))}
            </tr>
          ))
        }
      </tbody>
    </Table>
  )
}

export default MainTable
