<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Lead extends Model
{


    protected $table = 'sale_leads';

    protected $fillable =[

        'user_id',
        'nome',
        'sobrenome',
        'instagram',
        'nome_instagram',
        'primeiro_contato',
        'ultimo_contato',
        'ano',
        'mes',
        'city',
        'uf',
        'telefone',
        'evento',
    ];

    public function user()
    {
        return $this->belongsTo(User::class);

    }

    public function atendimentos()
    {
        return $this->hasMany(SaleSupport::class,'lead_id');

    }

}
