<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Basket_device extends Model
{
    use HasFactory;

    protected $fillable = [
        'device_id',
        'basked_id'
    ];
}
