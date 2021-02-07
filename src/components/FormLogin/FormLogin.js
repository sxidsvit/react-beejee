import React, { useState } from 'react'
import Form from 'react-bootstrap/Form'
import * as yup from 'yup'
import { Formik } from 'formik';
import Button from 'react-bootstrap/Button'
import { Col } from 'react-bootstrap'
import useFetch from '../../useFetch'
import { admin, password } from '../../constants'

const FormLogin = ({ setMode }) => {

  const [openForm, setOpenForm] = useState(true)
  const { loginAsAdmin } = useFetch()

  const onAddDataHandler = (values, isValidating, errors, touched) => {
    isValidating.validateForm()
    // Packaging form data into a formData object
    const formData = new FormData()
    formData.append("username", values.username)
    formData.append("password", values.password)
    // Sending data to the server DB
    loginAsAdmin(formData)
    setMode('')
    setOpenForm(false)
    // Clearing form fields
    isValidating.resetForm()
  }

  const onCloseHandler = () => {
    setMode('')
    setOpenForm(false)
  }

  // Schema for validating form data
  const schema = yup.object({
    username: yup.string().min(4, 'Minimum 4 characters').max(10, 'Maximum 10 characters').required('Required').test(val => val === `${admin}`),
    password: yup.string().min(3, 'Minimum 3 characters').max(8, 'Maximum 8 characters').required('Required').test(val => val === `${password}`),
  })
  // Initializing Form Fields
  const initialValues = {
    username: '',
    password: '',
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
              <h4 className="mb-5" style={{ color: 'red' }}  > Login as ADMIN</h4>
              <Form noValidate onSubmit={onAddDataHandler}>
                <Form.Row>
                  <Form.Group as={Col} controlId="formGroupusername">
                    <Form.Label>User name</Form.Label>
                    <Form.Control type="text" name="username" value={values.username}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      isValid={touched.username && !errors.username}
                      isInvalid={touched.username && errors.username}
                      placeholder="Enter user name"
                    />
                    <Form.Control.Feedback type="valid">Looks good!</Form.Control.Feedback>
                    <Form.Control.Feedback type="invalid">{errors.username}</Form.Control.Feedback>
                  </Form.Group>
                  <Form.Group as={Col} controlId="formGroupEmail">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" name="password" value={values.password}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      isValid={touched.password && !errors.password}
                      isInvalid={touched.password && errors.password}
                      placeholder="Enter password"
                    />
                    <Form.Control.Feedback type="valid">Looks good!</Form.Control.Feedback>
                    <Form.Control.Feedback type="invalid">{errors.password}</Form.Control.Feedback>
                  </Form.Group>

                </Form.Row>

                <Form.Group className="text-center">
                  <Button type="submit"
                    className="btn btn-success mt-2 mb-5"
                    disabled={!dirty || !isValid || isSubmitting}
                  >
                    Login</Button>
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

export default FormLogin