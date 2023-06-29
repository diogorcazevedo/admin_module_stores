
import React from 'react';
import Auth from '@/Layouts/Auth';
import {Head, Link, usePage} from '@inertiajs/react'

export default function Index({support,messages}) {

    const {auth} = usePage().props
    const { errors } = usePage().props

    function status(status){
        if (status == 0){
            return <p>aberto</p>
        }else{
            return <p>solucionado</p>
        }
    }
    return (
       <>
           <Head title="Users" />
           <Auth auth={auth} errors={errors} >
               <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                   <div className="shadow mt-6 p-4 flex flex-row">
                       <div className="basis-1/3">
                           <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:text-3xl sm:truncate">Interações</h2>
                       </div>
                   </div>
                   <table className="border mt-8 min-w-full divide-y divide-x divide-gray-200">
                       <thead className="bg-gray-50 divide-y divide-x divide-gray-200">
                       <tr className="divide-x divide-y divide-gray-200">
                           <th  className="text-gray-900 p-4">Responsável</th>
                           <th  className="text-gray-900 p-4">Canal</th>
                           <th  className="text-gray-900 p-4">Necessidade</th>
                           <th  className="text-gray-900 p-4">Retorno</th>
                           <th colSpan="3"  className="text-gray-900 p-4">
                               <Link href={route('support.edit',{'id':support.id})}  className="inline-block w-full items-center px-2.5 py-1.5 border border-transparent text-xs font-medium rounded shadow-sm text-white bg-teal-600 hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500">
                                   NOVA
                               </Link>
                           </th>
                       </tr>
                       </thead>
                       <tbody className="divide-y divide-x divide-gray-200 bg-white">
                       {messages.map((message) => (
                           <tr key={message.id} className="divide-x divide-y divide-gray-200">
                               <td className="text-sm p-2"><a href="#">{message.seller.name}</a></td>
                               <td className="text-sm p-2">{message.canal}</td>
                               <td className="text-sm p-2">{message.necessidade}</td>
                               <td className="text-sm p-2">{message.providencia}</td>
                               <td className="text-sm p-2">{message.dt_retorno}</td>
                               <td className="text-sm p-2">
                                   <a href={route('support_messages.edit',{'id':message.id})} className="inline-block w-full items-center px-2.5 py-1.5 border border-transparent text-xs font-medium rounded shadow-sm text-white bg-teal-600 hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500">
                                       editar
                                   </a>
                               </td>
                               <td className="text-sm p-2">
                                   <a href={route('support_messages.change_status',{'id':message.id})} className="inline-block w-full items-center px-2.5 py-1.5 border border-transparent text-xs font-medium rounded shadow-sm text-white bg-teal-600 hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500">
                                       {status(message.status)}
                                   </a>
                               </td>
                           </tr>
                       ))}
                       </tbody>
                       <tfoot>
                           <tr>
                               <th colSpan="6"  className="text-gray-900 p-4">

                               </th>
                               <th  className="text-gray-900 p-4">
                                   <a href={route("support.seller",{id:auth.user.id})} className="inline-block w-full items-center px-2.5 py-1.5 border border-transparent text-xs font-medium rounded shadow-sm text-white bg-teal-600 hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500">
                                       voltar
                                   </a>
                               </th>
                           </tr>
                       </tfoot>
                   </table>
               </div>
           </Auth>
       </>
    );
}
