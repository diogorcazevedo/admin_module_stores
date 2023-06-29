<?php

namespace App\Http\Controllers;



use App\Models\SupportMessages;
use App\Models\Lead;
use App\Models\State;
use App\Models\Support;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Session;
use Illuminate\Support\Facades\URL;
use Inertia\Inertia;


class SupportController extends Controller
{


    public function index()
    {
        $supports = Support::with('lead','messages')->get();

        return Inertia::render('Support/Index',[
            'supports'=>$supports,
        ]);

    }

    public function clients(Request $request)
    {
        $search = $request->input('search');

        if (empty($search)) {
            $users = User::where('admin',0)->with('supports')->take(10)->get();
        }else{
            $users = User::ofSearch($search)->with('supports')->get();
        }

        return Inertia::render('Support/Clients',[
            'users'=>$users,
            'search'=>$search,
        ]);

    }

    public function seller($id)
    {
        $supports = Support::where('vendedor_id',$id)->with('lead','messages')->get();

        return Inertia::render('Support/Index',[
            'supports'=>$supports,
        ]);

    }
    public function seller_date($id)
    {
        $supports= Support::where('vendedor_id',$id)->where('dt_retorno',date('Y-m-d'))->with('lead','messages')->get();

        return Inertia::render('Support/Index',[
            'supports'=>$supports,
        ]);
    }




    public function schedule(Request $request,$id)
    {

        $data = $request->input('data');


        if (empty($data)) {
            $year       = date('Y');
            $month      = date("m");
            $day        = date("d");
        }else{
            $explode    =   explode("-",$data);
            $year       = $explode[2];
            $month      = $explode[1];
            $day        = $explode[0];
        }



        $supports = SupportMessages::where('retorno_ano',$year)
                                        ->where('retorno_mes',$month)
                                        ->where('retorno_dia',$day)->get();
                                        //->where('vendedor_id',$id)->get();



        return Inertia::render('Support/Schedule',[
            'supports'=>$supports,
            'month'=>$month,
            'year'=>$year,
            'day'=>$day,
        ]);
    }


    public function create($lead){


        $lead = Lead::find($lead);
        $support = Support::where('lead_id',$lead->id)->count();

        if ($support == 0){
            $support = Support::create(
                [
                    'vendedor_id'       => auth()->user()->id,
                    'user_id'           => $lead->user_id,
                    'lead_id'           => $lead->id,
                    'dt_cadastro'       => date('Y-m-d'),
                    'canal'             => NULL,
                ]
            );
        }else{
            $support = Support::where('lead_id',$lead->id)->first();
        }

        return redirect()->route('support.edit',['id'=>$support->id]);
    }

    public function edit($id)
    {
        $support    = Support::find($id);
        $url        = URL::previous();
        $states     = State::all();

        return Inertia::render('Support/Edit',[
            'support'=>$support,
            'states'=>$states,
            'url'=>$url
        ]);

    }
    public function update(Request $request,$id)
    {
        $data               =   $request->all();
        $str                =   $data['dt_retorno'];
        $explode            =   explode("-",$str);
        $data['dia']        =   $explode[0];
        $data['mes']        =   $explode[1];
        $data['ano']        =   $explode[2];


        $support = Support::find($id);

       // $support->providencia       = $data['providencia'];
       // $support->necessidade       = $data['necessidade'];
        $support->dt_retorno        = data_reverse_traco($data['dt_retorno']);
        $support->retorno_dia       = $data['dia'];
        $support->retorno_mes       = $data['mes'];
        $support->retorno_ano       = $data['ano'];
        $support->vendedor_id       = auth()->user()->id;
        $support->save();

        SupportMessages::create(
            [
                'atendimento_id'    => $support->id,
                'vendedor_id'       => auth()->user()->id,
                'user_id'           => $support->user_id,
                'lead_id'           => $support->lead_id,
                'dt_cadastro'       => date('Y-m-d'),
                'providencia'       => $data['providencia'],
                'necessidade'       => $data['necessidade'],
                'collection_id'     => NULL,
                'canal'             => $data['canal'],
                'dt_retorno'        => data_reverse_traco($data['dt_retorno']),
                'retorno_dia'       => $data['dia'],
                'retorno_mes'       => $data['mes'],
                'retorno_ano'       => $data['ano'],
            ]
        );


        Session::flash('success', 'Operação realizada com sucesso');
        return redirect()->route('support_messages.index',['id'=>$support->id]);

    }

    public function destroy($id)
    {
        Support::destroy($id);
        return redirect()->back();
    }

    public function status($id)
    {
        $support = Support::find($id);
        if ($support->status ==1){
            $support->status =0;
        }else{
            $support->status =1;
        }
        $support->save();

        return redirect()->back();
    }

}
