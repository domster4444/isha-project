//! Wrapper that provides data to all childrent wrapped by it.

import React, { useState } from "react";
import { Provider } from "./context";

const AuthProvider = ({ children }) => {
  const [trackingState, setTrackingState] = useState(null);

  const [loggedInUserData, setLoggedInUserData] = useState(null);

  // fetch data using rtk query & manupulate data state.
  // or use custom hook that utilizes services to fetch data & manupulate data state

  //   getting state data ready to pass

  const authStates = {
    loggedInUserData,
    setLoggedInUserData,
    trackingState,
    setTrackingState,
  };

  return <Provider value={authStates}>{children}</Provider>;
};
