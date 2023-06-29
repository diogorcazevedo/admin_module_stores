import React from 'react';
import ModalOrderItems from "@/Pages/Orders/Components/ModalOrderItems";


export default function OrderHead({order,user,total,items}) {


    return (
        <>
            <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                <div className="shadow mt-6 p-4 flex flex-row">
                    <div className="basis-2/4">
                        <p className="px-1 pt-1 text-right leading-5" >
                            <span className="font-semibold text-xl text-teal-600 leading-tight">{user.name}</span>
                        </p>
                    </div>
                    <div className="basis-2/4">
                        <div className="flex flex-row">
                            <div className="basis-2/4">
                                <p className="px-1 pt-1 text-right leading-5" >
                                    <span className="font-semibold text-xl text-teal-600 leading-tight">TOTAL: {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(total) }</span>
                                </p>
                            </div>
                            <div className="basis-1/4">
                                <div className="basis-1/4">
                                    <ModalOrderItems items={items} order={order}/>
                                </div>
                            </div>
                            <div className="basis-1/4">
                                <div className="flex justify-end">
                                    <a href={route('print.shipping.address',{order:order.id})}
                                       className="inline-flex items-center px-2.5 py-1.5 border border-transparent text-xs font-medium rounded text-teal-700 bg-teal-100 hover:bg-teal-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500">
                                        endereço
                                    </a>
                                </div>
                            </div>
                        </div>

                    </div>

                </div>

            </div>
        </>
    );
}
