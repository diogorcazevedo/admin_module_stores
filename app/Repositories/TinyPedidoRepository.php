<?php

namespace App\Repositories;


use App\Models\TinyPedido;


class TinyPedidoRepository
{

    public function store($order)
    {

        $tiny_pedido = new TinyPedido();
        $tiny_pedido->order_id           = $order->id;
        $tiny_pedido->user_id            = $order->user->id;
        $tiny_pedido->save();

    }

}
