import { useState, useEffect } from 'react';
import Loader from './components/Loader/Loader';
import MainTable from './components/MainTable/MainTable'
import ModeSelector from './components/ModeSelector/ModeSelector'
// import FormNewData from './components/FormNewData/FormNewData'
import { developer, dataPerPage } from './constants.js'
// import Context from './context'
import useFetch from './useFetch'

function App() {

  // Initialization
  const initialSortField = 'username'
  const initialSortDirection = 'asc' // asc/desc

  //  State

  // const [totalTasks, setTotalTasks] = useState(0)
  // const [status, setStatus] = useState('')
  // const [tasks, setTasks] = useState([])
  const [loading, setLoading] = useState(false)

  const [mode, setMode] = useState('')
  const [sort, setSort] = useState(initialSortDirection)
  const [sortField, setSortField] = useState(initialSortField)

  const { fetchData, tasks, totalTasks } = useFetch()
  console.log('App- totalTasks: ', totalTasks);
  console.log('App- tasks: ', tasks);
  console.log('App- fetchData: ', fetchData);

  useEffect(() => {
    setLoading(true)
    const params = `developer=${developer}`
    fetchData(params)
    setLoading(false)
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
        {/* <FormNewData data={totalTasks} setData={setTasks} fetchData={fetchData} /> */ }
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
