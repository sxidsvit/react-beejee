import React, { useContext } from 'react'
import Form from 'react-bootstrap/Form'
import * as yup from 'yup'
import { Formik } from 'formik';
import Button from 'react-bootstrap/Button'
import { ApiContext } from '../../context/Api/ApiContext'
// import useFetch from '../../useFetch'


const FormEditData = ({ currentItem: { id, text, status }, setEditTask }) => {
  console.log('FormEditData - id: ', id);
  console.log('FormEditData - text: ', text);
  console.log('FormEditData - status: ', status);

  // const [openForm, setOpenForm] = useState(true)
  const { token } = useContext(ApiContext)

  // const { createData } = useFetch()

  const onAddDataHandler = (values, isValidating, errors, touched) => {
    console.log('onAddDataHandler  - values: ', values);
    isValidating.validateForm()
    // Packaging form data into a formData object
    const formData = new FormData()
    formData.append("text", values.text)
    formData.append("status", values.select)
    // Sending data to the server DB
    // createData(formData)
    isValidating.resetForm()
    setEditTask(false)
  }

  const onCloseHandler = () => {
    // setMode('')
    // setOpenForm(false)
    setEditTask(false)
  }

  // Schema for validating form data
  const schema = yup.object({
    text: yup.string().min(2, 'Minimum 2 characters').max(50, 'Maximum 50 characters').required('Required'),
    // status: yup.string().required('Required')
  })
  // Initializing Form Fields
  const initialValues = {
    // status: '0',
    text: `${text}`
  }

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={schema}
      onSubmit={onAddDataHandler}
    >
      {({
        handleSubmit: onAddDataHandler,
        handleChange,
        handleBlur,
        values,
        touched,
        isValid,
        dirty,
        errors,
        isValidating,
        isSubmitting
      }) => (
        < div className="d-flex flex-column justify-content-center align-items-center pb-3">
          <h4 className="mb-5" style={{ color: 'red' }}>Edit task</h4>
          <Form noValidate onSubmit={onAddDataHandler}>
            <Form.Row>
              <Form.Label>Text to edit</Form.Label>
              <Form.Control as="textarea" rows={2}
                name="text" value={values.text}
                onChange={handleChange}
                onBlur={handleBlur}
                isValid={touched.text && !errors.text}
                isInvalid={touched.text && errors.text}
                placeholder={`${text}`}
              />
              <Form.Control.Feedback type="valid">Looks good!</Form.Control.Feedback>
              <Form.Control.Feedback type="invalid">{errors.text}</Form.Control.Feedback>
            </Form.Row>

            <Form.Group controlId="exampleForm.SelectCustom">
              <Form.Label>Task' status</Form.Label>
              <Form.Control as="select" custom name="select">
                <option value="0">не выполнена</option>
                <option value="1">не выполнена, отредактирована админом</option>
                <option selected value="10">выполнена</option>
                <option value="11">выполнена, отредактирована админом</option>
              </Form.Control>
            </Form.Group>


            <Form.Group className="text-center">
              <Button type="submit"
                className="btn btn-success mt-2 mb-5"
                disabled={!dirty || !isValid || isSubmitting}
              >
                Send form</Button>
              <Button
                className="btn btn-danger ml-5 mt-2 mb-5"
                onClick={onCloseHandler}
              >
                Close form</Button>
            </Form.Group>
          </Form>
        </div >
      )
      }
    </Formik>
  )
}

export default FormEditData
