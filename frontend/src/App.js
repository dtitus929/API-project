import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Switch } from "react-router-dom";
import * as sessionActions from "./store/session";
import Navigation from "./components/Navigation";
import Home from "./components/Home";
import ManageSpots from "./components/ManageSpots";
import Footer from "./components/Footer";
import SpotDetails from "./components/SpotDetails";
import Modal from './components/Modal/Modal'
import LoginFormPage from "./components/LoginFormPage";
import SignupFormPage from "./components/SignupFormPage";
import AddReview from "./components/AddReview";
import DeleteReview from "./components/DeleteReview/";


function App() {

  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);

  const [show, setShow] = useState(false);
  const [currentModal, setCurrentModal] = useState('');
  const [currentSpot, setCurrentSpot] = useState('');
  const [currentReview, setCurrentReview] = useState('');

  useEffect(() => {
    dispatch(sessionActions.restoreUser()).then(() => setIsLoaded(true));
  }, [dispatch]);


  return (
    <>

      <Navigation isLoaded={isLoaded} setShow={setShow} setCurrentModal={setCurrentModal} />
      {isLoaded && (
        <Switch>

          <Route path="/" exact>
            <Home />
          </Route>

          <Route path="/spots/current" exact>
            <ManageSpots />
          </Route>

          <Route exact path="/spots/new">
            <div className="issue-box">New Spot</div>
          </Route>

          <Route exact path="/spots/:spotId">
            <SpotDetails setShow={setShow} setCurrentModal={setCurrentModal} setCurrentSpot={setCurrentSpot} setCurrentReview={setCurrentReview} />
          </Route>

          <Route>
            <div className="issue-box">Page Not Found</div>
          </Route>
        </Switch>
      )}
      <Footer />

      <Modal onClose={() => setShow(false)} show={show}>
        {currentModal === 'login' && (<LoginFormPage setShow={setShow} />)}
        {currentModal === 'signup' && (<SignupFormPage setShow={setShow} />)}
        {currentModal === 'addreview' && (<AddReview setShow={setShow} currentSpot={currentSpot} />)}
        {currentModal === 'deletereview' && (<DeleteReview setShow={setShow} currentReview={currentReview} currentSpot={currentSpot} />)}
      </Modal>

    </>
  );
}

export default App;
