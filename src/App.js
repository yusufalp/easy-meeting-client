import React from "react";
import { Routes, Route } from "react-router-dom";

import Header from "./components/Header";
import Home from "./components/Home";
import Login from "./components/Login";
import Signup from "./components/Signup";
import CreateEvent from "./components/CreateEvent";
import JoinEvent from "./components/JoinEvent";
import Dashboard from "./components/Dashboard";
import Event from "./components/Event";

import { PATHNAMES } from "./constants";

function App() {
  return (
    <div className="App">
      <Header />

      <Routes>
        <Route exact path={PATHNAMES.HOME} element={<Home />} />
        <Route path={PATHNAMES.LOGIN} element={<Login />} />
        <Route path={PATHNAMES.SIGNUP} element={<Signup />} />
        <Route path={PATHNAMES.CREATE} element={<CreateEvent />} />
        <Route path={PATHNAMES.JOIN} element={<JoinEvent />} />
        <Route path={PATHNAMES.DASHBOARD} element={<Dashboard />} />
        <Route
          path={`${PATHNAMES.DASHBOARD}/:userId/events/:eventId`}
          element={<Event />}
        />
      </Routes>
    </div>
  );
}

export default App;
