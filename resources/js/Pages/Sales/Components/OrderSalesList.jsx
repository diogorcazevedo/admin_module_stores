import moment from "moment";
import {Link} from '@inertiajs/react'
import React from "react";
import SalesUserSlide from "@/Pages/Users/Components/SalesUserSlide";
import SlideOrderSellerEdit from "@/Pages/Sales/Components/SlideOrderSellerEdit.jsx";

export default function OrderSalesList({orders,sellers}) {




    function shipping(order) {
        if (order.entregue == 1) {
            return  <Link preserveScroll href={route('shipping.status',{order:order.id})}  className="inline-flex items-center px-2.5 py-1.5 border border-transparent text-xs font-medium rounded text-teal-700 bg-teal-100 hover:bg-teal-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500">
                sim
            </Link>
        }else{
            return  <Link preserveScroll href={route('shipping.status',{order:order.id})}  className="inline-flex items-center px-2.5 py-1.5 border border-transparent text-xs font-medium rounded shadow-sm text-white bg-teal-600 hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500">
                não
            </Link>
        }
    }

    return (
        <>
             <table className="border mt-8 min-w-full divide-y divide-x divide-gray-200">
                    <thead className="bg-gray-50 divide-y divide-x divide-gray-200">
                    <tr className="divide-x divide-y divide-gray-200">
                        {/*<th  className="text-sm text-gray-900 p-2">ID</th>*/}
                        <th  className="text-sm text-gray-900 p-2">Data</th>
                        <th  width="25%" className="text-sm text-gray-900 p-2">Cliente</th>
                        <th  width="25%" className="text-sm text-gray-900 p-2">Compras</th>
                        <th  width="25%" className="text-sm text-gray-900 p-2">Vendedor</th>
                        <th  width="15%" className="text-sm text-gray-900 p-2">Obs</th>
                        <th  className="text-sm text-gray-900 p-2">Valor</th>
                        <th colSpan="2"  className="text-sm text-gray-900 p-2">
                            Edições
                        </th>
                        <th  className="text-sm text-gray-900 p-2">
                            Entregue
                        </th>
                    </tr>
                    </thead>
                    <tbody className="divide-y divide-x divide-gray-200 bg-white">
                    {orders.map((order) => (
                        <tr key={order.id} className="divide-x divide-y divide-gray-200">
                            {/*<td className="text-xs p-2"><a href="@/Components/OrderList#">{order.id}</a></td>*/}
                            <td className="text-xs p-2">{moment(order.data).format('DD/MM/YYYY')}</td>
                            <td className="text-xs p-2"><a href={route('user.edit',{user:order.user_id})}>{order.user.name}</a></td>
                            <td className="text-xs text-center items-center justify-center p-2">
                                <SalesUserSlide orders={order.user.orders}/>
                            </td>
                            <td className="text-xs p-2"><SlideOrderSellerEdit order={order} sellers={sellers}/></td>
                            {/*<td className="text-xs p-2">{order.seller ? order.seller.name : order.vendedor}</td>*/}
                            <td className="text-xs p-2">{order.obs}</td>
                            <td className="text-xs p-2">{order.total}</td>
                            <td className="text-xs text-center items-center justify-center p-2">
                                <Link href={route("order.edit",{order:order.id})} className="inline-flex items-center px-2.5 py-1.5 border border-transparent text-xs font-medium rounded text-teal-700 bg-teal-100 hover:bg-teal-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500">
                                    editar
                                </Link>
                            </td>
                            <th>
                                <Link href={route("shipping.index",{order:order.id})} className="inline-flex items-center px-2.5 py-1.5 border border-transparent text-xs font-medium rounded text-teal-700 bg-teal-100 hover:bg-teal-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500">
                                    entrega
                                </Link>
                            </th>
                            <td className="text-xs text-center items-center justify-center p-2">{shipping(order)}</td>
                        </tr>
                    ))}
                    </tbody>
                </table>
        </>

    );
}
