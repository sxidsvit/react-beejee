## BeeJee - приложение-задачник

### Тестовое задание от компании [BeeJee](https://beejee.ru/) на позицию React frontend developer:

- [описание задания](https://github.com/sxidsvit/react-beejee/tree/main/supplement/task.md)
- [требования к коду](https://github.com/sxidsvit/react-beejee/tree/main/supplement/codedemands.md)
- [протокол тестирования](https://github.com/sxidsvit/react-beejee/tree/main/supplement/testprotocol.md)
- [документация по API](https://uxcandy.com/~shapoval/test-task-backend/docs/v2.html)

### Что использовалось для разработки

#### Библиотеки и модули:

- [Bootstrap](https://getbootstrap.com/)
- [React-bootstrap](https://react-bootstrap.github.io/)
- [react-paginate](https://www.npmjs.com/package/react-paginate)
- [Formik](https://formik.org/)
- [Yup](https://github.com/jquense/yup#stringemailmessage-string--function-schema)

#### Основные технологии:

- React context
- React hooks
- Redux
- axios, fetch
- декомпозиция приложения и кода

### Как это работает

![](./supplement/demo.gif)

### [Site](https://asp-beejee.web.app/ 'Right click to open site in separate window')

### Запуск сервера и приложения одной коммандой

После копирования приложения на свой компьютер, нужно установить зависимости из package.json и
application/package.json и в консоли выполнить команду:

```js
npm run start
```

Для POST-запросов к API приложение должно быть установлено на https-скрвере.
При работе с локальной машины (localhost) можно использовать [cors-proxy](https://cors-anywhere.herokuapp.com/corsdemo) или любой аналогичный.
