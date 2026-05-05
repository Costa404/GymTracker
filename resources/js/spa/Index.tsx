import { createRoot } from "react-dom/client";
import App from "./App";

const container = document.getElementById("app");
if (container) {
    createRoot(container).render(<App />);

    // Esconde o loader assim que o React montar
    const loader = document.getElementById("initial-loader");
    if (loader) {
        loader.classList.add("loader-hidden");
        setTimeout(() => loader.remove(), 500);
    }
}
