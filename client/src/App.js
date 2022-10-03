import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";
import React, { Component } from "react";
import "./App.css";
import Header from "./components/Header";
import Main from "./pages/public/Main";
import Register from "./pages/auth/Register";
import Login from "./pages/auth/Login";

class App extends Component {
  render() {
    return (
      <>
        <Router>
          <Header />
          <Routes>
            <Route path="/" element={<Main />} />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
          </Routes>
        </Router>
          
      </>
    )
  }
}

export default App;