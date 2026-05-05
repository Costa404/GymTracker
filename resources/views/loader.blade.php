<!DOCTYPE html>
<html lang="pt-PT">

<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1.0, user-scalable=no">
    <title>GymTracker V2</title>

    <style>
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
            border-top: 2px solid #3b82f6;
            border-radius: 50%;
            animation: spin 0.8s cubic-bezier(0.4, 0, 0.2, 1) infinite;
        }

        .loader-text {
            margin-top: 24px;
            color: #3b82f6;
            font-family: sans-serif;
            font-size: 8px;
            font-weight: 900;
            text-transform: uppercase;
            letter-spacing: 0.6em;
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

        .loader-hidden {
            opacity: 0;
            visibility: hidden;
        }
    </style>

    @viteReactRefresh
    @vite(['resources/css/app.css', 'resources/js/spa/index.tsx'])
</head>

<body class="bg-black text-white h-screen w-screen overflow-hidden antialiased">

    <div id="initial-loader">
        <div class="spinner"></div>
        <div class="loader-text">Command Center</div>
    </div>

    <div id="app" class="h-full w-full"></div>

    <script>
        // Fail-safe: esconde o loader após 4s se algo correr mal
        setTimeout(() => {
            const loader = document.getElementById('initial-loader');
            if (loader) {
                loader.classList.add('loader-hidden');
                setTimeout(() => loader.remove(), 500);
            }
        }, 4000);
    </script>

</body>

</html> 
