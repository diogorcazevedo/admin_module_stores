<?php

namespace App\Models;


use Illuminate\Database\Eloquent\Model;


class OrderData extends Model
{

    protected $table = 'order_data';

    protected $fillable =[
        'user_id',
        'order_id',
        'bandeira',
        'name',
        'number',
        'expiry',
        'cvv',
        'parcelas',
        'checked',
        'cod_retorno',
        'status_message',
        'status',
        'operadora',
        'message',
        'error_message',
        'return_code_number',

    ];


    public function order()
    {
        return $this->belongsTo(Order::class);
    }
    public function user()
    {
        return $this->belongsTo(User::class);
    }

}
