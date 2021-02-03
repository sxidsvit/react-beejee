import { useState, useEffect } from 'react';
import _ from 'lodash'
import Loader from './components/Loader/Loader';
import MainTable from './components/MainTable/MainTable';
import { getUrl } from './constants.js'

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
    try {
      let res = await fetch(url)
      const fetchedData = await res.json()
      const { status, message: { tasks } } = fetchedData
      setStatus(status)
      setTasks(_.orderBy(tasks, initialSortField, initialSortDirection))
      setLoading(false)
    } catch (e) {
      console.log(`${e.message}: cервер не возвращает нужные данные. Попробуйте позже ...`)
    }
  }

  useEffect(() => {
    setLoading(true)
    fetchData(getUrl)

  }, [])

  // Handlers 
  const onSortHandler = (sortField) => {
    // To avoid unnecessary requests to the server the cloneData variable has been created
    const clonedTasks = tasks
    const sortDirection = sort === 'asc' ? 'desc' : 'asc'
    const orderedTasks = _.orderBy(clonedTasks, sortField, sortDirection)
    console.log('orderedTasks: ', orderedTasks);

    setTasks(orderedTasks)
    setSort(sortDirection)
    setSortField(sortField)
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
