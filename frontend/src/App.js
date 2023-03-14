import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Switch } from "react-router-dom";

import * as sessionActions from "./store/session";
import Navigation from "./components/Navigation";


import Modal from './components/Modal/Modal'

import LoginFormPage from "./components/LoginFormPage";
import SignupFormPage from "./components/SignupFormPage";


import Home from "./components/Home";
import Footer from "./components/Footer";
import SpotDetails from "./components/SpotDetails";


function App() {

  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);

  const [show, setShow] = useState(false);
  const [currentModal, setCurrentModal] = useState('');

  useEffect(() => {
    dispatch(sessionActions.restoreUser()).then(() => setIsLoaded(true));
  }, [dispatch]);


  return (
    <>
      <Navigation isLoaded={isLoaded} setShow={setShow} setCurrentModal={setCurrentModal} />
      {isLoaded && (
        <Switch>

          <Route path="/" exact>
            <Home className="content" />
          </Route>

          <Route exact path="/spots/new">
            <div className="content" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', paddingBottom: '100px' }}>New Spot</div>
          </Route>

          <Route exact path="/spots/:spotId">
            <SpotDetails className="content" />
          </Route>

          <Route>
            <div className="content" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', paddingBottom: '100px' }}>
              Page Not Found
            </div>
          </Route>
        </Switch>
      )}
      <Footer />

      <Modal onClose={() => setShow(false)} show={show}>
        {currentModal === 'login' && (<LoginFormPage setShow={setShow} />)}
        {currentModal === 'signup' && (<SignupFormPage setShow={setShow} />)}
      </Modal>

      {/* <LoginModal title="Log In" onClose={() => setShowLogin(false)} show={showLogin}>
        <LoginFormPage setShowLogin={setShowLogin} />
      </LoginModal> */}

      {/* <SignupModal title="Sign Up" onClose={() => setShowSignup(false)} show={showSignup}>
        <SignupFormPage setShowSignup={setShowSignup} />
      </SignupModal> */}

    </>
  );
}

export default App;
