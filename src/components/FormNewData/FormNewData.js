import React, { useState } from 'react'
import Form from 'react-bootstrap/Form'
import * as yup from 'yup'
import { Formik } from 'formik';
import Button from 'react-bootstrap/Button'
import { Col } from 'react-bootstrap'
// import { developer } from '../../constants'

const TableNewData = ({ data, setData }) => {

  const [openForm, setOpenForm] = useState(true)

  // Form's fields handlers 
  // const onOpenFormHandler = () => {
  //   setOpenForm(true)
  // }

  const onAddDataHandler = (values, isValidating, errors, touched) => {
    isValidating.validateForm()

    const newRecord = {
      username: values.username,
      email: values.email,
      status: values.status,
      text: values.text
    }
    console.log('newRecord: ', newRecord);

    setData([newRecord, ...data])
    // const page = selected + 1
    // const params = `sort_field=${sortField}&sort_direction=${sort}&page=${page}`
    // fetchData(params)

    setOpenForm(false)
    isValidating.resetForm()
  }

  const schema = yup.object({
    username: yup.string().min(2, 'Minimum 2 characters').max(60, 'Maximum 60 characters').required('Required'),
    email: yup.string().email('Invalid email').required('Required'),
    status: yup.string().required('Required'),
    text: yup.string().required('Required')
  })

  const initialValues = {
    username: '',
    email: '',
    status: '0',
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
              <h4 className="mb-5" style={{ color: 'red' }}  > Attension!!! All form fields must be completed</h4>
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
                  <Form.Label>text</Form.Label>
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


                <Form.Row>
                  <Form.Group as={Col} controlId="formGroupstatus">
                    <Form.Label>status</Form.Label>
                    <Form.Control type="text" name="status" value={values.status}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      isValid={touched.status && !errors.status}
                      isInvalid={touched.status && errors.status}
                      placeholder="Enter status"
                    />
                    <Form.Control.Feedback type="valid">Looks good!</Form.Control.Feedback>
                    <Form.Control.Feedback type="invalid">{errors.status}</Form.Control.Feedback>
                  </Form.Group>
                </Form.Row>

                <Form.Group className="text-center">
                  <Button type="submit"
                    className="btn btn-success mt-2 mb-5"
                    disabled={!dirty || !isValid || isSubmitting}
                  >
                    Add new record</Button>
                </Form.Group>
              </Form>
            </React.Fragment>
          }

        </div >

      )
      }
    </Formik >
  )
}

export default TableNewData
