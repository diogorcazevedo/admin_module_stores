import React from 'react';
import Auth from '@/Layouts/Auth';
import {Head, Link, usePage} from '@inertiajs/react'
import FormSearchGeneric from "@/Pages/Application/FormSearchGeneric";
import SalesUserSlide from "@/Pages/Users/Components/SalesUserSlide";


export default function Index({users,search}) {

    const {auth} = usePage().props
    const { errors } = usePage().props

    function support(user){
        if (user.supports.length > 0){

            return  <Link href={route('support_messages.index',{'id':user.supports[0].id})} className="text-center inline-block w-full items-center px-2.5 py-1.5 border border-transparent text-xs font-medium rounded shadow-sm text-white bg-teal-600 hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500">
                        interações
                    </Link>
        }else{

            return  <Link href={route('lead.user',{'id':user.id})} className="text-center inline-block w-full items-center px-2.5 py-1.5 border border-transparent text-xs font-medium rounded shadow-sm text-white bg-teal-600 hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500">
                        +interações
                    </Link>
        }
    }
    return (
       <>
           <Head title="clientes" />
           <Auth auth={auth} errors={errors} >
               <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                   <div className="shadow mt-6 p-4 flex flex-row">
                       <div className="basis-1/3">
                           <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:text-3xl sm:truncate">Clientes</h2>
                       </div>
                       <div className="basis-2/3">
                           <FormSearchGeneric rte="support.clients" label="clientes"/>
                       </div>
                       <div className="basis-1/3">
                           <div className="mt-3">
                               <Link href={route('lead.create')} className="text-center block w-full items-center  justify-center px-4 py-2 border border-transparent shadow-sm font-medium rounded-md text-white bg-teal-600 hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm">
                                   Criar
                               </Link>
                           </div>
                       </div>

                   </div>
                   <table className="border mt-8 min-w-full divide-y divide-x divide-gray-200">
                       <thead className="bg-gray-50 divide-y divide-x divide-gray-200">
                       <tr className="divide-x divide-y divide-gray-200">
                           <th  className="text-gray-900 p-2">ID</th>
                           <th  className="text-gray-900 p-2">Name</th>
                           <th  className="text-gray-900 p-2">Email</th>
                           <th  className="text-gray-900 p-2">Cel</th>
                           <th  className="text-gray-900 p-2">
                               Ações
                           </th>
                       </tr>
                       </thead>
                       <tbody className="divide-y divide-x divide-gray-200 bg-white">
                       {users.map((user) => (
                           <tr key={user.id} className="divide-x divide-y divide-gray-200">
                               <td className="text-sm p-2"><a href="#">{user.id}</a></td>
                               <td className="text-sm p-2">
                                   <Link href={route('user.edit',{user:user.id})}>
                                   {user.name}
                                   </Link>
                               </td>
                               <td className="text-sm p-2">
                                   <Link href={route('user.edit',{user:user.id})}>
                                   {user.email}
                                   </Link>
                               </td>
                               <td className="text-sm p-2">
                                   <Link href={route('user.edit',{user:user.id})}>
                                   {user.cel}
                                   </Link>
                               </td>
                               <td className="text-sm text-center items-center justify-center p-2">
                                   {support(user)}
                               </td>
                           </tr>
                       ))}
                       </tbody>
                   </table>
               </div>
           </Auth>
       </>
    );
}
