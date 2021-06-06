import "./index.css";
import React from "react";
import App from "./App";
import ReactDom from "react-dom";

import { AppProvider } from "./context";

ReactDom.render(
  <AppProvider>
    <App />
  </AppProvider>,
  document.getElementById("root")
);
