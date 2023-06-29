<?php

namespace App\Http\Controllers;

use App\Http\Services\ShippingService;
use App\Http\Services\SigepeService;
use App\Models\Order;
use App\Models\Product;
use App\Models\ShippingItems;
use App\Models\Shipping;
use App\Models\ShippingType;
use App\Models\User;
use App\Repositories\SigepeRepository;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Session;
use Inertia\Inertia;
use Barryvdh\Snappy\Facades\SnappyPdf as PDF;

class ShippingController extends Controller
{

    private ShippingService $shippingService;
    private SigepeService $sigepeService;
    private SigepeRepository $sigepeRepository;

    public function __construct(ShippingService $shippingService,
                                SigepeService $sigepeService,
                                SigepeRepository $sigepeRepository)
    {

        $this->shippingService = $shippingService;
        $this->sigepeService = $sigepeService;
        $this->sigepeRepository = $sigepeRepository;
    }

    public function index(Order $order){

        $shippings =Shipping::where('order_id',$order->id)->with('shipping_items')->get();
        $items = $order->items()->with('product')->get();
        $user =User::where('id',$order->user_id)->with('city','state')->first();
        $types = ShippingType::all();

        return Inertia::render('Shipping/Index',[
            'order'     =>$order,
            'shippings' =>$shippings,
            'items' =>$items,
            'user' =>$user,
            'types' =>$types,
        ]);
    }
    public function get_all(Order $order){


        $shippings = Shipping::where('order_id',$order->id)
            ->with(['shipping_items'=>function($q){
                $q->with(['product'=>function($q){
                    $q->with('images');
                }]);
            }])->get();



        $items = $order->items()->with('product')->get();
        $user =User::where('id',$order->user_id)->with('city','state')->first();
        $types = ShippingType::all();

        return Inertia::render('Shipping/All',[
            'order'     =>$order,
            'shippings' =>$shippings,
            'items' =>$items,
            'user' =>$user,
            'types' =>$types,
        ]);
    }


    public function open(){

        $orders = Order::where('entregue',0)->where('centro',2)->with('user','ponto')
            ->with(['items'=>function($q){
                $q->with(['product'=>function($q){
                    $q->with('images');
                }]);
            }])->get();

        return Inertia::render('Shipping/Open',[
            'orders' =>$orders,
        ]);
    }

    public function status(Order $order){

        if ($order->entregue ==1){
            $order->entregue=0;

        }else{
            $order->entregue=1;
        }
        $order->save();

        return redirect()->back()->with('message', 'Operação realizada com sucesso');
    }



    public function store(Request $request, Order $order){

        $data = $request->all();
        $shipping = $this->shippingService->store($order,$data);
        $this->shippingService->storeItems($order,$data,$shipping);

        return redirect()->back()->with('message', 'Operação realizada com sucesso');

    }



    public function update(Request $request, Shipping $shipping){

        $data = $request->all();
        $this->shippingService->update($shipping,$data);
        return redirect()->back()->with('message', 'Operação realizada com sucesso');

    }

    public function add_item(Shipping $shipping,Product $product){


            ShippingItems::create([
                'order_id'          =>$shipping->order_id,
                'order_entrega_id'  =>$shipping->id,
                'product_id'        =>$product->id,
                'user_id'           =>$shipping->user_id,
            ]);


        Session::flash('success', 'Adicionado com sucesso');
        return redirect()->back()->with('message', 'Operação realizada com sucesso');

    }

    public function destroy_item(ShippingItems $shippingItems)
    {
        $shippingItems->delete();
        return redirect()->back()->with('message', 'Operação realizada com sucesso');
    }

    public function print_shipping_address(Order $order)
    {
        $pdf = PDF::loadView('print_shipping_address', compact('order'));
        return $pdf->download(primeiroNome($order->user->name).'_'.ultimoNome($order->user->name).'.pdf');
    }


    }
