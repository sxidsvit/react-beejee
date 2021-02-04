import { useState, useEffect } from 'react';
import Loader from './components/Loader/Loader';
import MainTable from './components/MainTable/MainTable'
import ModeSelector from './components/ModeSelector/ModeSelector'
import FormNewData from './components/FormNewData/FormNewData'
import { baseUrl, developer, dataPerPage } from './constants.js'

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
  const [mode, setMode] = useState('')


  //  Fetch initial data from server
  const fetchData = async (params = '') => {
    console.log('fetchData - params: ', params);
    const url = params
      ? `${baseUrl}?${params}`
      : `${baseUrl}`
    console.log('fetchData - url: ', url);
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
    const params = `developer=${developer}`
    fetchData(params)
  }, [])

  // Handlers 
  const onModeSelectHandler = (mode) => () => {
    console.log('onModeSelectHandler - mode: ', mode);
    setMode(mode)
  }

  //  Sorting by the selected field & fetching data for a specified page
  const onSortHandler = (sortField, page) => {
    setSortField(sortField)
    const sortDirection = sort === 'asc' ? 'desc' : 'asc'
    setSort(sortDirection)
    const params = `developer=${developer}&sort_field=${sortField}&sort_direction=${sortDirection}&page=${page}`
    const url = `${params}`
    fetchData(url)
  }

  return (
    <div className="pt-5">
      {loading && <Loader />}
      <ModeSelector onSelect={onModeSelectHandler} />
      {
        mode === 'newTask' &&
        <FormNewData data={totalTasks} setData={setTasks} fetchData={fetchData} />
      }
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
