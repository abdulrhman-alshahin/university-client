import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import Home from "./containers/Home";
import News from "./containers/News";
import About from "./containers/About";

import GenerateTable from "./containers/GenerateTable";
import MyMarks from "./containers/MyMarks";
import Login from "./containers/Login";
import Profile from "./containers/Profile";

function App() {
  return (
    <>
      <Router>
        <Navbar />
        <>
          <Switch>
            <Route path="/news">
              <News />
            </Route>
            <Route path="/about">
              <About />
            </Route>
            <Route path="/generate-exam-table">
              <GenerateTable />
            </Route>
            <Route path="/my-marks">
              <MyMarks />
            </Route>
            <Route path="/login">
              <Login />
            </Route>

            <Route path="/me">
              <Profile />
            </Route>
            <Route path="/">
              <Home />
            </Route>
          </Switch>
        </>
      </Router>
    </>
  );
}

export default App;
