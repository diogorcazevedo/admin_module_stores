<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class SupportMessages extends Model
{


    protected $table = 'sale_atendimentos_interacoes';

    protected $fillable =[

        'atendimento_id',
        'vendedor_id',
        'user_id',
        'lead_id',
        'dt_cadastro',
        'dt_retorno',
        'retorno_dia',
        'retorno_mes',
        'retorno_ano',
        'mes',
        'ano',
      //  'product_id',
        'collection_id',
        'evento',
        'providencia',
        'necessidade',
        'canal',
    ];

    public function user()
    {
        return $this->belongsTo(User::class);

    }
    public function seller()
    {
        return $this->belongsTo(User::class,'vendedor_id','id');

    }
    public function lead()
    {
        return $this->belongsTo(Lead::class,'lead_id','id');

    }
    public function support()
    {
        return $this->belongsTo(Support::class,'atendimento_id','id');

    }
}
