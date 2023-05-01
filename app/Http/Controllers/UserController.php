<?php

namespace App\Http\Controllers;
use App\Models\Basket_device;
use App\Models\Basket;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;

class UserController extends Controller
{
    //
    function addItemBasked(Request $request){
        $basked_id=Basket::where('user_id',$request->input('user_id'))->get('id');
        $basket=Basket_device::created(['device_id'=>$request->input('device_id')],['basked_id'=>$basked_id]);
        return $basket;
    }
    function register(Request $req){
        $user=new User;
        $user->name=$req->input('name');
        $user->email=$req->input('email');
        $user->password=Hash::make($req->input('password'));
        $user->role=false;

        $user->save();
        $basket=new Basket;
        $basket->user_id=$user->id;
        $basket->save();
        return $user;
    }

    function login(Request $req){
        $user=User::where('email',$req->email)->first();
        if(!$user||!Hash::check($req->password,$user->password)){
            return response() -> json([
                "Error email or password can`t found!"
            ],401);
        }
        return $user;
    }
}
