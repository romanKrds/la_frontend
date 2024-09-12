/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import React, { ReactNode } from 'react';

const AuthPage = ({children}: { children: ReactNode }) => {
  return (
    <div css={authPageCSS}>
      <Card>
        <CardContent>
          {children}
        </CardContent>
      </Card>
    </div>
  )
}

export default AuthPage;

const authPageCSS = css({
  background: '#cccccc1a',
  height: '100vh',
  width: '100vw',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center'
})
