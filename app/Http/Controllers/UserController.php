<?php

namespace App\Http\Controllers;
use App\Models\Basket_device;
use App\Models\Basket;

use App\Models\Device;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use function MongoDB\BSON\toJSON;
use function PHPUnit\Framework\isJson;


class UserController extends Controller
{
    function deleteUser($id){
        return User::where('id',$id)->delete();
    }
    function getAllUsers(){
        return User::where('role',false)->get();
    }
    function  addDeviceBasket(Request $request){

        $basked_device=new Basket_device();
        $id_user=User::where('email',$request->input('email'))->get('id');

        $basked_device->device_id=$request->id;
        $basked_device->basket_id=(Basket::where('user_id',$id_user[0]->id)->get('id'))[0]->id;
        $basked_device->save();
        return $basked_device;

    }

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
        $basket_id=(Basket::where('user_id',$user->id)->get())[0]->id;

        $count=Basket_device::where('basket_id',$basket_id)->count();

        //return $user;
        return response() -> json([
            "user"=>$user,
            "count"=>$count
        ],200);
    }
}
