<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">

<head>
    <meta charset="utf-8">
    <meta name="viewport"
        content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=0, viewport-fit=cover">
    <meta name="csrf-token" content="{{ csrf_token() }}">

    <title inertia>{{ config('app.name', 'Laravel') }}</title>

    <meta name="apple-mobile-web-app-capable" content="yes">
    <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent">
    <meta name="apple-mobile-web-app-title" content="Cybrex Gym">
    <link rel="apple-touch-icon" href="/icon.png">

    <style>
        /* Loader Styles - CSS Puro para ser instantâneo */
        #initial-loader {
            position: fixed;
            inset: 0;
            background: #000;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            z-index: 9999;
            transition: opacity 0.4s ease-out, visibility 0.4s;
        }

        .spinner {
            width: 40px;

            height: 40px;

            border: 2px solid rgba(59, 130, 246, 0.2);
            border-top: 2px solid text-performance;
            border-radius: 50%;
            animation: spin 0.8s cubic-bezier(0.4, 0, 0.2, 1) infinite;
        }

        .loader-text {
            margin-top: 24px;
            color: text-performance;
            /* Blue-500 */
            font-family: sans-serif;
            font-size: 8px;
            /* Mais pequeno como no novo PinLogin */
            font-weight: 900;
            text-transform: uppercase;
            letter-spacing: 0.6em;
            /* Mais espaçado para o look técnico */
            opacity: 0.8;
            animation: pulse 3s infinite;
        }

        @keyframes spin {
            from {
                transform: rotate(0deg);
            }

            to {
                transform: rotate(360deg);
            }
        }

        @keyframes pulse {

            0%,
            100% {
                opacity: 1;
            }

            50% {
                opacity: 0.4;
            }
        }

        /* Classe para esconder o loader */
        .loader-hidden {
            opacity: 0;
            visibility: hidden;
        }
    </style>

    @routes
    @viteReactRefresh
    @vite(['resources/js/app.tsx'])
    @inertiaHead
</head>

<body class="font-sans antialiased bg-black">
    <div id="initial-loader">
        <div class="spinner"></div>
        <div class="loader-text">Command Center</div>
    </div>

    @inertia

    <script>
        // Esconde o loader assim que o Inertia carregar a primeira página
        document.addEventListener('inertia:finish', function() {
            const loader = document.getElementById('initial-loader');
            if (loader) {
                loader.classList.add('loader-hidden');
                setTimeout(() => loader.remove(), 500);
            }
        });

        // Para o carregamento inicial
        window.addEventListener('load', function() {
            const loader = document.getElementById('initial-loader');
            if (loader) {
                loader.classList.add('loader-hidden');
                setTimeout(() => loader.remove(), 500);
            }
        });
    </script>
</body>

</html>
