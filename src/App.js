import { useState, useEffect } from 'react';
import Loader from './components/Loader/Loader';
import MainTable from './components/MainTable/MainTable';
import { getUrl } from './constants.js'

function App() {

  // Initialization
  // const initialSortDirection = 'asc'
  // const initialSortField = 'id'

  //  State
  const [loading, setLoading] = useState(false)
  const [status, setStatus] = useState('')
  const [tasks, setTasks] = useState([])


  //  Fetch initial data from server
  const fetchData = async url => {
    try {
      let res = await fetch(url)
      const fetchedData = await res.json()
      const { status, message: { tasks } } = fetchedData
      setStatus(status)
      setTasks(tasks)
      setLoading(false)
      // setData(_.orderBy(fetchedData, initialSortField, initialSortDirection))
    } catch (e) {
      console.log(`${e.message}: cервер не возвращает нужные данные. Попробуйте позже ...`)
    }
  }

  useEffect(() => {
    setLoading(true)
    fetchData(getUrl)

  }, [])

  return (
    <div className="pt-5">
      {loading && <Loader />}
      <MainTable
        data={tasks}
        sort='asc'
        sortField='email'
        onSort={() => { }}
        onRowSelect={() => { }}
      />

    </div>
  );
}

export default App;
