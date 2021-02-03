import { useState, useEffect } from 'react';
import _ from 'lodash'
import Loader from './components/Loader/Loader';
import MainTable from './components/MainTable/MainTable';
import { urlWithDeveloper } from './constants.js'

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


  //  Fetch initial data from server
  const fetchData = async url => {
    // console.log('fetchData - url: ', url);
    try {
      let res = await fetch(url)
      const fetchedData = await res.json()
      const { status, message: { tasks, total_task_count } } = fetchedData
      // console.log('total_task_count: ', total_task_count);
      setStatus(status)
      setTasks(tasks)
      setLoading(false)
    } catch (e) {
      console.log(`${e.message}: cервер не возвращает нужные данные. Попробуйте позже ...`)
    }
  }

  useEffect(() => {
    setLoading(true)
    fetchData(`${urlWithDeveloper}`)

  }, [])

  // Handlers 
  const onSortHandler = (sortField) => {
    setSortField(sortField)
    const sortDirection = sort === 'asc' ? 'desc' : 'asc'
    setSort(sortDirection)
    const params = `sort_field=${sortField}&sort_direction=${sortDirection}&page=1`
    fetchData(`${urlWithDeveloper}&${params}`)
  }

  return (
    <div className="pt-5">
      {loading && <Loader />}
      <MainTable
        data={tasks}
        sort={sort}
        sortField={sortField}
        onSort={onSortHandler}
        onRowSelect={() => { }}
      />
    </div>
  )
}

export default App;
