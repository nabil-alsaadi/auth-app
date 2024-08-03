import React, { useCallback, useEffect } from 'react';
import { Formik, Field, Form, ErrorMessage, FormikHelpers } from 'formik';
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { registerUser } from '../redux/actions/userActions';

import FormField from '../components/FormField';
import CustomButton from '../components/CustomButton';
import { useAuthState } from '../hocs/useAuthState';
import '../styles/SignUp.css'

interface SignUpFormValues {
  email: string;
  name: string;
  password: string;
  confirmPassword: string;
}

const SignupSchema = Yup.object().shape({
  email: Yup.string().email('Invalid email').required('Required'),
  name: Yup.string().required('Required'),
  password: Yup.string()
    .min(8, 'Too Short!')
    .matches(/[a-zA-Z]/, 'Password must contain at least one letter')
    .matches(/[0-9]/, 'Password must contain at least one number')
    .matches(/[!@#$%^&*]/, 'Password must contain at least one special character')
    .required('Required'),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password'), ''], 'Passwords must match')
    .required('Required'),
});

const SignUp = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { loading, error, success } = useAuthState();

  useEffect(() => {
    if (success) {
      navigate('/');
    }
  }, [success, navigate]);

  const handleSubmit = useCallback((values: SignUpFormValues, { setSubmitting }: FormikHelpers<SignUpFormValues>) => {
    dispatch(registerUser(values.email, values.name, values.password));
    setSubmitting(false);
  }, [dispatch]);
  
  return (
    <div className='page'>
      <div className='container-box'>
        <h1 className='header-box'>Sign Up</h1>
        <Formik
          initialValues={{ email: '', name: '', password: '', confirmPassword: '' }}
          validationSchema={SignupSchema}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting }) => (
            <Form className='form'>
              <FormField label="Email" name="email" type="email" placeholder="Enter email" />
              <FormField label="Name" name="name" type="text" placeholder="Enter name" />
              <FormField label="Password" name="password" type="password" placeholder="Enter password" />
              <FormField label="Confirm Password" name="confirmPassword" type="password" placeholder="Confirm password" />

              {error && <div className='error'>{error}</div>}

              <CustomButton
                type="submit"
                disabled={isSubmitting || loading}
                label={isSubmitting || loading ? 'Signing Up...' : 'Sign Up'}
              />
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default SignUp;