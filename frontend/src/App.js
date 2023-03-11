import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Switch } from "react-router-dom";
import LoginFormPage from "./components/LoginFormPage";
import SignupFormPage from "./components/SignupFormPage";
import * as sessionActions from "./store/session";
import Navigation from "./components/Navigation";
import LoginModal from './components/Modal/LoginModal'
import SignupModal from './components/Modal/SignupModal'


function App() {

  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [showSignup, setShowSignup] = useState(false);

  useEffect(() => {
    dispatch(sessionActions.restoreUser()).then(() => setIsLoaded(true));
  }, [dispatch]);


  return (
    <>
      <Navigation isLoaded={isLoaded} setShowLogin={setShowLogin} setShowSignup={setShowSignup} />
      {isLoaded && (
        <Switch>
          {/* <div style={{ width: '100%', backgroundColor: 'blue' }}>hi</div> */}
        </Switch>
      )}

      <LoginModal onClose={() => setShowLogin(false)} show={showLogin}>
        <LoginFormPage setShowLogin={setShowLogin} />
      </LoginModal>

      <SignupModal onClose={() => setShowSignup(false)} show={showSignup}>
        <SignupFormPage setShowSignup={setShowSignup} />
      </SignupModal>

    </>
  );
}

export default App;
