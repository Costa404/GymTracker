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
    <meta name="apple-mobile-web-app-title" content="myGym">
    <link rel="apple-touch-icon" href="/icon.png">
    <link rel="manifest" href="/manifest.json">
    <style>
        /* 1. Reset Global para evitar o salto de tamanho quando o Tailwind carrega */
        *,
        *::before,
        *::after {
            box-sizing: border-box;
        }

        body.loading {
            overflow: hidden !important;
            height: 100vh !important;
            width: 100vw !important;
            margin: 0;
            position: fixed;
            /* Previne scroll no iOS */
        }

        #initial-loader {
            position: fixed;
            inset: 0;
            background: #000;
            display: grid;
            place-items: center;
            align-content: center;
            z-index: 9999;
            transition: opacity 0.5s ease-out, visibility 0.5s;
        }

        .loader-content {
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            min-width: 200px;
        }

        .spinner {
            /* 2. Tamanho fixo e imutável */
            width: 42px !important;
            height: 42px !important;
            border: 3px solid rgba(59, 130, 246, 0.1);
            border-top: 3px solid #3b82f6;
            border-radius: 50%;
            animation: spin 0.8s linear infinite;
            flex-shrink: 0;
        }

        .loader-text {
            margin-top: 28px;
            color: #3b82f6;
            font-family: ui-sans-serif, system-ui, -apple-system, sans-serif;
            font-size: 9px;
            font-weight: 900;
            text-transform: uppercase;
            letter-spacing: 0.8em;
            padding-left: 0.8em;
            /* Centro ótico perfeito */
            opacity: 0.8;
            animation: pulse 2s infinite;
            white-space: nowrap;
        }

        @keyframes spin {
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

        .loader-hidden {
            opacity: 0 !important;
            visibility: hidden !important;
        }
    </style>

    @routes
    @viteReactRefresh
    @vite(['resources/js/app.tsx'])
    @inertiaHead
</head>

<body class="font-sans antialiased bg-black loading">
    <div id="initial-loader">
        <div class="loader-content">
            <div class="spinner"></div>
            <div class="loader-text">Command Center</div>
        </div>
    </div>

    @inertia

    <script>
        // Função Global de Encerramento
        window.terminateLoader = function() {
            const loader = document.getElementById('initial-loader');
            if (loader && !loader.classList.contains('loader-hidden')) {
                loader.classList.add('loader-hidden');
                document.body.classList.remove('loading');
                setTimeout(() => {
                    if (loader && loader.parentNode) loader.remove();
                }, 500);
            }
        };

        // Fail-safe: Se algo correr mal, a app abre ao fim de 4s
        setTimeout(() => {
            window.terminateLoader();
        }, 4000);
    </script>

    @production
        <script>
            if ('serviceWorker' in navigator) {
                window.addEventListener('load', () => {
                    navigator.serviceWorker.register('/sw.js').then(reg => {
                        console.log('SW registado com sucesso:', reg);
                    }).catch(err => {
                        console.log('Erro ao registar SW:', err);
                    });
                });
            }
        </script>
    @endproduction
</body>

</html>
