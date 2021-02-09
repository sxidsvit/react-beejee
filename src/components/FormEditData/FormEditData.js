import React, { useContext } from 'react'
import Form from 'react-bootstrap/Form'
import * as yup from 'yup'
import { Formik } from 'formik';
import Button from 'react-bootstrap/Button'
import OptionsList from '../OptionsList/OptionsList'
import { ApiContext } from '../../context/Api/ApiContext'
import { AlertContext } from '../../context/Alert/AlertContext'
import { editTaskSuccessText, editTaskErrorText } from '../../constants'
import { statusMessage } from '../../utils'


const FormEditData = ({ currentItem: { id, text, status }, setEditTask }) => {
  const { editTask, status: mainStatus } = useContext(ApiContext)
  const { show } = useContext(AlertContext)

  // Get admin' token from localStorage
  const token = localStorage.getItem('token')
  console.log('FormEditData - token: ', token)

  const onAddDataHandler = (values, isValidating, errors, touched) => {
    isValidating.validateForm()
    // Packaging form data into a formData object
    const formData = new FormData()
    formData.append("text", values.text)
    formData.append("status", Number(values.status))
    formData.append("token", token)

    // Sending data to the server DB
    editTask(formData, id)
    // Clearing form fields
    isValidating.resetForm()
    setEditTask(false)
    // Alert message
    setTimeout(() => {
      statusMessage(show, mainStatus, editTaskSuccessText, editTaskErrorText)
    }, 500);
  }

  const onCloseHandler = () => {
    // setMode('')
    // setOpenForm(false)
    setEditTask(false)
  }

  // Schema for validating form data
  const schema = yup.object().shape({
    text: yup.string().min(2, 'Minimum 2 characters').max(50, 'Maximum 50 characters').required('Required'),
    status: yup.string().oneOf(['0', '1', '10', '11'], 'Invalid Status').required('Status required')
  })
  // Initializing Form Fields
  const initialValues = {
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
          <h4 className="mb-2" style={{ color: 'red' }}>Edit task</h4>
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
              <Form.Control as="select" custom name="status"
                onChange={handleChange}
                onBlur={handleBlur}>
                <option className="text-danger" defaultValue="select status" value='null'>select status</option>
                <OptionsList />
              </Form.Control>
              <Form.Control.Feedback type="valid">Looks good!</Form.Control.Feedback>
              <Form.Control.Feedback type="invalid">{errors.text}</Form.Control.Feedback>
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
