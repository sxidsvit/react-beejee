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

---

### Подготавливаем данные для загрузки с сервера

- создаём файл `constants.js` в котором будем хранить константы
- создаём компонентн Loader (отображение процесса загрузки)
- поскольку в компоненте `src\components\Loader\Loader.js` используется scss, то устанавливаем модуль node-sass

```js
npm install -D node-sass@4.14.1
```
