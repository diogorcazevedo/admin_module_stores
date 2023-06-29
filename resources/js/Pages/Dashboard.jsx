import React from 'react';
import {Head,Link, usePage} from '@inertiajs/react'
import Auth from "@/Layouts/Auth";
import FormSearchGeneric from "@/Pages/Application/FormSearchGeneric";
import ReportClientCacYearAndMonthList from "@/Pages/Reports/Components/ClientComponents/Cac/ReportClientCacYearAndMonthList.jsx";


export default function Dashboard({seller_orders,seller_total,month,year,total,sellers}) {

    const {auth} = usePage().props
    const { errors } = usePage().props


    return (
        <>
            <Head title="Dashboard" />

            <Auth auth={auth} errors={errors} >
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <dl className="mt-5 grid grid-cols-1 rounded-lg bg-white overflow-hidden shadow divide-y divide-gray-200 md:grid-cols-3 md:divide-y-0 md:divide-x">
                        <div  className="px-4 py-5 sm:p-6">
                            <dt className="text-base font-normal text-gray-900">PRODUTOS</dt>
                            <dd className="mt-1 w-full flex justify-between items-baseline md:block lg:flex">
                                <div className="flex w-full items-baseline text-2xl font-semibold text-teal-600">
                                    <FormSearchGeneric rte="product.index" label="produtos"/>
                                </div>
                            </dd>
                        </div>
                        <div  className="px-4 py-5 sm:p-6">
                            <dt className="text-base font-normal text-gray-900">CLIENTES</dt>
                            <dd className="mt-1 w-full flex justify-between items-baseline md:block lg:flex">
                                <div className="flex w-full items-baseline text-2xl font-semibold text-teal-600">
                                    <FormSearchGeneric rte="user.index" label="clientes"/>
                                </div>
                            </dd>
                        </div>
                        <div  className="px-4 py-4 sm:p-4">
                            <dt className="text-end  text-gray-900">Total: <span className="text-teal-600"> { new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(total) }</span></dt>
                            <dt className="text-end  text-gray-900">Vendedor: <span className="text-teal-600">{ new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(seller_total) }</span></dt>
                            <dt className="text-end  pt-2">
                                <Link
                                    href={route('order.client')}
                                    className="mt-2 rounded-md bg-teal-800 px-2.5 py-1.5 text-sm font-semibold text-white shadow-sm hover:bg-teal-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-600"
                                >
                                    Lançar Nova Venda
                                </Link>
                            </dt>
                        </div>
                    </dl>
                    <ReportClientCacYearAndMonthList center={auth.user.centro_id} year={year} month={month}/>
                </div>
            </Auth>

        </>

    );
}
