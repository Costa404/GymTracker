<?php

;
use Illuminate\Support\Facades\Route;

Route::get('/{any}', function () {

    try {
        return view('spa');
    } catch (\Exception $e) {
        return "Erro ao carregar a view: " . $e->getMessage();
    }
})->where('any', '.*');
