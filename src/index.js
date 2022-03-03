import { StrictMode } from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import './fonts/huge.woff';
import "./styles.css";

import Mainpage from "./mainpage";
import Projects from "./projects"
import Site1 from "./site1"
import Site2 from "./site2"
import Site3 from "./site3"
import Site4 from "./site4"


const rootElement = document.getElementById("root");
ReactDOM.render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Mainpage />}/>
      <Route path="projects" element={<Projects />}/>
      <Route path="site1" element={<Site1 />}/>
      <Route path="site2" element={<Site2 />}/>
      <Route path="site3" element={<Site3 />}/>
      <Route path="site4" element={<Site4 />}/>
    </Routes>
  </BrowserRouter>,
  rootElement
);
