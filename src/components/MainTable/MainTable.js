import React from 'react'
import Table from 'react-bootstrap/Table'
import ReactPaginate from 'react-paginate'
import { SortArrow } from '../SortArrow/SortArrow'

const MainTable = ({ data, sort, sortField, totalTasks, dataPerPage, currentPage = 1, onSort, fetchData, onRowSelect }) => {

  // const [currentPage, setCurrentPage] = useState(0)

  const keyGen = () => Date.now().toString().substr(8, 13)

  if (!data?.[0]) { return <></> }

  const fields = Object.keys(data[0]).filter(item => item !== 'id')

  const pageCount = totalTasks % dataPerPage ? totalTasks / dataPerPage + 1 : totalTasks / dataPerPage

  const onPageChangeHandler = ({ selected }) => {
    const page = selected + 1
    const params = `sort_field=${sortField}&sort_direction=${sort}&page=${page}`
    fetchData(params)
  }

  return (
    <div className="d-flex flex-column justify-content-between align-items-center mt-5 mb-5">
      {
        <Table striped bordered hover variant="dark" responsive="sm" >
          <thead>
            <tr>
              {
                fields.map(field => (
                  <th onClick={onSort.bind(null, field, currentPage)} key={field}>
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
      }
      {
        totalTasks > dataPerPage
          ? <ReactPaginate
            pageCount={pageCount}
            pageRangeDisplayed={4}
            marginPagesDisplayed={2}
            previousLabel={'<'}
            nextLabel={'>'}
            breakLabel={'...'}
            breakClassName={'break-me'}
            containerClassName={'pagination'}
            activeClassName={'page-item active'}
            previousClassName="page-item"
            nextClassName="page-item"
            pageLinkClassName="page-link"
            previousLinkClassName="page-link"
            nextLinkClassName="page-link"
            onPageChange={onPageChangeHandler}
            forcePage={currentPage} // To go to the first pagination button after the search
          /> : null
      }
    </div>
  )
}

export default MainTable
