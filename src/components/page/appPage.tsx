/** @jsxImportSource @emotion/react */
import {css} from "@emotion/react";
import React, {ReactNode, useState} from 'react';
import {BottomNavigation, BottomNavigationAction, Container} from "@mui/material";
import RestoreIcon from "@mui/icons-material/Restore";
import {Link} from "react-router-dom";
import ChatIcon from "@mui/icons-material/Chat";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import {BrowserView, MobileView} from 'react-device-detect';
import AppPageHeader from "./appPageHeader";

const AppPage = ({children}: { children: ReactNode }) => {
  const [bottomNavigationValue, setBottomNavigationValue] = useState(0);

  return <>
    <div css={pageCSS}>
      <BrowserView css={pageDesktopNavigationCSS}>
        <AppPageHeader/>
      </BrowserView>

      <Container maxWidth="sm" css={pageContentCSS}>
        {children}
      </Container>

      <MobileView css={pageMobileNavigationCSS}>
        <BottomNavigation
          showLabels
          value={bottomNavigationValue}
          onChange={(event, newValue) => {
            setBottomNavigationValue(newValue);
          }}
        >
          <BottomNavigationAction
            label="Memorize"
            icon={<RestoreIcon/>}
            component={Link}
            to="/memorize"
          />
          <BottomNavigationAction
            label="Chat"
            icon={<ChatIcon/>}
            component={Link}
            to="/chat"
          />
          <BottomNavigationAction
            label="Review"
            icon={<ErrorOutlineIcon/>}
            component={Link}
            to="/review"
          />
        </BottomNavigation>
      </MobileView>
    </div>
  </>
}

export default AppPage;

const pageCSS = css({
  height: '100vh',
  display: 'flex',
  flexDirection: 'column',
});
const pageDesktopNavigationCSS = css({
  display: 'block'
});
const pageContentCSS = css({
  flex: 1,
});
const pageMobileNavigationCSS = css({
  display: 'block'
});