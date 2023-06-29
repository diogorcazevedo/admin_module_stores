<?php

namespace App\Http\Controllers;


use App\Models\Centro;
use App\Models\Order;
use App\Models\User;
use App\Repositories\OrderRepository;
use Inertia\Inertia;


class DashBoardController extends Controller
{

    private OrderRepository $orderRepository;
    private User $user;

    public function __construct(OrderRepository $orderRepository,User $user)
    {
        $this->orderRepository = $orderRepository;
        $this->user = $user;
    }
    public function index($year=NULL,$month = NULL){


        if ($year == NULL){
            $year = date('Y');
        }
        if ($month == NULL){
            $month = date("m");
        }
        $center =auth()->user()->centro_id;
        $seller =auth()->user()->id;
        $total  = $this->orderRepository->totalByYearAndMonth($center,$year,$month);
        $seller_orders = $this->orderRepository->orderBySeller($seller,$year,$month);
        $seller_total  = $this->orderRepository->totalBySeller($seller,$year,$month);
        $sellers = $this->user->where('admin','1')->where('active','1')->orderBy('name')->get();

        return Inertia::render('Dashboard',[
            'total'         =>$total,
            'seller_orders' =>$seller_orders,
            'seller_total'  =>$seller_total,
            'month'=>$month,
            'year' =>$year,
            'sellers' =>$sellers,

        ]);
    }

}
