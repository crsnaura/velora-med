import { useEffect, useState } from 'react'
import axios from 'axios'

function PurchaseOrdersPage() {

    const [orders, setOrders] =
        useState([])

    useEffect(() => {

        axios
            .get(
                'http://127.0.0.1:8000/api/purchase-orders'
            )
            .then((response) => {

                setOrders(
                    response.data
                )

            })

    }, [])
    const approvePO = async (poId) => {

        const vendorName =
            prompt(
                'Masukkan nama vendor'
            )

        if (!vendorName) {
            return
        }

        await axios.put(
            `http://127.0.0.1:8000/api/purchase-orders/${poId}/approve`,
            {
                vendor_name: vendorName
            }
        )

        window.location.reload()
    }
    const rejectPO = async (poId) => {

        await axios.put(
            `http://127.0.0.1:8000/api/purchase-orders/${poId}/reject`
        )

        window.location.reload()

    }
    return (

        <div>

            <h1
                className="
                text-4xl
                font-black
                text-[#4a044e]
                mb-6
                "
            >
                Purchase Orders
            </h1>

            <div
                className="
                bg-white
                rounded-3xl
                p-6
                "
            >

                <table className="w-full">

                    <thead>

                        <tr className="border-b">

                            <th className="p-3 text-left">
                                ID
                            </th>

                            <th className="p-3 text-left">
                                Tenant
                            </th>

                            <th className="p-3 text-left">
                                Item
                            </th>

                            <th className="p-3 text-left">
                                Qty
                            </th>

                            <th className="p-3 text-left">
                                Vendor
                            </th>

                            <th className="p-3 text-left">
                                Status
                            </th>

                            <th className="p-3 text-left">
                                Action
                            </th>

                        </tr>

                    </thead>

                    <tbody>

                        {orders.map(
                            (po) => (

                                <tr
                                    key={po.id}
                                    className="border-b"
                                >

                                    <td className="p-3">
                                        {po.id}
                                    </td>

                                    <td className="p-3">
                                        {po.tenant_id}
                                    </td>

                                    <td className="p-3">
                                        {po.item_name}
                                    </td>

                                    <td className="p-3">
                                        {po.quantity}
                                    </td>

                                    <td className="p-3">
                                        {
                                            po.vendor_name
                                            || '-'
                                        }
                                    </td>
                                    <td className="p-3">

                                        <span
                                            className={
                                                po.status === 'Approved'
                                                    ? 'bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-semibold'
                                                    : po.status === 'Pending'
                                                        ? 'bg-yellow-100 text-yellow-700 px-3 py-1 rounded-full text-sm font-semibold'
                                                        : 'bg-red-100 text-red-700 px-3 py-1 rounded-full text-sm font-semibold'
                                            }
                                        >
                                            {po.status}
                                        </span>

                                    </td>
                                    <td className="p-3">

                                        {po.status === 'Pending' ? (

                                            <div className="flex gap-2">

                                                <button
                                                    onClick={() => approvePO(po.id)}
                                                    className="
          bg-green-600
          text-white
          px-4
          py-2
          rounded-xl
        "
                                                >
                                                    Approve
                                                </button>

                                                <button
                                                    onClick={() => rejectPO(po.id)}
                                                    className="
          bg-red-600
          text-white
          px-4
          py-2
          rounded-xl
        "
                                                >
                                                    Reject
                                                </button>

                                            </div>

                                        ) : (

                                            <span className="text-slate-400">
                                                No Action
                                            </span>

                                        )}

                                    </td>
                                </tr>

                            )
                        )}

                    </tbody>

                </table>

            </div>

        </div>

    )

}

export default PurchaseOrdersPage