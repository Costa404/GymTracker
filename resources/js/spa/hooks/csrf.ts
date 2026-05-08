// utils/csrf.ts
export const getCsrfToken = () =>
    decodeURIComponent(
        document.cookie
            .split("; ")
            .find((r) => r.startsWith("XSRF-TOKEN="))
            ?.split("=")[1] || "",
    );
