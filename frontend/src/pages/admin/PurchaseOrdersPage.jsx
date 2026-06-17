import { useEffect, useState } from 'react'
import axios from 'axios'

function PurchaseOrdersPage() {

    const [orders, setOrders] = useState([])

    useEffect(() => {

        axios
            .get(
                'https://shimmering-magic-production-6404.up.railway.app/api/purchase-orders'
            )
            .then((response) => {

                setOrders(
                    response.data
                )

            })

    }, [])
    const handleApprove = (id) => {

        axios.put(
            `https://shimmering-magic-production-6404.up.railway.app/api/purchase-orders/${id}/approve`
        )
            .then(() => {

                alert(
                    'PO Approved'
                )

                window.location.reload()

            })

    }
    return (

        <div>

            <h1 className="text-4xl font-black text-[#4a044e] mb-2">
                Purchase Orders
            </h1>

            <p className="text-slate-400 mb-8">
                Procurement order management
            </p>

            <div className="bg-white rounded-3xl p-6 shadow border border-pink-100">

                <table className="w-full">

                    <thead>

                        <tr className="border-b">

                            <th className="p-4 text-left">
                                PO ID
                            </th>

                            <th className="p-4 text-left">
                                Supplier
                            </th>

                            <th className="p-4 text-left">
                                Item
                            </th>

                            <th className="p-4 text-left">
                                Quantity
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
                            orders.map((order) => (

                                <tr
                                    key={order.id}
                                    className="border-b"
                                >

                                    <td className="p-4 font-bold">
                                        PO-{order.id}
                                    </td>

                                    <td className="p-4">
                                        {order.vendor_name}
                                    </td>

                                    <td className="p-4">
                                        {order.item_name}
                                    </td>

                                    <td className="p-4">
                                        {order.quantity}
                                    </td>

                                    <td className="p-4">

                                        <span
                                            className={
                                                order.status === 'Approved'
                                                    ? `
                px-3 py-1
                rounded-full
                bg-green-100
                text-green-700
                text-sm
                font-semibold
            `
                                                    : `
                px-3 py-1
                rounded-full
                bg-yellow-100
                text-yellow-700
                text-sm
                font-semibold
            `
                                            }
                                        >
                                            {order.status}
                                        </span>

                                    </td>
                                    <td className="p-4">

                                        {
                                            order.status === 'Draft'
                                                ? (

                                                    <button
                                                        onClick={() =>
                                                            handleApprove(
                                                                order.id
                                                            )
                                                        }
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

                                                )
                                                : (

                                                    <span
                                                        className="
                        text-green-600
                        font-bold
                    "
                                                    >
                                                        ✓ Approved
                                                    </span>

                                                )
                                        }

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

export default PurchaseOrdersPage