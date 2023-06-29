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
        <th style="border:none !important; font-size: 30px; text-align: left; text-transform: uppercase" >{{mb_strtoupper($user->name)}}</th>
    </tr>

    <tr>
        <th style="border:none !important; font-size: 25px; text-align: left; text-transform: uppercase" >
            {{$user->address}} {{$user->number}} {{$user->complement}}
        </th>
    </tr>
    <tr>
        <th style="border:none !important; font-size: 25px; text-align: left; text-transform: uppercase" >
            {{$user->neighborhood}} - {{$user->city->name}} - {{$user->state->uf}}
        </th>
    </tr>
    <tr>
        <th style="border:none !important; font-size: 25px; text-align: left; text-transform: uppercase" >
            CEP: {{$user->zipcode}}
        </th>
    </tr>
    </thead>
</table>

</body>
</html>
