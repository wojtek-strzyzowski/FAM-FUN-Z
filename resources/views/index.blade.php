<!DOCTYPE html>
<html lang="de">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <meta name="csrf-token" content="{{ csrf_token() }}">
    <title>FAM FUN Z</title>

    @vite(['resources/js/app.js'])
    <!-- <script src="https://maps.googleapis.com/maps/api/js?key={{ config('services.google_maps.api_key') }}" loading defer></script></head> -->
<body>
    <div id="app"></div>
</body>
</html>