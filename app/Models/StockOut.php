<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class StockOut extends Model
{

    protected $table = 'product_stock_out';

    protected $fillable = [
        'product_id',
        'quantity',
        'unit_price',
        'out_price',
        'pack',
        'taxes',
        'frete',
        'extras',
        'order_item_id',
        'unit_cost',
        'income',

    ];

    public function getRouteKeyName()
    {
        return 'id';
    }

    public function product()
    {
        return $this->belongsTo(Product::class);

    }

}
