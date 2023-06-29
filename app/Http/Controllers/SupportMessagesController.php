<?php

namespace App\Http\Controllers;



use App\Models\State;
use App\Models\Support;
use App\Models\SupportMessages;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\URL;
use Inertia\Inertia;


class SupportMessagesController extends Controller
{



    public function index($id){

        $support = Support::find($id);
        $messages = SupportMessages::where('atendimento_id',$support->id)->with('lead','seller')->get();

        return Inertia::render('Support/Messages/Index',[
            'support'=>$support,
            'messages'=>$messages,
        ]);

    }

    public function edit($id)
    {
        $message = SupportMessages::find($id);
        $url = URL::previous();
        $states = State::all();

        return Inertia::render('Support/Messages/Edit',[
            'url'=>$url,
            'states'=>$states,
            'message'=>$message,
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


        $support                        = Support::find($id);

        // $support->providencia        = $data['providencia'];
        // $support->necessidade        = $data['necessidade'];
        $support->dt_retorno            = data_reverse_traco($data['dt_retorno']);
        $support->retorno_dia           = $data['dia'];
        $support->retorno_mes           = $data['mes'];
        $support->retorno_ano           = $data['ano'];
        $support->vendedor_id           = auth()->user()->id;
        $support->save();


        $message                    =  SupportMessages::find($data['interacao_id']);
        $message->atendimento_id    = $support->id;
        $message->vendedor_id       = auth()->user()->id;
        $message->user_id           = $support->user_id;
        $message->lead_id           = $support->lead_id;
        $message->dt_cadastro       = date('Y-m-d');
        $message->providencia       = $data['providencia'];
        $message->necessidade       = $data['necessidade'];
        $message->collection_id     = NULL;
        $message->canal             = $data['canal'];
        $message->dt_retorno        = data_reverse_traco($data['dt_retorno']);
        $message->retorno_dia       = $data['dia'];
        $message->retorno_mes       = $data['mes'];
        $message->retorno_ano       = $data['ano'];
        $message->save();


        return redirect()->route('support_messages.index',['id'=>$support->id]);

    }

    public function change_status($id)
    {
        $message = SupportMessages::find($id);
        if ($message->status == 0){
            $message->status = 1;
        }else{
            $message->status = 0;
        }
        $message->save();


        $support = Support::find($message->atendimento_id);
        if ($support->status ==0){
            $support->status =1;
        }else{
            $support->status =0;
        }
        $support->save();

        return redirect()->back();
    }

}
