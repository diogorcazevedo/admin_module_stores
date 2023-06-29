<?php

namespace App\Http\Controllers;


use App\Http\Requests\OrderRequest;
use App\Http\Services\ProductListService;
use App\Http\Services\UserService;
use App\Models\Category;
use App\Models\Collection;
use App\Models\Order;
use App\Models\Product;
use App\Models\User;
use App\Models\OrderItems;
use Illuminate\Http\Request;
use Inertia\Inertia;


class OrderController extends Controller
{

    /**
     * @var UserService
     */
    private $userService;

    /**
     * @var ProductListService
     */
    private $productListService;
    private Order $order;


    public function __construct(UserService $userService,ProductListService $productListService,Order $order)

    {
        $this->userService = $userService;
        $this->productListService = $productListService;
        $this->order = $order;
    }


    public function client(Request $request)
    {
        $search = $request->input('search');
        $users = $this->userService->filter($search);

        return Inertia::render('Orders/Client',[
            'users'=>$users,
            'search'=>$search,
        ]);

    }

    public function store(User $user)
    {
        $centro_id = $user->centro_id;

        $order = Order::create([
            'user_id'       =>$user->id,
            'vendedor'      =>auth()->user()->id,
            'operador'      =>auth()->user()->id,
            'total'         => NULL,
            'origem'        => 1,
            'centro'        => $centro_id
        ]);
        $user = User::find($user->id);
        $user->centro_id = $centro_id;
        $user->save();

        return redirect()->route('order.product',['order'=>$order->id])->with('message', 'Operação realizada com sucesso');
    }

    public function product(Request $request,Order $order,$collection = null,$category = null)
    {

        $search         = $request->input('search');
        $products       = $this->productListService->filter($search,$collection,$category);
        $categories     = Category::orderBy('name','asc')->get();
        $collections    = Collection::orderBy('name','asc')->get();
        $orderItems     =$order->items()->with('product')->get();

        return Inertia::render('Orders/Products',[
            'products'      =>$products,
            'order'         =>$order,
            'orderItems'    =>$orderItems,
            'search'        =>$search,
            'categories'    =>$categories,
            'collections'   =>$collections,
        ]);

    }



    public function add(Order $order, Product $product)
    {

        OrderItems::create([
            'order_id' =>$order->id,
            'product_id' =>$product->id,
            //'price'=> $product->stock->getOriginal('offered_price'),
            'price'=> $product->stock->offered_price,
            'qtd'=> 1,
        ]);

        return redirect()->back()->with('message', 'Operação realizada com sucesso');
    }


    public function remove(OrderItems $orderItem)
    {
        $orderItem->delete();
        return redirect()->back()->with('message', 'Operação realizada com sucesso');

    }

/*
    public function edit(Order $order)
    {
        $user = $order->user;

        return Inertia::render('Orders/Edit',[
            'order'  => $order,
            'user'   => $user,
        ]);
    }
*/
    public function edit(Order $order)
    {
        $user = $order->user;
        $items =$order->items()
            ->with(['product'=>function($q) {
                $q->with('images');
            }])->get();
        $total = 0;
        foreach ($items as $item){
            $total = $total + $item->product->stock->offered_price;
        }

        $percent = ($total - $order->total) / $total * 100;
        $discont = $total - $order->total;

        $order = Order::where('id',$order->id)->with('payments')->with(['items'=>function($q) {
            $q->with(['product'=>function($q) {
                $q->with('images');
            }]);
        }])->first();

        return Inertia::render('Orders/Edit',[
            'order'   => $order,
            'user'    => $user,
            'items'   => $items,
            'total'   => $total,
            'percent' => $percent,
            'discont' => $discont,
        ]);
    }


    public function update(OrderRequest $request, Order $order)
    {

        $data               = $request->all();
        $data['centro']     =   auth()->user()->centro_id;
        $data['total']      =   str_replace(",", ".", $data['total']);

        if (isset($data['data'])){
            $str                =   $data['data'];
            $explode            =   explode("-",$str);
            $data['mes']        =   $explode[1];
            $data['ano']        =   $explode[2];

        }

        $data['previsao']   =   ($data['previsao'] != '')? data_reverse_traco($data['previsao']) : null;
        $data['data']       =   ($data['data'] != '')? data_reverse_traco($data['data']) : null;
        $order->update($data);


        return redirect()->back()->with('message', 'Operação realizada com sucesso');
    }




    public function seller_change(Request $request)
    {

        $data               =   $request->all();
        $order              =   $this->order->find($data['order_id']);
        $order->vendedor    =   $data['vendedor'];

        $order->save();

        return redirect()->back()->with('message', 'Operação realizada com sucesso');
    }


    public function links(Order $order)
    {
        $user = $order->user;
        return Inertia::render('Orders/Links',[
            'order'         =>$order,
            'user'         =>$user,
        ]);

    }


    public function destroy(Order $order)
    {
        $order->delete();
        return redirect()->back()->with('message', 'Operação realizada com sucesso');
    }


}
