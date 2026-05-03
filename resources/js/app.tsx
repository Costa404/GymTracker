import "../css/app.css";
import "./bootstrap";
import React from "react";
import { createRoot } from "react-dom/client";
import App from "./spa/App";

const el = document.getElementById("app") || document.getElementById("root");
declare global {
    interface Window {
        terminateLoader?: () => void;
    }
}
if (el) {
    const root = createRoot(el);
    root.render(
        <React.StrictMode>
            <App />
        </React.StrictMode>,
    );

    // Mantém a tua lógica do loader
    setTimeout(() => {
        if (window.terminateLoader) {
            window.terminateLoader();
        }
    }, 100);
}
