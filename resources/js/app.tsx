import "../css/app.css";
import "./bootstrap";
import { createInertiaApp } from "@inertiajs/react";
import { resolvePageComponent } from "laravel-vite-plugin/inertia-helpers";
import { createRoot } from "react-dom/client";
import MainLayout from "@/Layouts/MainLayout";
import { route } from "ziggy-js"; // 1. Importa a função do Ziggy

const appName = import.meta.env.VITE_APP_NAME || "Laravel";

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
    },
    progress: {
        color: "#2563eb",
    },
});
