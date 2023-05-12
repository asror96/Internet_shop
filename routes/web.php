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
Route::any('/Product', function () {
    return view('welcome');
});
Route::any('/basket', function () {
    return view('welcome');
});
Route::any('/orderList', function () {
    return view('welcome');
});
Route::any('/update/{id}', function () {
    return view('welcome');
});
Route::any('/Users', function () {
    return view('welcome');
});
Route::any('/search/{key}', function () {
    return view('welcome');
});
