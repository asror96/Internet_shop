<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Device extends Model
{
    use HasFactory;


    protected $table='devices';
    protected $fillable = [
        'id',
        'name',
        'price',
        'image_path',
    ];
    public function basked_device(){
        return $this->hasOne(Basket_device::class);
    }

}
