import React from 'react';
import Auth from '@/Layouts/Auth';
import {Head, usePage} from '@inertiajs/react'
import moment from "moment";

export default function Open({orders}) {

    const {auth} = usePage().props
    const { errors } = usePage().props

    return (
        <>
            <Head title="Shipping" />
            <Auth auth={auth} errors={errors} >
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-4">
                      <span className="inline-flex items-center px-1 pt-8 mr-4 leading-5">
                        <span className="font-semibold text-xl text-teal-600 leading-tight">Pendências entrega </span>
                    </span>

                    <table className="shadow-sm border mt-8 min-w-full divide-y divide-x divide-gray-200">
                     <thead className="bg-gray-50 divide-y divide-x divide-gray-200">
                        <tr className="divide-x divide-y divide-gray-200">
                            <th  className="text-gray-900 p-2">Cliente </th>
                            <th  className="text-gray-900 p-2">Status </th>
                            <th  className="text-gray-900 p-2">Previsão </th>
                            <th  className="text-gray-900 p-2">Itens </th>
                            <th  className="text-gray-900 p-2">Ação </th>

                        </tr>
                    </thead>
                    <tbody className="divide-y divide-x divide-gray-200 bg-white">
                    {orders?.map((order) => (
                        <tr key={order.id} className="divide-x divide-y divide-gray-200">
                            <td width="25%" className="text-xs p-2"><a href="@/Components/OrderList#"> {order.user.name}</a></td>
                            <td className="text-xs p-2"><a href="@/Components/OrderList#"> {order.entregue == 1 ? "ENTREGUE" : "NÃO ENTREGUE"}</a></td>
                            <td className="text-xs p-2"> {moment(order.previsao).format('DD/MM/YYYY')}</td>
                            <td width="25%" className="text-xs text-center items-center justify-center p-2">
                                {order.items?.map((item) => (
                                    <p key={item.id} className="mb-4">
                                        <span className="lowercase inline-flex items-center px-3 py-1.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                                            {item.product.name}
                                          </span>
                                     </p>
                                ))}
                            </td>
                            <td  className="text-gray-900 p-2">
                                <button
                                    type="button"
                                    className="w-full my-2 px-4 py-2 border border-transparent text-sm font-medium rounded-md text-teal-700 bg-teal-100 hover:bg-teal-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500"
                                    onClick={() => setOpen(true)}
                                >
                                    editar
                                </button>
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
