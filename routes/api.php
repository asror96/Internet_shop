<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\UserController;

use App\Http\Controllers\ItemController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

Route::post('register',[UserController::class,'register']);
Route::post('login',[UserController::class,'login']);
Route::get('addTypeBrand',[ItemController::class,'addTypeBrand']);
Route::post('getItems',[ItemController::class,'getItems']);
Route::post('addItem',[ItemController::class,'addItem']);
Route::get('hello',[ItemController::class,'hello']);
Route::post('addItemBasked',[UserController::class,'addItemBasked']);
Route::get('getTypesBrands',[ItemController::class,'getTypesBrands']);
