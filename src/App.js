import { useState, useEffect } from 'react';
import Loader from './components/Loader/Loader';
import MainTable from './components/MainTable/MainTable'
import ModeSelector from './components/ModeSelector/ModeSelector'
import FormNewData from './components/FormNewData/FormNewData'
import { dataPerPage } from './constants.js'
import useFetch from './useFetch'

function App() {

  // Initialization
  const initialSortField = 'username'
  const initialSortDirection = 'asc' // asc/desc

  //  State
  const [loading, setLoading] = useState(false)
  const [mode, setMode] = useState('')
  const [sort, setSort] = useState(initialSortDirection)
  const [sortField, setSortField] = useState(initialSortField)

  const { fetchData, tasks, totalTasks } = useFetch()

  useEffect(() => {
    setLoading(true)
    fetchData()
    setLoading(false)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // Handlers 

  // - Sorting by the selected field & fetching data for a specified page
  const onSortHandler = (sortField, page) => {
    setSortField(sortField)
    const sortDirection = sort === 'asc' ? 'desc' : 'asc'
    setSort(sortDirection)
    const params = `sort_field=${sortField}&sort_direction=${sortDirection}&page=${page}`
    const url = `${params}`
    fetchData(url)
  }

  // - Create new task or login as admin
  const onModeSelectHandler = (mode) => () => {
    console.log('onModeSelectHandler - mode: ', mode);
    setMode(mode)
  }

  return (
    <div className="pt-5">
      {loading && <Loader />}
      <ModeSelector onSelect={onModeSelectHandler} />
      {
        mode === 'newTask' && <FormNewData setMode={setMode} />
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
