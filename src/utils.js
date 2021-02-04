

export const fetchData = async url => {
  // console.log('fetchData - url: ', url);
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