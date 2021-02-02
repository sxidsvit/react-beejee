import { useState } from 'react';
import Loader from './components/Loader/Loader';
import { getUrl } from './constants.js'

function App() {

  //  State
  const [loading, setLoading] = useState(false)


  //  Fetch initial data from server
  // setLoading(true)
  const fetchData = async url => {
    // setLoading(true)
    try {
      let res = await fetch(url)
      const fetchedData = await res.json()
      const status = fetchedData.status
      const tasks = fetchedData.message
      setLoading(false)
      console.log('status: ', status);
      console.log('tasks: ', tasks);
      // setLoading(false)
      return { status, tasks }
      // setData(_.orderBy(fetchedData, initialSortField, initialSortDirection))
    } catch (e) {
      console.log(`${e.message}: cервер не возвращает нужные данные. Попробуйте позже ...`)
    }
  }
  fetchData(getUrl)

  return (
    <div >
      {loading && <Loader />}
      <h1 className="mt-5 ml-5">Привет</h1>

    </div>
  );
}

export default App;
