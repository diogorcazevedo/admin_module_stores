import React from 'react';
import Auth from '@/Layouts/Auth';
import {Head, usePage} from '@inertiajs/react'
import SelectSalesForYearAndMonth from "@/Pages/Sales/Components/SelectSalesForYearAndMonth";
import OrderSalesList from "@/Pages/Sales/Components/OrderSalesList";


export default function Index({orders,total,month,year,sellers}) {

    const {auth} = usePage().props
    const { errors } = usePage().props

    return (
        <>
            <Head title="Sales" />
            <Auth auth={auth} errors={errors} >
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <SelectSalesForYearAndMonth get_month={month} get_year={year} total={total}/>
                    <OrderSalesList orders={orders} sellers={sellers}/>
                </div>
            </Auth>
        </>
    );
}
