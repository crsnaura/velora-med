import { useEffect, useState } from 'react'
import axios from 'axios'

function StockInPage() {
    const user = JSON.parse(
        localStorage.getItem('user')
    )
    const tenantId =
        user?.role === 'super_admin'
            ? localStorage.getItem('selectedTenant')
            : user?.tenant_id
    const [showForm, setShowForm] = useState(false)

    const [formData, setFormData] = useState({
        tenant_id: tenantId,
        item_id: '',
        vendor_id: '',
        quantity: '',
        received_date: ''
    })
    const [data, setData] = useState([])
    const [items, setItems] = useState([])
    const [suppliers, setSuppliers] = useState([])
    useEffect(() => {

        axios.get(
            'http://127.0.0.1:8000/api/stock-in',
            {
                headers: {
                    'X-Tenant-ID': tenantId
                }
            }
        )
            .then((response) => {
                setData(response.data)
            })

        axios
            .get('http://127.0.0.1:8000/api/items')
            .then((response) => {
                setItems(response.data)
            })

        axios
            .get('http://127.0.0.1:8000/api/suppliers')
            .then((response) => {
                setSuppliers(response.data)
            })
    }, [])

    const handleSubmit = () => {

        axios.post(
            'http://127.0.0.1:8000/api/stock-in',
            {
                ...formData,
                item_id: Number(formData.item_id),
                vendor_id: Number(formData.vendor_id),
                quantity: Number(formData.quantity)
            }
        )
            .then(() => {

                alert('Stock berhasil ditambahkan')

                window.location.reload()
            })
    }

    return (

        <div>

            <div className="flex justify-between items-center mb-8">

                <h1 className="text-4xl font-black text-[#4a044e]">
                    Stock In
                </h1>

                <button
                    onClick={() => setShowForm(!showForm)}
                    className="
            bg-pink-600
            text-white
            px-5
            py-3
            rounded-xl
            font-semibold
        "
                >
                    + Tambah Stock
                </button>

            </div>
            {
                showForm && (

                    <div className="bg-white rounded-3xl p-6 shadow mb-6">

                        <h2 className="text-2xl font-bold mb-4">
                            Tambah Stock Masuk
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

                            <select
                                className="border p-3 rounded-xl"
                                onChange={(e) =>
                                    setFormData({
                                        ...formData,
                                        vendor_id: e.target.value
                                    })
                                }
                            >

                                <option value="">
                                    Pilih Supplier
                                </option>

                                {
                                    suppliers.map((supplier) => (
                                        <option
                                            key={supplier.id}
                                            value={supplier.id}
                                        >
                                            {supplier.vendor_name}
                                        </option>
                                    ))
                                }

                            </select>

                            <input
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
                                type="date"
                                className="border p-3 rounded-xl"
                                onChange={(e) =>
                                    setFormData({
                                        ...formData,
                                        received_date: e.target.value
                                    })
                                }
                            />

                        </div>

                        <button
                            onClick={handleSubmit}
                            className="
        mt-4
        bg-green-600
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
            <div className="bg-white rounded-3xl p-6 shadow">

                <table className="w-full">

                    <thead>

                        <tr className="border-b">

                            <th className="text-left p-4">
                                Item
                            </th>

                            <th className="text-left p-4">
                                Supplier
                            </th>

                            <th className="text-left p-4">
                                Quantity
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

                                    <td className="p-4">
                                        {row.vendor_name}
                                    </td>

                                    <td className="p-4">
                                        {row.quantity}
                                    </td>

                                    <td className="p-4">
                                        {row.received_date}
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

export default StockInPage