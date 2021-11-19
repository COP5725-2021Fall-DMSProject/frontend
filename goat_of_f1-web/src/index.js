import React from 'react';
import ReactDOM from 'react-dom';
import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";
import './index.css';
import Homepage from './pages/homepage';
import C1Page from './pages/c1page';
import C2Page from './pages/c2page';
import C3Page from './pages/c3page';
import Driver from './pages/driver';
import reportWebVitals from './reportWebVitals';


ReactDOM.render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Homepage/>} />
      <Route path="/driver" element={<Driver/>} />
      <Route path="/c1page-next-hamilton" element={<C1Page/>} />
      <Route path="/c2page-investable-constructor" element={<C2Page/>} />
      <Route path="/c3page-lapwise-positions" element={<C3Page/>} />
    </Routes>
  </BrowserRouter>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
