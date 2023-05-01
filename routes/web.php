<?php

use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::any('/', function () {
    return view('welcome');
});
Route::any('/login', function () {
    return view('welcome');
});
Route::any('/register', function () {
    return view('welcome');
});
Route::any('/videoCard', function () {
    return view('welcome');
});
Route::any('/monitor', function () {
    return view('welcome');
});
Route::any('/processor', function () {
    return view('welcome');
});
Route::any('/motherboard', function () {
    return view('welcome');
});
Route::any('/addProduct', function () {
    return view('welcome');
});

