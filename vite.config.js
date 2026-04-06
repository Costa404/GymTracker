import { defineConfig } from "vite";
import laravel from "laravel-vite-plugin";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import path from "path";

export default defineConfig({
    plugins: [
        laravel({
            input: "resources/js/app.tsx",
            refresh: true,
        }),
        react(),
        tailwindcss(),
    ],
    // server: {
    //     // 1. Permite que o Vite aceite pedidos de fora do  PC
    //     host: "0.0.0.0",
    //     // 2. Diz ao Hot Module Replacement (HMR) para usar o link do Ngrok
    //     hmr: {
    //         host: "unsegregable-scratchily-jeremiah.ngrok-free.dev",
    //     },
    //     // 3. Remove a barreira de segurança que causou o erro na imagem
    //     cors: {
    //         origin: "*",
    //     },
    // },
    resolve: {
        alias: {
            "@": path.resolve(__dirname, "resources/js"),
        },
    },
});
