import { StrictMode } from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import './fonts/huge.woff';
import "./styles.css";

import Mainpage from "./mainpage";
import Projects from "./projects"

const rootElement = document.getElementById("root");
ReactDOM.render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Mainpage />}/>
      <Route path="projects" element={<Projects />}/>
    </Routes>
  </BrowserRouter>,
  rootElement
);
