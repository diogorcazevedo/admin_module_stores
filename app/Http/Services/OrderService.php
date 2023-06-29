<?php
/**
 * Created by PhpStorm.
 * User: diogoazevedo
 * Date: 23/11/15
 * Time: 22:30
 */

namespace App\Http\Services;


use App\Models\User;

class OrderService
{


    public function filter($search)
    {
        if (empty($search)) {
            $users = User::take(10)->get();
        }else{
            $users = User::ofSearch($search)->get();
        }

        return $users;
    }

}
