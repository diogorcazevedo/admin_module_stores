<?php

namespace App\Http\Controllers;


use App\Repositories\OrderRepository;
use Inertia\Inertia;


class ProposalController extends Controller
{

    private OrderRepository $orderRepository;

    public function __construct(OrderRepository $orderRepository)
    {
        $this->orderRepository = $orderRepository;
    }

    public function index($year=NULL,$month = NULL)
    {

        if ($year == NULL){
            $year = date('Y');
        }
        if ($month == NULL){
            $month = date("m");
        }
        $center =   auth()->user()->centro_id;
        $orders = $this->orderRepository->orderOpenByYearAndMonth($center,$year,$month);
        $total  = $this->orderRepository->totalOpenByYearAndMonth($center,$year,$month);


        return Inertia::render('Proposal/Index',[
            'orders'=>$orders,
            'total'=>$total,
            'month'=>$month,
            'year' =>$year,
        ]);

    }
}
