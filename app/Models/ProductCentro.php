<?php

namespace App\Models;


use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Casts\Attribute;

class ProductCentro extends Model
{

    protected $table='product_centro';

    protected $fillable =[
        'id',
        'product_id',
        'centro_id',
    ];


    public function product()
    {
        return $this->belongsTo(Product::class);

    }

}

