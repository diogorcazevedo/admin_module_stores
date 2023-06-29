import { useState, useEffect } from "react";
import _, { orderBy } from "lodash";
import axios from 'axios';
export default function ReportClientQuantityYearList({center,year}) {


    const [data, setData] = useState(null);
    const [total, setTotal] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {

        const url =  `https://administracaodosistema.com.br/reports/api/report/client/year_quantity/`+year+"/"+center
        const getData = async () => {
            try {
                const response = await axios.get(url);
                const sorted = orderBy(response.data.data, ["orders"], 'desc');
                setData(sorted);
                setTotal(response.data.total)
                setError(null);
            } catch (err) {
                setError(err.message);
                setData(null);
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
                <th  className="text-sm text-gray-900 p-2">COMPRAS</th>
                <th  width="30%"  className="text-sm text-gray-900 p-2"> CLIENTE</th>
                <th  className="text-sm text-gray-900 p-2">TOTAL</th>
            </tr>
            </thead>
            <tbody className="divide-y divide-x divide-gray-200 bg-white">
            {/*{Object.values(data).map((item,index) => (*/}
            {Object.values(data).map((item,index) => (
                <tr key={index} className="divide-x divide-y divide-gray-200">
                    <td className="text-xs p-2">{count = count + 1 }</td>
                    <td className="text-xs p-2">{item?.orders}</td>
                    <td className="text-xs p-2">{item?.user}</td>
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
                <div className="grid grid-cols-1 gap-4">
                    <div>
                        <p className="bg-teal-800 py-2 px-2 text-white">VENDAS POR QTD: {year} </p>
                    </div>
                    <div>
                        {data && clientsTable(data,total)}
                    </div>
                </div>
            }


        </>

    );
}
