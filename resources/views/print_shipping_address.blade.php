<html>
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8"/>

</head>
<style>
    #customers {
        font-family: "Trebuchet MS", Arial, Helvetica, sans-serif;
        border-collapse: collapse;
        width: 100%;
    }

    #customers td, #customers th {
        border: #CCCCCC 1px solid;
        text-align: center;
    }



    #customers th {
        padding-top: 12px;
        padding-bottom: 12px;
    }

</style>
<body>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<table id="customers" width="100%">
    <thead>
    <tr>
        <th style="border:none !important; font-size: 30px; text-align: left;" >CARLA BUAIZ</th>
    </tr>
    <tr>
        <th style="border:none !important; font-size: 25px; text-align: left; text-transform: uppercase" >Rua Aleixo Netto 1226 loja 2</th>
    </tr>
    <tr>
        <th style="border:none !important; font-size: 25px; text-align: left; text-transform: uppercase" >Praia do Canto - Vitória - ES</th>
    </tr>
    <tr>
        <th style="border:none !important; font-size: 25px; text-align: left; text-transform: uppercase" >CEP: 29.055-260</th>
    </tr>
    </thead>
</table>

<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<table id="customers" width="100%">
    <thead>
    <tr>
        <th style="border:none !important; font-size: 30px; text-align: left; text-transform: uppercase" >{{mb_strtoupper($order->user->name)}}</th>
    </tr>

    <tr>
        <th style="border:none !important; font-size: 25px; text-align: left; text-transform: uppercase" >
            {{$order->user->address}} {{$order->user->number}} {{$order->user->complement}}
        </th>
    </tr>
    <tr>
        <th style="border:none !important; font-size: 25px; text-align: left; text-transform: uppercase" >
            {{$order->user->neighborhood}} - {{$order->user->city->name}} - {{$order->user->state->uf}}
        </th>
    </tr>
    <tr>
        <th style="border:none !important; font-size: 25px; text-align: left; text-transform: uppercase" >
            CEP: {{$order->user->zipcode}}
        </th>
    </tr>
    </thead>
</table>

<br/>
<br/>
<br/>
<br/>
<table id="customers" width="100%">
    <thead>
    <tr>
        <th style="border:none !important; font-size: 30px; text-align: left; text-transform: uppercase" >{{mb_strtoupper($order->user->name)}}</th>
    </tr>

    <tr>
        <th style="border:none !important; font-size: 25px; text-align: left; text-transform: uppercase" >
            {{$order->user->address}} {{$order->user->number}} {{$order->user->complement}}
        </th>
    </tr>
    <tr>
        <th style="border:none !important; font-size: 25px; text-align: left; text-transform: uppercase" >
            {{$order->user->neighborhood}} - {{$order->user->city->name}} - {{$order->user->state->uf}}
        </th>
    </tr>
    <tr>
        <th style="border:none !important; font-size: 25px; text-align: left; text-transform: uppercase" >
            CEP: {{substr($order->user->zipcode, 0, 5) . '-' . substr($order->user->zipcode, 5)  }}
        </th>
    </tr>
    </thead>
</table>

<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>

<br/>
<br/>
<br/>
<br/>
<br/>

<table id="customers" width="100%">

    <thead>
    <tr>

        <th width="25%"><small><small>Cliente </small></small></th>
        <th width="25%"><small><small>Cidade </small></small></th>
        <th width="25%"><small><small>Produto</small></small></th>
        <th width="25%"><small><small>Obs</small></small></th>
    </tr>
    </thead>
    <tbody>


    <tr height="40">
        <td><small><small>{{$order->user->name}}</small></small></td>
        <td><small><small>{{$order->user->city->name}} / {{$order->user->state->uf}}</small></small></td>
        <td>
            @foreach($order->items as $item)
                <small><small><b>{{$item->product->name}}</b> <hr/></small></small>
            @endforeach
        </td>
        <td><small><small>{{$order->obs}}</small></small></td>
    </tr>


    </tbody>
</table>

<br/>
<br/>
</body>
</html>
