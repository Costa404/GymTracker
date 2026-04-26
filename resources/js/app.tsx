import "../css/app.css";
import "./bootstrap";
import { createInertiaApp } from "@inertiajs/react";
import { resolvePageComponent } from "laravel-vite-plugin/inertia-helpers";
import { createRoot } from "react-dom/client";
import MainLayout from "@/Layouts/MainLayout";
import { route } from "ziggy-js";
import { router } from "@inertiajs/react";

const appName = import.meta.env.VITE_APP_NAME || "Laravel";

// Declaração para o TypeScript não reclamar da função global
declare global {
    interface Window {
        route: typeof route;
        terminateLoader: () => void;
    }
}

createInertiaApp({
    title: (title) => `${title} - ${appName}`,
    resolve: async (name) => {
        const pages = import.meta.glob("./Pages/**/*.{jsx,tsx}");
        const page = (await resolvePageComponent(
            `./Pages/${name}.tsx`,
            pages,
        )) as any;

        page.default.layout =
            page.default.layout ||
            ((page: any) => <MainLayout>{page}</MainLayout>);
        return page;
    },
    setup({ el, App, props }) {
        window.route = route;
        const root = createRoot(el);
        root.render(<App {...props} />);

        // O SEGREDO ESTÁ AQUI:
        // Assim que o React renderiza a primeira página (seja Dashboard ou PIN),
        // esperamos 100ms para garantir que o CSS/Imagens estão no sítio e matamos o loader.
        setTimeout(() => {
            if (window.terminateLoader) {
                window.terminateLoader();
            }
        }, 100);
    },
    progress: {
        color: "#2563eb",
    },
});
