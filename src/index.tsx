import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { Provider } from "react-redux";
import store from "./stores/store-toolkit";
import { useLayoutEffect } from "react";
import { Toaster } from "react-hot-toast";
const root = ReactDOM.createRoot(
    document.getElementById("root") as HTMLElement
);
root.render(
    <Provider store={store}>
        <App />
        <Toaster
            toastOptions={{
                className: "",
                style: {
                    border: "1px solid #713200",
                    padding: "16px 32px",
                    color: "#fff",
                    fontFamily: "Plus Jakarta Sans",
                    backgroundColor: "#fb8f2c",
                },
            }}
            position="top-right"
        />
    </Provider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
