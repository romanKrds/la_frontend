import React, {useEffect} from 'react';
import './App.css';
import {BottomNavigation, BottomNavigationAction, Container} from "@mui/material";
import RestoreIcon from '@mui/icons-material/Restore';
import ChatIcon from '@mui/icons-material/Chat';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import Memorize from "./components/memorize/memorize"
import Chat from "./components/chat/chat"
import Review from "./components/review/review"

import {Link, Route, Routes, useLocation, useNavigate} from 'react-router-dom';

const App = () => {
  const [value, setValue] = React.useState(0);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (location.pathname === '/') {
      navigate('/memorize', {replace: true})
    }
  }, [location, navigate]);

  return (
    <Container maxWidth="sm">
      <div className="page">
        <div className="page__content">
          <Routes>
            <Route path="memorize/*" element={<Memorize/>}></Route>
            <Route path="chat" element={<Chat/>}></Route>
            <Route path="review" element={<Review/>}></Route>
          </Routes>
        </div>

        <div className="page__navigation">
          <BottomNavigation
            showLabels
            value={value}
            onChange={(event, newValue) => {
              setValue(newValue);
            }}
          >
            <BottomNavigationAction
              label="Memorize"
              icon={<RestoreIcon/>}
              component={Link}
              to="memorize"
            />
            <BottomNavigationAction
              label="Chat"
              icon={<ChatIcon/>}
              component={Link}
              to="chat"
            />
            <BottomNavigationAction
              label="Review"
              icon={<ErrorOutlineIcon/>}
              component={Link}
              to="review"
            />
          </BottomNavigation>
        </div>
      </div>
    </Container>
  )
}

export default App;
