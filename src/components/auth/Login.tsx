/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { Button } from "@mui/material";
import { FormikHelpers, useFormik } from 'formik';
import React from 'react';
import TextField from '@mui/material/TextField';
import { useNavigate } from "react-router-dom";
import * as yup from 'yup';
import { UserCreds } from "../../interfaces/userCreds.interface";
import { login } from "../../query/auth.query";
import { useError } from "../../context/errorContext";
import { setToLocalStorage } from "../../utils";
import AuthPage from './AuthPage';


const validationSchema = yup.object({
  username: yup
    .string()
    .email('Enter a valid email')
    .required('Email is required'),
  password: yup
    .string()
    .min(6, '8 characters minimum')
    .required('Password is required'),
});

const Login = () => {
  const {showError} = useError();
  const navigate = useNavigate();

  const onSubmitForm = ({username, password}: UserCreds, {setErrors}: FormikHelpers<any>) =>
    login({username, password})
      .then(({token}) => setToLocalStorage({token}))
      .then(() => navigate('/'))
      .catch(({error}) => {
        if (typeof error === 'string') {
          showError(error)

          return;
        }

        setErrors(error);
      })

  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
    },
    validationSchema: validationSchema,
    onSubmit: onSubmitForm,
  });

  return (
    <AuthPage>
      <form onSubmit={formik.handleSubmit} css={formCSS}>
        <legend css={legendCSS}>Login</legend>

        <div>
          <TextField
            variant="outlined"
            type="text"
            id="username"
            label="Username"
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
        </div>

        <Button type="submit" variant="contained">Login</Button>
      </form>
    </AuthPage>
  )
}

export default Login;

const legendCSS = css({
  fontSize: '2rem'
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
