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
//addDeviceBasket
Route::post('register',[UserController::class,'register']);
Route::post('login',[UserController::class,'login']);
Route::get('addTypeBrand',[ItemController::class,'addTypeBrand']);
Route::post('getItems',[ItemController::class,'getItems']);
Route::post('addItem',[ItemController::class,'addItem']);

Route::post('addItemBasked',[UserController::class,'addItemBasked']);
Route::get('getTypesBrands',[ItemController::class,'getTypesBrands']);
Route::post('addDeviceBasket',[UserController::class,'addDeviceBasket']);
Route::post('getBasketDevice',[ItemController::class,'getBasketDevice']);
Route::post('deleteInBasketOne',[ItemController::class,'deleteInBasketOne']);
Route::post('deleteInBasket',[ItemController::class,'deleteInBasket']);
Route::post('addOrder',[ItemController::class,'addOrder']);
Route::post('getOrders',[ItemController::class,'getOrders']);
Route::post('deleteOrder',[ItemController::class,'deleteOrder']);
Route::get('getAllOrders',[ItemController::class,'getAllOrders']);
Route::get('getAllDevices',[ItemController::class,'getAllDevices']);

Route::get('getDevice/{id}',[ItemController::class,'getDevice']);
Route::get('getAllUsers',[UserController::class,'getAllUsers']);

Route::get('search/{key}',[ItemController::class,'search']);

Route::post('updateDevice',[ItemController::class,'updateDevice']);

Route::delete('deleteUser/{id}',[UserController::class,'deleteUser']);
Route::delete('deleteDevices/{id}',[ItemController::class,'deleteDevices']);
//getAllOrders
