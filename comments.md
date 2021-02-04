### Создание проекта и подключение React Bootstrap

- Создаём проект `npx create-react-app react-beejee`

- Удаляем лишние файлы из папки `src`. Чистим `App.js`

- Устанавливаем [React bootstrap](https://react-bootstrap.github.io/)

```js
npm install react-bootstrap bootstrap
```

Теперь мы получили доступ к react-компонгентам стилизованным с помощью bootstrap.<br>
Например, `import Table from 'react-bootstrap/Table'`

- Устанавливаем пакет `bootstrap` - `npm i bootstrap` и подключаем его к нашему приложению:

```js
// index.js
import 'bootstrapp/dist/css/bootstrap.min.css'
```

- Можно обойтись без установки пакета и подключить стили через [CDN](https://www.bootstrapcdn.com/)
  в файл-шаблон public/index.html :

```html
<link
  rel="stylesheet"
  href="https://maxcdn.bootstrapcdn.com/bootstrap/4.5.0/css/bootstrap.min.css"
  integrity="sha384-9aIt2nRpC12Uk9gS9baDl411NQApFmC26EwAOH8WgZl5MYYxFfc+NcPb1dKGj7Sk"
  crossorigin="anonymous"
/>
```

В дальнейшем нам понадобиться иконочный шрифт от Material UI.
Подключим его в файле `public\index.html`:

```html
<link
  rel="stylesheet"
  href="https://fonts.googleapis.com/icon?family=Material+Icons"
/>
```

---

### Подготавливаем данные для загрузки с сервера

- создаём файл `constants.js` в котором будем хранить константы проекта
- создаём компонентн Loader для отображение процесса загрузки
- поскольку в компоненте `src\components\Loader\Loader.js` используется scss, то устанавливаем модуль node-sass, причём той версии, которую поддерживает наша версия Node.js

```js
npm install -D node-sass@4.14.1
```

- воспользуемя предоставленным нам [API](https://uxcandy.com/~shapoval/test-task-backend/docs/v2.html) и с помощью инструмента тестирования API [Postman](https://www.postman.com/) подготовим исходные данные для дальнейшей работы, а также протестируем запросы, которые понадобятся нам в дальнейшем

### Получаем начальные данные от сервера

Воспользуемся хуком `useEffect()` для загрузки данных:

```js
// src\App.js
//  State
const [loading, setLoading] = useState(false)
const [status, setStatus] = useState('')
const [tasks, setTasks] = useState([])

//  Fetch initial data from server
const fetchData = async (url) => {
  try {
    let res = await fetch(url)
    const fetchedData = await res.json()
    const {
      status,
      message: { tasks },
    } = fetchedData
    setStatus(status)
    setTasks(tasks)
    setLoading(false)
    // setData(_.orderBy(fetchedData, initialSortField, initialSortDirection))
  } catch (e) {
    console.log(
      `${e.message}: cервер не возвращает нужные данные. Попробуйте позже ...`
    )
  }
}

useEffect(() => {
  setLoading(true)
  fetchData(getUrl)
}, [])
```

### Отображение данных, полученных от сервера

- На основе компонента [Table](https://react-bootstrap.github.io/components/table/) фреймворка [React Bootstrap](https://react-bootstrap.netlify.app/) cоздаём свой компонент Table.

- Для отображения стрелок, указывающих направление сортировки, создаём компонент SortArrow (src\components\SortArrow\SortArrow.js)

- Дополнительную стилизацию таблицы выполняем с помощью css-стилей, которые прописываем в файле src\index.css. Эти стили подключаются к файлу src\index.js и испорльзуются во всём приложении

### Сортировка

Настраиваем сортировку

```js
//  src\App.js
...
//  State
...
  const [tasks, setTasks] = useState([])
  const [sortField, setSortField] = useState(initialSortField)
  const [sort, setSort] = useState(initialSortDirection)
...
// Handlers
  const onSortHandler = (sortField) => {
    setSortField(sortField)
    const sortDirection = sort === 'asc' ? 'desc' : 'asc'
    setSort(sortDirection)
    const params = `sort_field=${sortField}&sort_direction=${sortDirection}&page=1`
    fetchData(`${urlWithDeveloper}&${params}`)
  }
...
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
```

### Пагинация

- Устанавливаем модуль [react-paginate](https://www.npmjs.com/package/react-paginate) для рендеринга пагинации:

`npm install react-paginate --save`

По [ссылке](https://github.com/AdeleD/react-paginate/blob/master/demo/js/demo.js) можно ознакомиться с демо-примером как пользоваться этим модулем

- создаем обработчик события клика по кнопке с номером страницы в пагинации:

```js
//  src\components\MainTable\MainTable.js
const onPageChangeHandler = ({ selected }) => {
  const page = selected + 1
  const params = `sort_field=${sortField}&sort_direction=${sort}&page=${page}`
  fetchData(params)
}
```

- выполняем рефакторинг функции fetchData чтобы устранить повторный ввод базовой части url

```js
//  src\App.js
import { urlWithDeveloper} from './constants.js'
...
 const fetchData = async (params = '') => {
    const url = params
      ? `${urlWithDeveloper}&${params}`
      : `${urlWithDeveloper}`
...
  }
```

- стилизуем кнопки пагинации в файле глобальный стилей `src\index.css`

Профиксим баг. <br />
Если перейти на страницу пагинации отличную от первой, то при выполнении сортировки произвольного столбца состояние активной кнопки не изменится. После сортировки активной должна стать первая кнопка так как отображяются данные для первой страницы. Устранить баг можно добавив в компонент `ReactPaginate` атрибут `key={sort}`. Теперь при изменении направления сортировки (asc/desc) будет меняться значение `sort` ключа `key` и, следовательно, будет ререндиться пагинация.

### Формы и их валидация

Библиотеки есть разные. Например [react-validation](https://www.npmjs.com/package/react-validation)

Другой пример - библиотека [Formik](https://github.com/formium/formik) и дополнение к ней schema builder [Yup](https://github.com/jquense/yup) для анализа и валидации полей формы

```js
    npm install formik --save
    npm install yup --save
```

Применение библиотеки может быть не таким очевидным и простым.
