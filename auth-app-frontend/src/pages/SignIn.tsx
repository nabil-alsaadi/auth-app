
import React, { useCallback, useEffect } from 'react';
import { Formik, Field, Form, ErrorMessage, FormikHelpers } from 'formik';
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser } from '../redux/actions/userActions';
import CustomButton from '../components/CustomButton';
import FormField from '../components/FormField';
import { useAuthState } from '../hocs/useAuthState';
import '../styles/SignIn.css'


interface SignInFormValues {
  email: string;
  password: string;
}
const SigninSchema = Yup.object().shape({
  email: Yup.string().email('Invalid email').required('Required'),
  password: Yup.string().required('Required'),
});

const SignIn: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { loading, error, success } = useAuthState();

  useEffect(() => {
    if (success) {
      navigate('/');
    }
  }, [success, navigate]);

  const handleSignUpClick = useCallback(() => {
    navigate('/signup');
  }, [navigate]);

  const handleSubmit = useCallback(
    (values: SignInFormValues, { setSubmitting, setStatus }: FormikHelpers<SignInFormValues>) => {
      dispatch(loginUser(values.email, values.password));
      setSubmitting(false);
      setStatus({ general: '' });
    },
    [dispatch]
  );

  return (
    <div className='page'>
      <div className='container-box'>
        <h1 className='header-box'>Sign In</h1>
        <Formik
          initialValues={{ email: '', password: '' }}
          validationSchema={SigninSchema}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting }) => (
            <Form className='form'>
              <FormField label="Email" name="email" type="email" placeholder="Enter email" />
              <FormField label="Password" name="password" type="password" placeholder="Enter password" />

              <div className='field-container'>
                <Field type="checkbox" name="remember" className='checkbox' />
                <label className='checkbox-label'>Remember me</label>
              </div>

              {error && <div className='error'>{error}</div>}

              <CustomButton type='submit' disabled={isSubmitting || loading}  label={isSubmitting || loading ? 'Signing In...' : 'Sign In'}  />

              <a href="#" className='forgot-password'>Forgot password?</a>

              <CustomButton label='Sign Up' onClick={handleSignUpClick} variant='outline'  />
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default SignIn;
