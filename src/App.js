import { useState, useEffect, useContext } from 'react';
import Loader from './components/Loader/Loader';
import MainTable from './components/MainTable/MainTable'
import ModeSelector from './components/ModeSelector/ModeSelector'
import FormEditData from './components/FormEditData/FormEditData'
import { dataPerPage } from './constants.js'
import { ApiContext } from './context/Api/ApiContext'

function App() {

  // Initialization
  const initialSortField = 'username'
  const initialSortDirection = 'asc' // asc/desc

  //  State
  const [loading, setLoading] = useState(false)
  const [sort, setSort] = useState(initialSortDirection)
  const [sortField, setSortField] = useState(initialSortField)
  const [editTask, setEditTask] = useState(false)
  const [currentItem, setCurrentItem] = useState({})

  const { fetchData, tasks, totalTasks, token } = useContext(ApiContext)

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

  const onEditSelectHandler = (item) => {
    console.log('App - item: ', item);
    // console.log('App - token: ', token);
    setEditTask(true)
    setCurrentItem(item)

  }

  return (
    <div className="pt-5">
      {loading && <Loader />}
      <ModeSelector />
      {(editTask && token)
        && <FormEditData currentItem={currentItem} setEditTask={setEditTask} />}
      <MainTable
        data={tasks}
        sort={sort}
        sortField={sortField}
        totalTasks={totalTasks}
        dataPerPage={dataPerPage}
        onSort={onSortHandler}
        fetchData={fetchData}
        onEditSelect={onEditSelectHandler}
      />
    </div>
  )
}

export default App;
