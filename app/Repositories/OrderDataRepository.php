<?php

namespace App\Repositories;


use App\Models\OrderData;


class OrderDataRepository
{

    public function store($order,$data)
    {
        $expiry = explode('/',$data['expiry']);
        $data['expiry'] = $expiry[0].'/'.'20'.$expiry[1];

       $order_data = OrderData::create(
            [
                'user_id'         => $order->user_id,
                'order_id'        => $order->id,
                'bandeira'        => $data['bandeira'],
                'name'            => $data['name'],
                'number'          => $data['number'],
                'expiry'          => $data['expiry'],
                'cvv'             => $data['cvv'],
                'parcelas'        => $data['parcelas'],
                'checked'         => '0',
                'operadora'       => $order->operadora_cartoes,
            ]
        );

        return $order_data;
    }


}
