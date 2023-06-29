<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Support extends Model
{


    protected $table = 'sale_atendimentos';

    protected $fillable =[

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
      //  'collection_id',
        'evento',
       // 'providencia',
       // 'necessidade',
      //  'canal',
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
    public function messages()
    {
        return $this->hasMany(SupportMessages::class,'atendimento_id','id');

    }
}
