import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import registerServiceWorker from "./registerServiceWorker";
import { BrowserRouter } from 'react-router-dom';
import "bootstrap/dist/css/bootstrap.min.css";
import "jquery/dist/jquery.js";
import "bootstrap/dist/js/bootstrap.min.js";


ReactDOM.render(<BrowserRouter><App /></BrowserRouter>, document.getElementById("root"));

registerServiceWorker();