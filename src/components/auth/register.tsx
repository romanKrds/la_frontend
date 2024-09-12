/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { Button } from '@mui/material';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import TextField from '@mui/material/TextField';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import type { FormikHelpers } from 'formik';
import * as yup from 'yup';
import { useError } from '../../context/errorContext';
import { UserCreds } from '../../interfaces/userCreds.interface';
import { register } from '../../query/auth.query';

interface UserRegisterCreds extends UserCreds {
  passwordRepeat: string;
}

const validationSchema = yup.object({
  username: yup
    .string()
    .email('Enter a valid email')
    .required('Email is required'),
  password: yup
    .string()
    .min(6, '8 characters minimum')
    .required('Password is required'),
  passwordRepeat: yup
    .string()
    .required('Repeat password')
    .oneOf([yup.ref('password')], 'Passwords must match'),
});

const Register = () => {
  const {showError} = useError();
  const navigate = useNavigate();

  const onSubmitForm = ({username, password}: UserRegisterCreds, {setErrors}: FormikHelpers<any>) =>
    register({username, password})
      .then(() => navigate('/login'))
      .catch(({error}) => {
        if (typeof error === 'string') {
          showError(error)

          return;
        }

        setErrors(error);
      });


  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
      passwordRepeat: '',
    },
    validationSchema: validationSchema,
    onSubmit: onSubmitForm,
  });

  return (
    <div css={registerPageCSS}>
      <Card>
        <CardContent>
          <form onSubmit={formik.handleSubmit} css={formCSS}>
            <legend css={legendCSS}>Register</legend>

            <div>
              <TextField
                variant="outlined"
                type="text"
                id="username"
                label="Email"
                fullWidth={true}
                css={fieldCSS}
                value={formik.values.username}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.username && Boolean(formik.errors?.username)}
                helperText={formik.touched.username && formik.errors?.username}
              />

              <TextField
                variant="outlined"
                type="password"
                id="password"
                label="Password"
                fullWidth={true}
                css={fieldCSS}
                value={formik.values.password}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.password && Boolean(formik.errors?.password)}
                helperText={formik.touched.password && formik.errors?.password}
              />

              <TextField
                variant="outlined"
                type="password"
                id="passwordRepeat"
                label="Repeat password"
                fullWidth={true}
                css={fieldCSS}
                value={formik.values.passwordRepeat}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.passwordRepeat && Boolean(formik.errors?.passwordRepeat)}
                helperText={formik.touched.passwordRepeat && formik.errors?.passwordRepeat}
              />

            </div>

            <Button type="submit" variant="contained">Submit</Button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}

export default Register;


const registerPageCSS = css({
  background: '#cccccc1a',
  height: '100vh',
  width: '100vw',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center'
})

const legendCSS = css({
  fontSize: '2rem',
  marginBottom: '12px'
})

const formCSS = css({
  width: '100%',
  maxWidth: '500px',
  height: '40vh',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
  alignItems: 'center'
})

const fieldCSS = css({
  width: '310px',
  margin: '0 0 24px',
  display: 'block'
})
