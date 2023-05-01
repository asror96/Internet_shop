<?php

namespace App\Http\Controllers;

use Dotenv\Parser\Parser;
use Illuminate\Http\Request;
use App\Models\Type;
use App\Models\Brand;
use App\Models\Device;
use JetBrains\PhpStorm\NoReturn;
use Psy\Util\Json;

//dd($request);
class ItemController extends Controller
{
    function hello(){
        return response() -> json([
            "Hello!"
        ],200);
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
            $device->type_id=$req->get('type_id');
            $device->brand_id=$req->get('brand_id');
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

        return response()->json([
            Type::select('name')->get(),
            Brand::select('name')->get()
        ]);
    }
}
