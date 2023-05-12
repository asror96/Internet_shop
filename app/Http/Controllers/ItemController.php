<?php

namespace App\Http\Controllers;

use App\Models\Basket;
use App\Models\Basket_device;
use App\Models\Order;
use App\Models\User;

use Illuminate\Http\Request;
use App\Models\Type;
use App\Models\Brand;
use App\Models\Device;

class ItemController extends Controller
{
    function search($key){
        return Device::where('name','LIKE',"%$key%")->get();
    }
    function updateDevice(Request $req){
        $device='';
        $device_photo='';
        if($req->hasFile('file')){
            Device::where('id',$req->get('id'))->update(['name'=>$req->get('name')]);
            Device::where('id',$req->get('id'))->update(['price'=>$req->get('price')]);

            $device_photo=$req->file('file')->store('public');
            $device=ltrim($device_photo,'public/');

            Device::where('id',$req->get('id'))->update(['image_path'=>$device]);
            Device::where('id',$req->get('id'))->update(['type_id'=>Type::where( 'name',$req->input('typeName'))->value('id')]);
            Device::where('id',$req->get('id'))->update(['brand_id'=>Brand::where( 'name',$req->get('brandName'))->value('id')]);
            Device::where('id',$req->get('id'))->update(['description'=>$req->get('description')]);


            return response()->json(["message"=>  (Device::where('id',$req->get('id'))->get())[0]]);
        }
        else{
            return response()->json(["message"=>"Empty file"]);
        }
    }
    function deleteDevices($id){
        $result=Device::where('id',$id)->delete();
        if($result){
            return response()->json(["result"=>"product has been delete"]);
        }
        else{
            return response()->json(["result"=>"Operation failed"]);
        }
    }
    function getDevice($id){
        return Device::find($id);
    }
    function getAllDevices(){
        return Device::all();
    }
    function getAllOrders(){
        $orders=Order::all();
        $index=0;

        foreach ($orders as $item){
            $orders[$index]->user_info=(User::where('id',$orders[$index]->user_id)->get())[0];
            $orders[$index]->device_info=(Device::where('id',$orders[$index]->device_id)->get())[0];
            $index++;
        }
     return $orders;
    }
    function deleteOrder(Request $request){
        Order::where('id',$request->id)->delete();
        return response()->json('Removed order!');
    }
    function getOrders(Request $request){
        $user_id=(User::where('email',$request->email)->get())[0]->id;
        $orders= Order::where('user_id',$user_id)->get();
        $index=0;

        foreach ($orders as $item){
            $orders[$index]->device_info=(Device::where('id',$orders[$index]->device_id)->get())[0];
            $index++;
        }
        return response()->json($orders);
    }

    function addOrder(Request $request){

            $user_id=(User::where('email',$request->email)->get('id'))[0]->id;
            $devices=$request->devices;
            $basket_id=(Basket::where('user_id',$user_id)->get())[0]->id;
            $basket_device=Basket_device::where('basket_id',$basket_id)->select('device_id')->distinct()->get();
            $k=0;
            $device_array=[];

            foreach ($basket_device as $item) {

                $device_array[$k]=(Device::where('id', $item->device_id)->get())[0];
                $device_array[$k]->count=Basket_device::where('device_id', $item->device_id)->count();
                Basket_device::where('device_id', $item->device_id)->delete();
                $k++;
            }

            foreach ($device_array as $item){
                $order=new Order();
                $order->user_id=$user_id;
                $order->device_id=$item->id;
                $order->count=$item->count;
                $order->telephone=$request->telephone;
                $order->address=$request->address;
                $order->save();
             }

        return response()->json("Device is buy!");
    }
//    function deleteInBasket(Request $request){
//        $user_id=(User::where('email',$request->get('email'))->get('id'))[0]->id;
//        $basket_id=(Basket::where('user_id',$user_id)->get())[0]->id;
//        Basket_device::where('basket_id',$basket_id)->where('device_id',$request->id)->delete();
//        $count=Basket_device::where('basket_id', $basket_id)->count();
//        return response()->json($count);
//    }
    function deleteInBasketOne(Request $request){
        $user_id=(User::where('email',$request->get('email'))->get('id'))[0]->id;
        $basket_id=(Basket::where('user_id',$user_id)->get())[0]->id;
        Basket_device::where('basket_id',$basket_id)->where('device_id',$request->id)->first()->delete();
        $count=Basket_device::where('basket_id', $basket_id)->count();
        return response()->json("$count");
    }
    function getBasketDevice(Request $request){
        $user_id=(User::where('email',$request->input('email'))->get())[0]->id;
        $basket_id=(Basket::where('user_id',$user_id)->get())[0]->id;
        $basket_device=Basket_device::where('basket_id',$basket_id)->select('device_id')->distinct()->get();

        $device_array=[];
        $k=0;
        //dd($basket_device[$k]->device_id) ;
        $device=[];
        foreach ($basket_device as $item) {
            $device_array[$k]=(Device::where('id', $item->device_id)->get())[0];
            $device_array[$k]->count=Basket_device::where('device_id', $item->device_id)->count();
            $k++;
        }
        return $device_array;
    }
     function getItems(Request $request){

       $type_id=Type::where('name',$request->get('type'))->get('id');
       return Device::where('type_id',$type_id[0]->id)->get();
    }
    function addItem(Request $req){
        $device=new Device();
        if($req->hasFile('file')){
            $device->name=$req->get('name');
            //['price'=>$req->get('price')],['image_path'=>$req->file('file')->store('public')],
             //   ['type_id'=>$req->get('type_id')],['brand_id'=>$req->get('brand_id')]);
            $device->price=$req->get('price');
            $device->image_path=$req->file('file')->store('public');
            $device->image_path=ltrim($device->image_path,'public/');
            $device->type_id=Type::where( 'name',$req->input('typeName'))->value('id');
            $device->brand_id=Brand::where( 'name',$req->get('brandName'))->value('id');
            $device->description=$req->get('description');
            $device->save();
            return response()->json(["message"=>$device]);
        }
        else{
            return response()->json(["message"=>"Not"]);
        }

        /* $product=new Product;
         $product->name=$req->input('name');
         $product->price=$req->input('price');
         $product->description=$req->input('description');
         $product->file_path=$req->file('file')->store('product');
         $product->save();
        return response() -> json([
            $file
         ]);*/
    }
    function addTypeBrand(){
        $type=new Type;
        $type->name="Video Card";
        $type->save();
        $type=new Type;
        $type->name="Monitor";
        $type->save();
        $type=new Type;
        $type->name="Processor";
        $type->save();
        $type=new Type;
        $type->name="MotherBoard";
        $type->save();


        $brand=new Brand;
        $brand->name="Asus";
        $brand->save();

        $brand=new Brand;
        $brand->name="Gigabyte";
        $brand->save();

        $brand=new Brand;
        $brand->name="MSI";
        $brand->save();

        $brand=new Brand;
        $brand->name="Palit";
        $brand->save();


        $brand=new Brand;
        $brand->name="Inno3D";
        $brand->save();
        $brand=new Brand;
        $brand->name="Sapphire";
        $brand->save();
        $brand=new Brand;
        $brand->name="KFA2";
        $brand->save();
        $brand=new Brand;
        $brand->name="PNY";
        $brand->save();
        $brand=new Brand;
        $brand->name="Zotac";
        $brand->save();
        $brand=new Brand;
        $brand->name="PowerColor";
        $brand->save();


        return response() -> json([
            "Add type and brand!"
        ],200);
    }
    function getTypesBrands(){
        $types=Type::select('name')->get();
        $typ=[];
        $brn=[];
        foreach($types as $type){
           $typ[]= $type->name;
        }
        $brands=Brand::select('name')->get();
        foreach($brands as $brand){
            $brn[]= $brand->name;
        }

        return response()->json([
            $typ,
            $brn
        ]);
    }
}
