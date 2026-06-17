import { useEffect, useState } from 'react'
import axios from 'axios'

function TenantsPage() {

    const [tenants, setTenants] =
        useState([])
    const [showForm, setShowForm] =
        useState(false)

    const [formData, setFormData] =
        useState({
            nama_rs: '',
            kelas_rs: ''
        })
    useEffect(() => {

        axios
            .get(
                'https://shimmering-magic-production-6404.up.railway.app/api/tenants'
            )
            .then((response) => {

                setTenants(
                    response.data
                )

            })

    }, [])
    const createTenant = async () => {

        try {

            await axios.post(
                'https://shimmering-magic-production-6404.up.railway.app/api/tenants',
                formData
            )

            window.location.reload()

        }
        catch (error) {

            console.error(error)

            alert('Gagal menambah tenant')

        }

    }
    return (

        <div>

            <div className="flex justify-between items-center mb-8">

                <h1
                    className="
                    text-4xl
                    font-black
                    text-[#4a044e]
                "
                >
                    Tenant Management
                </h1>

                <button
                    onClick={() => setShowForm(true)}
                    className="
  bg-[#6d214f]
  text-white
  px-5
  py-3
  rounded-xl
  font-bold
  "
                >
                    + Add Tenant
                </button>

            </div>
            {
                showForm && (

                    <div
                        className="
      bg-white
      p-6
      rounded-3xl
      mb-6
      border
      border-pink-100
      "
                    >

                        <h2
                            className="
        text-xl
        font-bold
        text-[#4a044e]
        mb-4
        "
                        >
                            Add New Hospital
                        </h2>

                        <div className="flex gap-4">

                            <input
                                placeholder="Nama Rumah Sakit"
                                className="
          border
          border-pink-100
          p-3
          rounded-xl
          flex-1
          "
                                onChange={(e) =>
                                    setFormData({
                                        ...formData,
                                        nama_rs: e.target.value
                                    })
                                }
                            />

                            <select
                                className="
  border
  border-pink-100
  p-3
  rounded-xl
  "
                                onChange={(e) =>
                                    setFormData({
                                        ...formData,
                                        kelas_rs: e.target.value
                                    })
                                }
                            >

                                <option value="">
                                    Pilih Kelas
                                </option>

                                <option value="A">A</option>
                                <option value="B">B</option>
                                <option value="C">C</option>
                                <option value="D">D</option>

                            </select>

                            <button
                                onClick={createTenant}
                                className="
          bg-green-600
          text-white
          px-5
          rounded-xl
          "
                            >
                                Save
                            </button>

                        </div>

                    </div>

                )
            }

            <div
                className="
                bg-white
                p-6
                rounded-3xl
                shadow-sm
                "
            >

                <table className="w-full">

                    <thead>

                        <tr className="border-b">

                            <th className="text-left py-3">
                                Tenant ID
                            </th>

                            <th className="text-left py-3">
                                Hospital
                            </th>

                            <th className="text-left py-3">
                                Class
                            </th>

                            <th className="text-left py-3">
                                Action
                            </th>

                        </tr>

                    </thead>

                    <tbody>

                        {tenants.map(
                            (tenant) => (

                                <tr
                                    key={
                                        tenant.tenant_id
                                    }
                                    className="border-b"
                                >

                                    <td className="py-4">
                                        {tenant.tenant_id}
                                    </td>

                                    <td>
                                        {tenant.nama_rs}
                                    </td>

                                    <td>
                                        {tenant.kelas_rs}
                                    </td>

                                    <td>

                                        <button
                                            className="
                                            bg-blue-500
                                            text-white
                                            px-3
                                            py-2
                                            rounded-lg
                                            mr-2
                                            "
                                        >
                                            Edit
                                        </button>

                                        <button
                                            className="
                                            bg-red-500
                                            text-white
                                            px-3
                                            py-2
                                            rounded-lg
                                            "
                                        >
                                            Delete
                                        </button>

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

export default TenantsPage