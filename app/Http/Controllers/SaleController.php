<?php

namespace App\Http\Controllers;


use App\Models\User;
use App\Repositories\OrderRepository;
use Inertia\Inertia;


class SaleController extends Controller
{

    private OrderRepository $orderRepository;
    private User $user;

    public function __construct(OrderRepository $orderRepository,User $user)
    {
        $this->orderRepository = $orderRepository;
        $this->user = $user;
    }

    public function index($year=NULL,$month = NULL)
    {

        if ($year == NULL){
            $year = date('Y');
        }
        if ($month == NULL){
            $month = date("m");
        }
        $center =auth()->user()->centro_id;
        $orders = $this->orderRepository->orderByYearAndMonth($center,$year,$month);
        $total  = $this->orderRepository->totalByYearAndMonth($center,$year,$month);
        $sellers = $this->user->where('admin','1')->where('active','1')->orderBy('name')->get();

        return Inertia::render('Sales/Index',[
            'orders'=>$orders,
            'total'=>$total,
            'month'=>$month,
            'year' =>$year,
            'sellers' =>$sellers,
        ]);

    }
}
