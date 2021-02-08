import React, { useContext } from 'react'
import ReactPaginate from 'react-paginate'
import Table from 'react-bootstrap/Table'
import SortArrow from '../SortArrow/SortArrow'
import { keyGen, getTextFromCode } from '../../utils'
import { ApiContext } from '../../context/Api/ApiContext'

const result = getTextFromCode('10')
console.log('result: ', result);

const MainTable = ({
  data,
  sort,
  sortField,
  totalTasks,
  dataPerPage,
  currentPage = 1,
  onSort,
  fetchData,
  onEditSelect
}) => {

  //  get amin token
  const { token } = useContext(ApiContext)

  //  Data checking to render
  if (!data?.[0]) { return <></> }



  //  Array with names of table columns  
  const fields = Object.keys(data[0]).filter(item => item !== 'id')
  console.log('data: ', data[0]['status']);

  //  Number of pages in pagination
  const pageCount = totalTasks % dataPerPage ? Math.floor(totalTasks / dataPerPage) + 1 : totalTasks / dataPerPage

  //  Handler for clicking on the selected pagination page
  const onPageChangeHandler = ({ selected }) => {
    const page = selected + 1
    const params = `sort_field=${sortField}&sort_direction=${sort}&page=${page}`
    console.log('onPageChangeHandler - params: ', params);
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
                <tr key={index + keyGen} onClick={onEditSelect.bind(null, item)}>
                  { fields.map(field => (
                    <td
                      key={field} >
                      { field === 'status' ? getTextFromCode(item[field]) : item[field]}
                    </td>)
                  )}
                  {token &&
                    <td>
                      <button className="btn btn-success ml-3 mr-3 pt-1 pb-1 ">
                        Edit</button>
                    </td>
                  }
                </tr>
              ))
            }
          </tbody>
        </Table>
      }
      {
        totalTasks > dataPerPage
          ? <ReactPaginate
            key={sort}
            pageCount={pageCount}
            pageRangeDisplayed={2}
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
          /> : null
      }
    </div>
  )
}

export default MainTable
