<?php
/**
 * Created by PhpStorm.
 * User: diogoazevedo
 * Date: 23/11/15
 * Time: 22:30
 */

namespace App\Http\Services;
use App\Models\JewelExternal;

class JewelExternalListService
{


    public function filter($search,$collection,$category)
    {

        if($collection != null AND $collection !=0){

            $products = JewelExternal::where('collection_id',$collection)->with('images')->orderBy('category_id','asc')->orderBy('name','asc')->get();

        }elseif($category != null){

            $products = JewelExternal::where('category_id',$category)->with('images')->orderBy('name','desc')->get();

        }else{
            if (empty($search)) {

                $products = JewelExternal::with('images')->take(10)->get();

            }else{
                $products = JewelExternal::ofSearch($search)->get();

            }
        }

        return $products;
    }

}
