import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Switch } from "react-router-dom";
import LoginFormPage from "./components/LoginFormPage";
import SignupFormPage from "./components/SignupFormPage";
import * as sessionActions from "./store/session";
import Navigation from "./components/Navigation";
import LoginModal from './components/Modal/LoginModal'
import SignupModal from './components/Modal/SignupModal'
import Home from "./components/Home";
import Footer from "./components/Footer";
import SpotDetails from "./components/SpotDetails";


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

      <LoginModal title="Log In" onClose={() => setShowLogin(false)} show={showLogin}>
        <LoginFormPage setShowLogin={setShowLogin} />
      </LoginModal>

      <SignupModal title="Sign Up" onClose={() => setShowSignup(false)} show={showSignup}>
        <SignupFormPage setShowSignup={setShowSignup} />
      </SignupModal>

    </>
  );
}

export default App;
