import { useEffect, useState } from 'react'
import axios from 'axios'

function ReorderPage() {

    const [data, setData] = useState([])
    const user = JSON.parse(
        localStorage.getItem('user')
    )

    const tenantId =
        user?.role === 'super_admin'
            ? localStorage.getItem('selectedTenant')
            : user?.tenant_id
    useEffect(() => {

        axios.get(
            'http://127.0.0.1:8000/api/reorder/recommendations',
            {
                headers: {
                    'X-Tenant-ID': tenantId
                }
            }
        )
            .then((response) => {

                setData(
                    response.data
                )

            })

    }, [])
    const handleGeneratePO = (row) => {

        axios.post(
            'http://127.0.0.1:8000/api/purchase-orders',
            {
                tenant_id: tenantId,
                item_name: row.item_name,
                quantity: Math.round(
                    row.recommended_purchase
                )
            }
        )
            .then(() => {

                alert(
                    'Purchase Order berhasil dibuat'
                )

            })

    }

    return (

        <div>

            <h1 className="text-4xl font-black text-[#4a044e] mb-2">
                Reorder Center
            </h1>

            <p className="text-slate-400 mb-8">
                AI-driven procurement recommendations
            </p>

            <div className="bg-white rounded-3xl p-6 shadow border border-pink-100">

                <table className="w-full">

                    <thead>

                        <tr className="border-b">

                            <th className="p-4 text-left">
                                Item
                            </th>

                            <th className="p-4 text-left">
                                Current Stock
                            </th>

                            <th className="p-4 text-left">
                                Days Left
                            </th>

                            <th className="p-4 text-left">
                                Lead Time
                            </th>

                            <th className="p-4 text-left">
                                Status
                            </th>

                            <th className="p-4 text-left">
                                Action
                            </th>

                        </tr>

                    </thead>

                    <tbody>

                        {
                            data.map((row, index) => (

                                <tr
                                    key={index}
                                    className="border-b"
                                >

                                    <td className="p-4 font-semibold">
                                        {row.item_name}
                                    </td>

                                    <td className="p-4">
                                        {row.current_stock}
                                    </td>

                                    <td className="p-4 text-red-500 font-bold">
                                        {Number(
                                            row.days_until_stockout
                                        ).toFixed(2)}
                                    </td>

                                    <td className="p-4">
                                        {row.restock_lead_time}
                                    </td>

                                    <td className="p-4">

                                        <span
                                            className="
                                            px-3
                                            py-1
                                            rounded-full
                                            bg-red-100
                                            text-red-600
                                            text-sm
                                            font-semibold
                                        "
                                        >
                                            Reorder
                                        </span>

                                    </td>

                                    <td className="p-4">

                                        <button
                                            onClick={() =>
                                                handleGeneratePO(row)
                                            }
                                            className="
                                            bg-[#6d214f]
                                            text-white
                                            px-4
                                            py-2
                                            rounded-xl
                                            hover:bg-[#4a044e]
                                        "
                                        >
                                            Generate PO
                                        </button>

                                    </td>

                                </tr>

                            ))
                        }

                    </tbody>

                </table>

            </div>

        </div>

    )
}

export default ReorderPage