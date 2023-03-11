import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Switch } from "react-router-dom";
import LoginFormPage from "./components/LoginFormPage";
import SignupFormPage from "./components/SignupFormPage";
import * as sessionActions from "./store/session";
import Navigation from "./components/Navigation";
import Modal from "./components/Modal/Modal";


function App() {

  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  const [show, setShow] = useState(false);

  useEffect(() => {
    dispatch(sessionActions.restoreUser()).then(() => setIsLoaded(true));
  }, [dispatch]);


  return (
    <>
      <Navigation isLoaded={isLoaded} setShow={setShow} />
      {isLoaded && (
        <Switch>
          <Route path="/login">
            <LoginFormPage />
          </Route>
          <Route path="/signup">
            <SignupFormPage />
          </Route>
        </Switch>
      )}

      <Modal title="My Modal" onClose={() => setShow(false)} show={show}>
        <LoginFormPage setShow={setShow} />
      </Modal>
    </>
  );
}

export default App;
