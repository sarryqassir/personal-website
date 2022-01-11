import React from "react";
import { HashRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import Navbar from "./components/Navbar";
import Home from "./components/pages/Home";
// import Products from "./components/pages/Products";
import TodoListApp from "./components/TodoListApp";

function App() {
  return (
    <HashRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/todolist" element={<TodoListApp />} />
      </Routes>
    </HashRouter>
  );
}

export default App;
