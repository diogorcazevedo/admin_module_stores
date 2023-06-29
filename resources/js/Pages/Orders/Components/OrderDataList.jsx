import moment from "moment"
import {Link} from '@inertiajs/react'

export default function OrderDataList({order}) {

    function paymentsList(order) {
        if (order.payments){
            return  <div className="py-8">
                <table className="border mt-8 min-w-full divide-y divide-x divide-gray-200">
                    <thead className="bg-gray-50 divide-y divide-x divide-gray-200">
                    <tr className="divide-x divide-y divide-gray-200">
                        <th  className="text-gray-900 font-medium p-2 py-6">Bandeira</th>
                        <th  className="text-gray-900 font-medium p-2 py-6">Name</th>
                        <th  className="text-gray-900 font-medium p-2 py-6">Number</th>
                        <th  className="text-gray-900 font-medium p-2 py-6">Parcelas</th>
                        <th  className="text-gray-900 font-medium p-2 py-6">Status</th>
                        <th  className="text-gray-900 font-medium p-2 py-6">Total</th>
                        <th  className="text-gray-900 font-medium p-2 py-6">Obs</th>
                        <th  className="text-gray-900 font-medium p-2 py-6">Data</th>
                        <th  className="text-gray-900 font-medium p-2 py-6">Estornada</th>
                    </tr>
                    </thead>
                    <tbody className="divide-y divide-x divide-gray-200 bg-white">
                    {order.payments.map((item) => (
                        <tr key={item.id} className="divide-x divide-y divide-gray-200">
                            <td className="text-sm p-2">{item.bandeira}</td>
                            <td className="text-sm p-2">{item.name}</td>
                            <td className="text-sm p-2">****.****.****.{item.number.slice(-4)}</td>
                            <td className="text-sm p-2">{item.parcelas}</td>
                            <td className="text-sm p-2">{item.status}</td>
                            <td className="text-sm p-2">{new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(item.total) }</td>
                            <td className="text-sm p-2">{item.error_message}</td>
                            <td className="text-sm p-2">{item.created_at}</td>
                            <td className="text-sm p-2">{chargeback(item)}</td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
        }


    }

    function chargeback(item) {
        if (item.chargeback == 1) {
            return  <p className="inline-flex  w-full items-center px-2.5 py-1.5 border border-transparent text-xs font-medium rounded shadow-sm text-white bg-red-600 hover:bg-teal-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500">
                estornada
            </p>
        }else{
            return  <p className="inline-flex  w-full items-center px-2.5 py-1.5 border border-transparent text-xs font-medium rounded shadow-sm text-white bg-teal-600 hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500">
                sem estorno
            </p>
        }
    }

    return (
        <>
            {paymentsList(order)}
        </>

    );
}
