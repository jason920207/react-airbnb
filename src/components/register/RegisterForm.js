import React from 'react'
import { Field, reduxForm } from 'redux-form'
import { renderField } from '../shared/form/Bwminput'
const RegisterForm = props => {
  const { handleSubmit, pristine, reset, submitting, submitCb, valid } = props
  return (
    <form onSubmit={handleSubmit(submitCb)}>
      <Field
        name="username"
        component="input"
        type="text"
        label="Username"
        className = 'form-control'
        component={renderField}
      />
      <Field
        name="email"
        component="input"
        type="email"
        label="Email"
        className = 'form-control'
        component={renderField}
      />
      <Field
        name="password"
        component="input"
        type="password"
        className = 'form-control'
        label="Password"
        component={renderField}
      />
      <Field
        name="passwordConfirmation"
        component="input"
        type="password"
        className = 'form-control'
        label="Password Confirmation"
        component={renderField}
      />
    <button className='btn btn-bwm btn-form'type="submit" disabled={!valid || pristine || submitting}>
        Submit
      </button>
    </form>
  )
}

const validate = values => {
  const errors = {}

  if (values.username && values.username.length < 4) {
    errors.username= 'User Name min length is 4 characters'
  }
  if (!values.email) {
    errors.email = 'Please enter a email'
  }

  if (!values.passwordConfirmation) {
    errors.passwordConfirmation = 'Please enter password Confirmation'
  }

  if (values.password !== values.passwordConfirmation) {
    errors.passwordConfirmation = 'Please enter password Confirmation'
  }

  return errors
}

export default reduxForm({
  form: 'registerForm',
  validate
})(RegisterForm)
