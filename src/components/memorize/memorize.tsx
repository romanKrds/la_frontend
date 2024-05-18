/** @jsxImportSource @emotion/react */
import {css} from "@emotion/react";
import React, {useEffect} from "react";
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import {Link, Route, Routes, useLocation, useNavigate} from "react-router-dom";
import {useRouteMatch} from "../../hooks/useRouteMatch";
import MemorizeLearn from "./memorizeLearn";
import MemorizePractise from "./memorizePractise";
import AppPage from "../page/appPage";

const Memorize = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const routeMatch = useRouteMatch(['/memorize/learn', '/memorize/practise']);
  const currentTab = routeMatch?.pattern?.path;

  useEffect(() => {
    if (location.pathname === '/memorize') {
      navigate('learn', {replace: true})
    }
  }, [location, navigate]);

  return (
    <AppPage>
      <div css={wrapperCSS}>
        {
          currentTab &&
            <Tabs
                value={currentTab}
                aria-label="nav tabs example"
                role="navigation"
            >
                <Tab label="Learn" component={Link} value="/memorize/learn" to="learn"/>
                <Tab label="Practise" component={Link} value="/memorize/practise" to="practise"/>
            </Tabs>
        }

        <div css={contentCSS}>
          <Routes>
            <Route path="learn" element={<MemorizeLearn/>}></Route>
            <Route path="practise" element={<MemorizePractise/>}></Route>
          </Routes>
        </div>
      </div>
    </AppPage>
  )
}

export default Memorize

const wrapperCSS = css({
  height: '100%',
  display: 'flex',
  flexDirection: 'column'
})
const contentCSS = css({
  flex: 1
})
