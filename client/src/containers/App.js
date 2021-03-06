import React from 'react';
import {Provider} from "react-redux";
import {configureStore} from "../store";
import { BrowserRouter as Router} from "react-router-dom";
import Navbar from "./Navbar";
import Main from "./Main";
import { setAuthorizationToken, setCurrentUser } from '../store/actions/auth';
import jwtDecode from "jwt-decode";

const store = configureStore();

//Rehydrate User
if(localStorage.jwtToken){
  setAuthorizationToken(localStorage.jwtToken);
  //Prevent malicious changing of JWT in local storage
  try {
    store.dispatch(setCurrentUser(jwtDecode(localStorage.jwtToken)));
  } catch(e) {
    store.dispatch(setCurrentUser({}));
  }
}

const App = () => (
  <Provider store={store}>
    <Router>
      <div>
        <Navbar/>
        <Main />
      </div>
    </Router>
  </Provider>
)

export default App;
