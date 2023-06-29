<?php

namespace App\Http\Controllers;


use App\Models\Lead;
use App\Models\State;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Session;
use Illuminate\Support\Facades\URL;
use Inertia\Inertia;

class LeadController extends Controller
{


    public function index()
    {
        $leads= Lead::all();

        return view('admin.marketing.leads.index',compact('leads'));

    }


    public function user($id)
    {

        $user = User::find($id);

        $count_lead = Lead::where('user_id',$user->id)->count();

        if ($count_lead == 0){
            $data['mes'] = date('m');
            $data['ano'] = date('Y');


            $lead =  Lead::create(
                [
                    'user_id'           => $user->id,
                    'nome'              => $user->name,
                    'primeiro_contato'  => date('Y-m-d'),
                    'ultimo_contato'    => NULL,
                    'ano'               => $data['ano'],
                    'mes'               => $data['mes'],
                    'city'              => $user->city->name,
                    'uf'                => $user->state->uf,
                    'telefone'          => $user->cel,

                ]
            );
        }else{

            $lead = Lead::where('user_id',$user->id)->first();
        }

        return redirect()->route('support.create',['lead'=>$lead]);
    }


    public function create()
    {
        $url = URL::previous();
        $states = State::all();

        return Inertia::render('Lead/Create',[
            'url'=>$url,
            'states'=>$states,
        ]);

    }

    public function store(Request $request)
    {

        $data = $request->all();
        $data['mes'] = date('m');
        $data['ano'] = date('Y');



       $lead =  Lead::create(
            [
                'nome'              => mb_strtoupper($data['nome']),
               // 'sobrenome'         => mb_strtoupper($data['sobrenome']),
                'instagram'         => $data['instagram'],
              //  'nome_instagram'    => mb_strtoupper($data['nome_instagram']),
                'primeiro_contato'  => date('Y-m-d'),
                'ultimo_contato'    => NULL,
                'ano'               => $data['ano'],
                'mes'               => $data['mes'],
                'city'              => mb_strtoupper($data['city']),
                'uf'                => mb_strtoupper($data['uf']),
                'telefone'          => $data['telefone'],

            ]
        );

        Session::flash('success', 'Operação realizada com sucesso');

        //return redirect()->away($request->input("url"));
        return redirect()->route('support.create',['lead'=>$lead]);

    }

    public function edit($id)
    {
        $user = Lead::find($id);
        $url = URL::previous();
        $states = State::all();

        return Inertia::render('Lead/Edit',[
            'user'=>$user,
            'url'=>$url,
            'states'=>$states,
        ]);

    }
    public function update(Request $request,$id)
    {
        $data = $request->all();
        $lead = Lead::find($id);

                $lead->nome                 = mb_strtoupper($data['nome']);
             //   $lead->sobrenome          = mb_strtoupper($data['sobrenome']);
                $lead->instagram            = $data['instagram'];
              //  $lead->nome_instagram     = mb_strtoupper($data['nome_instagram']);
                $lead->city                 = mb_strtoupper($data['city']);
                $lead->uf                   = mb_strtoupper($data['uf']);
                $lead->telefone             = $data['telefone'];
                $lead->save();


        Session::flash('success', 'Operação realizada com sucesso');
        return redirect()->away($request->input("url"));

    }

    public function destroy($id)
    {
        Lead::destroy($id);
        return redirect()->back();
    }

}
