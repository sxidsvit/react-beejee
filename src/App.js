import { useState, useEffect, useContext } from 'react';
import { ApiContext } from './context/Api/ApiContext'
import Loader from './components/Loader/Loader';
import MainTable from './components/MainTable/MainTable'
import ModeSelector from './components/ModeSelector/ModeSelector'
import FormEditData from './components/FormEditData/FormEditData'
import Alert from './components/Alert/Alert'
import { dataPerPage } from './constants.js'

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

  const { fetchData, token } = useContext(ApiContext)

  useEffect(() => {
    setLoading(true)
    fetchData()
    setLoading(false)
    return () => localStorage.removeItem('token')
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

  // Task selecting for editing
  const onEditSelectHandler = (item) => {
    setEditTask(false)
    setTimeout(() => {
      setEditTask(true)
    }, 300);
    setCurrentItem(item)
  }

  return (
    <div className="pt-1">
      {loading && <Loader />}
      <ModeSelector />
      {(editTask && token)
        && <FormEditData currentItem={currentItem} setEditTask={setEditTask} />}
      <Alert />
      <MainTable
        sort={sort}
        sortField={sortField}
        dataPerPage={dataPerPage}
        onSort={onSortHandler}
        onEditSelect={onEditSelectHandler}
      />
    </div>
  )
}

export default App;
