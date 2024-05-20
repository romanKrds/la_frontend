/** @jsxImportSource @emotion/react */
import {css} from "@emotion/react";
import {Button} from "@mui/material";
import React, {FormEvent, useState} from 'react';
import TextField from '@mui/material/TextField';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import {useNavigate} from "react-router-dom";
import {UserCreds} from "../../interfaces/userCreds.interface";
import {login} from "../../query/auth.query";
import {useError} from "../../context/errorContext";
import {setToLocalStorage} from "../../utils";


const Login = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [formError, setFormError] = useState<Partial<UserCreds>>({})
  const {showError} = useError();
  const navigate = useNavigate();

  const onSubmitForm = (e: FormEvent) => {
    e.preventDefault();

    const data =
    login({username, password})
      .then(({token}) => setToLocalStorage({token}))
      .then(() => navigate('/'))
      .catch(({error}) => {
        if (typeof error === 'string') {
          showError(error)

          return;
        }

        setFormError(error)
      })
  }

  return (
    <div css={loginPageCSS}>
      <Card>
        <CardContent>
          <form onSubmit={onSubmitForm} css={formCSS}>
            <legend css={legendCSS}>Login</legend>

            <div>
              <TextField
                variant="outlined"
                type="text"
                id="username"
                label="Username"
                fullWidth={true}
                css={fieldCSS}
                error={!!formError?.username}
                helperText={formError?.username}
                value={username}
                onChange={e => {
                  setFormError(err => ({...err, username: ''}))
                  setUsername(e.target.value)
                }}
              />

              <TextField
                variant="outlined"
                type="password"
                id="password"
                label="Password"
                fullWidth={true}
                css={fieldCSS}
                error={!!formError?.password}
                helperText={formError?.password}
                value={password}
                onChange={e => {
                  setFormError(err => ({...err, password: ''}))
                  setPassword(e.target.value)
                }}
              />
            </div>

            <Button type="submit" variant="contained">Submit</Button>
          </form>
        </CardContent>
      </Card>


    </div>
  )
}

export default Login;

const loginPageCSS = css({
  background: '#cccccc1a',
  height: '100vh',
  width: '100vw',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center'
})

const legendCSS = css({
  fontSize: '2rem'
})

const formCSS = css({
  width: '100%',
  maxWidth: '500px',
  height: '40vh',
  maxHeight: '324px',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
  alignItems: 'center'
})

const fieldCSS = css({
  width: '310px',
  margin: '0 0 24px',
  display:'block'
})
