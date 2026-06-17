import { useEffect, useState } from 'react'
import axios from 'axios'

function StockOutPage() {
    const user = JSON.parse(
        localStorage.getItem('user')
    )
    const tenantId =
        user?.role === 'super_admin'
            ? localStorage.getItem('selectedTenant')
            : user?.tenant_id
    const [showForm, setShowForm] = useState(false)

    const [items, setItems] = useState([])

    const [formData, setFormData] = useState({
        tenant_id: tenantId,
        item_id: '',
        quantity: '',
        destination: '',
        issued_date: ''
    })
    const [data, setData] = useState([])

    useEffect(() => {

        axios
            .get(
                'http://127.0.0.1:8000/api/stock-out',
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

        axios
            .get(
                'http://127.0.0.1:8000/api/items'
            )
            .then((response) => {

                setItems(
                    response.data
                )

            })

    }, [])

    const handleSubmit = () => {

        axios.post(
            'http://127.0.0.1:8000/api/stock-out',
            {
                ...formData,
                item_id: Number(formData.item_id),
                quantity: Number(formData.quantity)
            },
            {
                headers: {
                    'X-Tenant-ID': tenantId,
                }
            }
        )
            .then(() => {

                alert(
                    'Stock Out berhasil'
                )

                window.location.reload()

            })
            .catch((error) => {

                console.error(error)

                alert(
                    'Gagal menambahkan Stock Out'
                )

            })

    }
    return (

        <div>

            <div className="flex justify-between items-center mb-8">

                <div>

                    <h1 className="text-4xl font-black text-[#4a044e]">
                        Stock Out
                    </h1>

                    <p className="text-slate-400 mt-2">
                        Monitoring distribusi obat keluar
                    </p>

                </div>

                <button
                    onClick={() =>
                        setShowForm(
                            !showForm
                        )
                    }
                    className="
            bg-red-600
            text-white
            px-5
            py-3
            rounded-xl
            font-semibold
        "
                >
                    + Distribusi Barang
                </button>

            </div>
            {
                showForm && (

                    <div className="bg-white rounded-3xl p-6 shadow mb-6">

                        <h2 className="text-2xl font-bold mb-4">
                            Distribusi Obat
                        </h2>

                        <div className="grid grid-cols-2 gap-4">

                            <select
                                className="border p-3 rounded-xl"
                                onChange={(e) =>
                                    setFormData({
                                        ...formData,
                                        item_id: e.target.value
                                    })
                                }
                            >

                                <option value="">
                                    Pilih Item
                                </option>

                                {
                                    items.map((item) => (

                                        <option
                                            key={item.id}
                                            value={item.id}
                                        >
                                            {item.item_name}
                                        </option>

                                    ))
                                }

                            </select>

                            <input
                                type="number"
                                placeholder="Quantity"
                                className="border p-3 rounded-xl"
                                onChange={(e) =>
                                    setFormData({
                                        ...formData,
                                        quantity: e.target.value
                                    })
                                }
                            />

                            <input
                                placeholder="Destination"
                                className="border p-3 rounded-xl"
                                onChange={(e) =>
                                    setFormData({
                                        ...formData,
                                        destination: e.target.value
                                    })
                                }
                            />

                            <input
                                type="date"
                                className="border p-3 rounded-xl"
                                onChange={(e) =>
                                    setFormData({
                                        ...formData,
                                        issued_date: e.target.value
                                    })
                                }
                            />

                        </div>

                        <button
                            onClick={handleSubmit}
                            className="
                    mt-4
                    bg-red-600
                    text-white
                    px-5
                    py-3
                    rounded-xl
                "
                        >
                            Simpan
                        </button>

                    </div>

                )
            }
            <div className="bg-white rounded-3xl p-6 shadow border border-pink-100">

                <table className="w-full">

                    <thead>

                        <tr className="border-b">

                            <th className="text-left p-4">
                                Item
                            </th>

                            <th className="text-left p-4">
                                Quantity
                            </th>

                            <th className="text-left p-4">
                                Destination
                            </th>

                            <th className="text-left p-4">
                                Date
                            </th>

                        </tr>

                    </thead>

                    <tbody>

                        {
                            data.map((row) => (

                                <tr
                                    key={row.id}
                                    className="border-b"
                                >

                                    <td className="p-4">
                                        {row.item_name}
                                    </td>

                                    <td className="p-4 font-bold text-red-500">
                                        {row.quantity}
                                    </td>

                                    <td className="p-4">
                                        {row.destination}
                                    </td>

                                    <td className="p-4">
                                        {row.issued_date}
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

export default StockOutPage