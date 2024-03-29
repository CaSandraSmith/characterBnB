import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Switch, Route } from "react-router-dom";
import * as sessionActions from "./store/session";
import Navigation from "./components/Navigation";
import GetAllSpots from "./components/GetAllSpots";
import GetOneSpot from "./components/GetOneSpot";
import AddSpotForm from "./components/AddSpotForm";
import ManageSpots from "./components/ManageSpotsPage";
import EditSpotForm from "./components/EditSpotForm";
import UserBookingsPage from "./components/UserBookingsPage"
import SingleBookingPage from "./components/SingleBookingPage";
import PageNotFound from "./components/PageNotFound";

function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    dispatch(sessionActions.restoreUser()).then(() => setIsLoaded(true));
  }, [dispatch]);

  return (
    <>
      <Navigation isLoaded={isLoaded} />
      {isLoaded &&
        <Switch>
          <Route path="/myBookings">
            <UserBookingsPage />
          </Route>
          <Route path="/trips/:id">
            <SingleBookingPage />
          </Route>
          <Route path="/spots/:id/edit">
            <EditSpotForm />
          </Route>
          <Route path="/spots/current">
            <ManageSpots />
          </Route>
          <Route path="/spots/new">
            <AddSpotForm />
          </Route>
          <Route path="/spots/:id">
            <GetOneSpot />
          </Route>
          <Route exact path="/">
            <GetAllSpots />
          </Route>
          <Route>
            <PageNotFound />
          </Route>
        </Switch>
      }
    </>
  );
}

export default App;
