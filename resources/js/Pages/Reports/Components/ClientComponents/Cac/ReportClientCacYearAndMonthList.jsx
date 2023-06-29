import { useState, useEffect } from "react";
import _, { orderBy } from "lodash";
import axios from 'axios';
export default function ReportClientCacYearAndMonthList({center,year,month}) {

    const [dataNew, setDataNew] = useState(null);
    const [newTotal, setNewTotal] = useState(null);
    const [dataOld, setDataOld] = useState(null);
    const [oldTotal, setOldTotal] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const monthNames = ["Meses","January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
    ];

    const month_name = monthNames[month]

    useEffect(() => {

        const url =  `https://administracaodosistema.com.br/reports/api/report/client/month_cac/`+year+'/'+month+"/"+center

        const getData = async () => {
            try {
                const response = await axios.get(url);
                const new_users = orderBy(response.data.new_clients, ["total"], 'desc');
                const old_users = orderBy(response.data.old_clients, ["total"], 'desc');
                setDataNew(new_users);
                setDataOld(old_users);
                setNewTotal(response.data.new_total)
                setOldTotal(response.data.old_total)
                setError(null);
            } catch (err) {
                setError(err.message);
                setNewTotal(null);
                setDataOld(null);
            } finally {
                setLoading(false);
            }
        };
        getData();
    }, [loading]);



    function clientsTable(data,total){
        let count = 0;
        return <table className="border mt-2 min-w-full divide-y divide-x divide-gray-200">
            <thead className="bg-gray-50 divide-y divide-x divide-gray-200">
            <tr className="divide-x divide-y divide-gray-200">
                <th  className="text-sm text-gray-900 p-2">-</th>
                <th  width="30%"  className="text-sm text-gray-900 p-2"> CLIENTE</th>
                <th  className="text-sm text-gray-900 p-2">COMPRAS</th>
                <th  className="text-sm text-gray-900 p-2">TOTAL</th>
            </tr>
            </thead>
            <tbody className="divide-y divide-x divide-gray-200 bg-white">
            {Object.values(data).map((item,index) => (
                <tr key={index} className="divide-x divide-y divide-gray-200">
                    <td className="text-xs p-2">{count = count + 1 }</td>
                    <td className="text-xs p-2">{item?.user}</td>
                    <td className="text-xs p-2">{item?.orders}</td>
                    <td className="text-xs p-2"> {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(item?.total) }</td>
                </tr>
            ))}
            </tbody>
            <tfoot>
            <tr>
                <td></td>
                <td></td>
                <td colSpan={2} width="50%" className="text-xs p-2">Total: {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(total) } </td>
            </tr>
            <tr>
                <td></td>
                <td></td>
                <td colSpan={2} width="50%" className="text-xs p-2">Tiket médio: {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(total / count) } </td>
            </tr>
            </tfoot>
        </table>
    }



    return (
        <>
            {loading && <p>Loading...</p>}
            {!loading &&
                <div className="flex-1 xl:flex">
                    <div className="px-4 py-6 sm:px-6 lg:pl-8 xl:flex-1 xl:pl-6">
                        <div className="flex flex-row">
                            <div className="basis-1/2">
                                <p className="bg-teal-800 py-2 px-2 text-white">Clientes Novos: {month_name} / {year} </p>
                                {dataNew && clientsTable(dataNew,newTotal)}
                            </div>
                            <div className="ml-4 basis-1/2">
                                <p className="bg-teal-800 py-2 px-2 text-white">Clientes Antigos</p>
                                {dataOld &&  clientsTable(dataOld,oldTotal)}
                            </div>
                        </div>

                    </div>
                </div>
            }


        </>

    );
}
