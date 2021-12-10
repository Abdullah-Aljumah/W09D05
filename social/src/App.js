import React from "react";
import { Routes } from "react-router";
import { Route } from "react-router";
import Home from "./components/Home";
import Login from "./components/Login";
import Register from "./components/Register";
import Desc from "./components/Desc";
import NewPost from "./components/NewPost";
import "./App.css"
function App() {
  return (
    <div className="App">
      <Routes>
        <Route exact path="/home" element={<Home />} />
        <Route exact path="/:id" element={<Desc />} />
        <Route exact path="/newPost" element={<NewPost />} />

        <Route exact path="/register" element={<Register />} />
        <Route exact path="/" element={<Login />} />
      </Routes>
    </div>
  );
}

export default App;
