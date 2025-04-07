import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { Provider } from "react-redux";
import { store } from "./redux/Store";
import ThemeProviders from "./components/ThemeProvider";
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>

    <React.StrictMode>
    <ThemeProviders>
      <App/>
    </ThemeProviders>
    </React.StrictMode>
  </Provider>
);

reportWebVitals();
