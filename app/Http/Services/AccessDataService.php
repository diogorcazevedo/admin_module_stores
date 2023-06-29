<?php

namespace App\Http\Services;

use PhpSigep\Model\AccessData;
use PhpSigep\Model\Diretoria;

class AccessDataService extends AccessData
{

    public function __construct()
    {
        parent::__construct(
            array(
                'usuario'           => '39887330',
                'senha'             => '4ffe0o',
                'codAdministrativo' => '22097660',
                'numeroContrato'    => '9912572511',
                'cartaoPostagem'    => '77054075',
                'cnpjEmpresa'       => '39887330000186', // Obtido no método 'buscaCliente'.
                'anoContrato'       => null, // Não consta no manual.
                'diretoria'         => new Diretoria(Diretoria::DIRETORIA_DR_ESPIRITO_SANTO), // Obtido no método 'buscaCliente'.
            )
        );
        try {\PhpSigep\Bootstrap::getConfig()->setEnv(\PhpSigep\Config::ENV_DEVELOPMENT);} catch (\Exception $e) {}
    }

}
