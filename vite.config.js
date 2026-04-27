import path from "path";
import { defineConfig } from "vite";
import laravel from "laravel-vite-plugin";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import { VitePWA } from "vite-plugin-pwa";

export default defineConfig({
    base: "https://gymtracker799.fly.dev/",
    plugins: [
        laravel({
            input: "resources/js/app.tsx",
            refresh: true,
        }),
        react(),
        tailwindcss(),

        VitePWA({
            registerType: "autoUpdate",
            outDir: "public",
            manifestFilename: "manifest.json",
            manifest: {
                name: "GymTracker",
                short_name: "Gym",
                theme_color: "#000000",
                start_url: "/", // 1. Diz ao telemóvel onde a app começa
                display: "standalone", // 2. Obriga a esconder a barra do browser
                scope: "/", // 3. Diz que o modo offline abrange todo o site
                icons: [
                    // Podes colocar os ícones mais tarde
                ],
            },
            workbox: {
                globPatterns: ["**/*.{js,css,ico,png,svg,woff2}"],
                navigateFallback: "/offline.html",
            },
        }),
    ],
    resolve: {
        alias: {
            "@": path.resolve(__dirname, "resources/js"),
        },
    },
});
