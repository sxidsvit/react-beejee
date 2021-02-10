import React, { useState, useContext } from 'react'
import Form from 'react-bootstrap/Form'
import * as yup from 'yup'
import { Formik } from 'formik';
import Button from 'react-bootstrap/Button'
import { Col } from 'react-bootstrap'
import { ApiContext } from '../../context/Api/ApiContext'
import { AlertContext } from '../../context/Alert/AlertContext'
import { newTaskSuccessText, newTaskErrorText } from '../../constants'
import { statusMessage } from '../../utils'

const TableNewData = ({ setMode }) => {

  const [openForm, setOpenForm] = useState(true)
  const { createData } = useContext(ApiContext)
  const { show } = useContext(AlertContext)

  const onAddDataHandler = (values, isValidating, errors, touched) => {
    isValidating.validateForm()
    // Packaging form data into a formData object
    const formData = new FormData()
    formData.append("username", values.username)
    formData.append("email", values.email)
    formData.append("text", values.text)
    // Sending data to the server DB & send alert message
    Promise.resolve(createData(formData))
      .then(status => {
        statusMessage(show, status, newTaskSuccessText, newTaskErrorText)
      })
    //  Hide the form
    setMode('')
    // Clearing form fields
    isValidating.resetForm()
  }

  const onCloseHandler = () => {
    setMode('')
    setOpenForm(false)
  }

  // Schema for validating form data
  const schema = yup.object({
    username: yup.string().min(2, 'Minimum 2 characters').max(60, 'Maximum 60 characters').required('Required'),
    email: yup.string().email('Invalid email').required('Required'),
    text: yup.string().required('Required'),
  })
  // Initializing Form Fields
  const initialValues = {
    username: '',
    email: '',
    text: ''
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
          {
            openForm &&
            <React.Fragment>
              <h4 className="mb-2" style={{ color: 'red' }}  >Create new Task</h4>
              <Form noValidate onSubmit={onAddDataHandler}>
                <Form.Row>
                  <Form.Group as={Col} controlId="formGroupusername">
                    <Form.Label>User name</Form.Label>
                    <Form.Control type="text" name="username" value={values.username}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      isValid={touched.username && !errors.username}
                      isInvalid={touched.username && errors.username}
                      placeholder="Enter first name"
                    />
                    <Form.Control.Feedback type="valid">Looks good!</Form.Control.Feedback>
                    <Form.Control.Feedback type="invalid">{errors.username}</Form.Control.Feedback>
                  </Form.Group>
                  <Form.Group as={Col} controlId="formGroupEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control type="email" name="email" value={values.email}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      isValid={touched.email && !errors.email}
                      isInvalid={touched.email && errors.email}
                      placeholder="Enter correct email"
                    />
                    <Form.Control.Feedback type="valid">Looks good!</Form.Control.Feedback>
                    <Form.Control.Feedback type="invalid">{errors.email}</Form.Control.Feedback>
                  </Form.Group>

                </Form.Row>

                <Form.Group controlId="formGrouptext">
                  <Form.Label>Text</Form.Label>
                  <Form.Control as="textarea" rows={3}
                    name="text" value={values.text}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    isValid={touched.text && !errors.text}
                    isInvalid={touched.text && errors.text}
                    placeholder="Enter your text"
                  />
                  <Form.Control.Feedback type="valid">Looks good!</Form.Control.Feedback>
                  <Form.Control.Feedback type="invalid">{errors.text}</Form.Control.Feedback>
                </Form.Group>

                <Form.Group className="text-center">
                  <Button type="submit"
                    className="btn btn-success mt-2 mb-5"
                    disabled={!dirty || !isValid || isSubmitting}
                  >
                    Add new task</Button>
                  <Button
                    className="btn btn-danger ml-5 mt-2 mb-5"
                    onClick={onCloseHandler}
                  >
                    Close form</Button>
                </Form.Group>
              </Form>
            </React.Fragment>
          }
        </div>
      )}
    </Formik>
  )
}

export default TableNewData
