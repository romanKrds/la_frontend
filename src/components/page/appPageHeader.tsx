/** @jsxImportSource @emotion/react */
import {css} from "@emotion/react";
import React from 'react';
import {Link} from "react-router-dom";
import Grid from '@mui/material/Grid';
import {Avatar} from "@mui/material";

// TODO: replace with user avatar
import mainLogo from "../../logo.svg"

const AppPageHeader = () => {
  return <header css={headerCSS}>
    <Grid container justifyContent="space-between">
      <Grid item md={6}>
        <nav css={navCSS}>
          <Link to="/memorize">Memorize</Link>
          <Link to="/chat">Chat</Link>
          <Link to="/review">Review</Link>
        </nav>
      </Grid>
      <Grid item md={6} css={toolbarCSS}>
        <Avatar alt="user avatar" src={mainLogo} />
      </Grid>
    </Grid>
  </header>
}

export default AppPageHeader;

const headerCSS = css({
  padding: '0 24px'
})

const toolbarCSS = css({
  display: 'flex',
  justifyContent: 'flex-end'
})

const navCSS = css({
  display: 'flex',
  gap: '8px',
  alignItems: 'center',
  height: '100%',
})