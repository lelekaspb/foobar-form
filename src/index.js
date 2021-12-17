import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./style.scss";
import Landing from "./components/Landing";
import Main from "./components/Main";
import Confirmation from "./components/Confirmation";
import reportWebVitals from "./reportWebVitals";
import Mobilepay from "./components/Mobilepay";
import Creditcard from "./components/Creditcard";

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/beers" element={<Main />} />
        <Route path="/creditcard" element={<Creditcard />} />
        <Route path="/mobilepay" element={<Mobilepay />} />
        <Route path="/confirmation" element={<Confirmation />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById("root")
);

reportWebVitals();
