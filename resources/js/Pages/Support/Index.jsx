import React from 'react';
import Auth from '@/Layouts/Auth';
import {Head, Link, usePage} from '@inertiajs/react'


export default function Index({supports}) {

    const {auth} = usePage().props
    const { errors } = usePage().props

    return (
       <>
           <Head title="Users" />
           <Auth auth={auth} errors={errors} >
               <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                   <div className="shadow mt-6 p-4 flex flex-row">
                       <div className="basis-2/3">
                           <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:text-3xl sm:truncate">Atendimentos</h2>
                       </div>
                       <div className="basis-1/3">
                           <Link href={route('support.clients')} className="text-center inline-block w-full items-center px-2.5 py-1.5 border border-transparent text-xs font-medium rounded shadow-sm text-white bg-teal-600 hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500">
                               clientes
                           </Link>
                       </div>
                   </div>
                   <table className="border mt-8 min-w-full divide-y divide-x divide-gray-200">
                       <thead className="bg-gray-50 divide-y divide-x divide-gray-200">
                       <tr className="divide-x divide-y divide-gray-200">
                           <th  className="text-gray-900 p-4">ID</th>
                           <th  className="text-gray-900 p-4">Interacões</th>
                           <th  className="text-gray-900 p-4">Nome</th>
                           <th  className="text-gray-900 p-4">Retorno agendado para</th>
                           <th  className="text-gray-900 p-4">Ações</th>
                       </tr>
                       </thead>
                       <tbody className="divide-y divide-x divide-gray-200 bg-white">
                       {supports.map((support) => (
                           <tr key={support.id} className="divide-x divide-y divide-gray-200">
                               <td className="text-sm p-2"><a href="#">{support.id}</a></td>
                               <td className="text-sm p-2">{support.messages.length}</td>
                               <td className="text-sm p-2">{support.lead.nome}</td>
                               <td className="text-sm p-2">{support.dt_retorno}</td>
                               <td className="text-sm p-2">
                                   <Link href={route('support_messages.index',{'id':support.id})} className="text-center inline-block w-full items-center px-2.5 py-1.5 border border-transparent text-xs font-medium rounded shadow-sm text-white bg-teal-600 hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500">
                                       interações
                                   </Link>
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
