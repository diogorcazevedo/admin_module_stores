<?php

namespace App\Http\Controllers;



use App\Http\Controllers\Controller;
use Inertia\Inertia;


class ReportController extends Controller
{


    public function index(){

        $year = date('Y');
        $month = date("m");

        return Inertia::render('Reports/Index',[
            'year'=>$year,
            'month'=>$month,
        ]);
    }

    public function client(){

        $year = date('Y');
        $month = date("m");

        return Inertia::render('Reports/Client',[
            'year'=>$year,
            'month'=>$month,
        ]);
    }

    public function product(){

        $year = date('Y');
        $month = date("m");

        return Inertia::render('Reports/Product',[
            'year'=>$year,
            'month'=>$month,
        ]);
    }

}
