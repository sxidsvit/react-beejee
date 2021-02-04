import { useState, useEffect } from 'react';
import Loader from './components/Loader/Loader';
import MainTable from './components/MainTable/MainTable';
import { urlWithDeveloper, dataPerPage } from './constants.js'

function App() {

  // Initialization
  const initialSortField = 'username'
  const initialSortDirection = 'asc' // asc/desc

  //  State
  const [loading, setLoading] = useState(false)
  const [status, setStatus] = useState('')
  const [tasks, setTasks] = useState([])
  const [sort, setSort] = useState(initialSortDirection)
  const [sortField, setSortField] = useState(initialSortField)
  const [totalTasks, setTotalTasks] = useState(0)


  //  Fetch initial data from server
  const fetchData = async (params = '') => {
    const url = params
      ? `${urlWithDeveloper}&${params}`
      : `${urlWithDeveloper}`
    try {
      let res = await fetch(url)
      const fetchedData = await res.json()
      const { status, message: { tasks, total_task_count } } = fetchedData
      setTotalTasks(total_task_count)
      setStatus(status)
      setTasks(tasks)
      setLoading(false)
    } catch (e) {
      console.log(`${e.message}: cервер не возвращает нужные данные. Попробуйте позже ...`)
    }
  }

  useEffect(() => {
    setLoading(true)
    fetchData()
  }, [])

  // Handlers 
  const onSortHandler = (sortField, page) => {
    setSortField(sortField)
    const sortDirection = sort === 'asc' ? 'desc' : 'asc'
    setSort(sortDirection)
    const params = `sort_field=${sortField}&sort_direction=${sortDirection}&page=${page}`
    const url = `${urlWithDeveloper}&${params}`
    fetchData(url)
  }

  return (
    <div className="pt-5">
      {loading && <Loader />}
      <MainTable
        data={tasks}
        sort={sort}
        sortField={sortField}
        totalTasks={totalTasks}
        dataPerPage={dataPerPage}
        onSort={onSortHandler}
        fetchData={fetchData}
        onRowSelect={() => { }}
      />
    </div>
  )
}

export default App;
