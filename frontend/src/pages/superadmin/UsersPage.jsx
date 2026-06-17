import { useEffect, useState } from 'react'
import axios from 'axios'

function UsersPage() {
    const user = JSON.parse(
        localStorage.getItem('user')
    )

    const tenantId =
        user?.role === 'super_admin'
            ? localStorage.getItem('selectedTenant')
            : user?.tenant_id
    const [users, setUsers] =
        useState([])
    const [showForm, setShowForm] =
        useState(false)

    const [tenants, setTenants] =
        useState([])

    const [formData, setFormData] =
        useState({
            username: '',
            password: '',
            role: 'admin',
            tenant_id: tenantId
        })
    useEffect(() => {

        axios
            .get(
                'http://127.0.0.1:8000/api/users'
            )
            .then((response) => {

                setUsers(
                    response.data
                )

            })

        axios
            .get(
                'http://127.0.0.1:8000/api/tenants'
            )
            .then((response) => {

                setTenants(
                    response.data
                )

            })

    }, [])

    const createUser = async () => {

        await axios.post(
            'http://127.0.0.1:8000/api/users',
            formData
        )

        window.location.reload()
    }
    const deleteUser = async (username) => {

        if (!window.confirm('Delete this user?'))
            return

        await axios.delete(
            `http://127.0.0.1:8000/api/users/${username}`
        )

        window.location.reload()
    }
    return (

        <div>

            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 mb-8">

                <div className="bg-gradient-to-br from-pink-500 to-fuchsia-600 text-white p-6 rounded-3xl">
                    <p>Total Users</p>
                    <h2 className="text-5xl font-black">
                        {users.length}
                    </h2>
                </div>

                <div className="bg-gradient-to-br from-[#6d214f] to-[#4a044e] text-white p-6 rounded-3xl">
                    <p>Administrators</p>
                    <h2 className="text-5xl font-black">
                        {
                            users.filter(
                                u => u.role === 'admin'
                            ).length
                        }
                    </h2>
                </div>

                <div className="bg-gradient-to-br from-purple-500 to-violet-700 text-white p-6 rounded-3xl">
                    <p>Directors</p>
                    <h2 className="text-5xl font-black">
                        {
                            users.filter(
                                u => u.role === 'director'
                            ).length
                        }
                    </h2>
                </div>

            </div>

            <div className="flex justify-between mb-6">

                <h1
                    className="
        text-4xl
        font-black
        text-[#4a044e]
        "
                >
                    User Management
                </h1>

                <button
                    onClick={() =>
                        setShowForm(true)
                    }
                    className="
        bg-[#6d214f]
        text-white
        px-5
        py-3
        rounded-xl
        "
                >
                    + Add User
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
            "
                    >

                        <input
                            placeholder="Username"
                            className="border p-3 mr-3"
                            onChange={(e) =>
                                setFormData({
                                    ...formData,
                                    username:
                                        e.target.value
                                })
                            }
                        />

                        <input
                            placeholder="Password"
                            className="border p-3 mr-3"
                            onChange={(e) =>
                                setFormData({
                                    ...formData,
                                    password:
                                        e.target.value
                                })
                            }
                        />

                        <select
                            className="border p-3 mr-3"
                            onChange={(e) =>
                                setFormData({
                                    ...formData,
                                    role:
                                        e.target.value
                                })
                            }
                        >
                            <option value="admin">
                                Admin
                            </option>

                            <option value="director">
                                Director
                            </option>
                        </select>

                        <select
                            className="border p-3 mr-3"
                            onChange={(e) =>
                                setFormData({
                                    ...formData,
                                    tenant_id:
                                        e.target.value
                                })
                            }
                        >

                            {tenants.map(
                                (tenant) => (

                                    <option
                                        key={
                                            tenant.tenant_id
                                        }
                                        value={
                                            tenant.tenant_id
                                        }
                                    >
                                        {tenant.nama_rs}
                                    </option>

                                )
                            )}

                        </select>

                        <button
                            onClick={
                                createUser
                            }
                            className="
                bg-green-600
                text-white
                px-4
                py-3
                rounded-xl
                "
                        >
                            Save User
                        </button>

                    </div>

                )
            }
            <div
                className="
                bg-white
                p-6
                rounded-3xl
            "
            >

                <div
                    className="
    bg-white/80
    backdrop-blur-xl
    rounded-[30px]
    border
    border-pink-100
    overflow-hidden
    "
                >

                    {users.map((user) => (

                        <div
                            key={user.username}
                            className="
            flex
            items-center
            justify-between
            p-6
            border-b
            border-pink-50
            hover:bg-pink-50/50
            transition
            "
                        >

                            <div className="flex items-center gap-5">

                                <div
                                    className="
                    w-14
                    h-14
                    rounded-2xl
                    bg-gradient-to-br
                    from-pink-500
                    to-purple-600
                    flex
                    items-center
                    justify-center
                    text-white
                    font-black
                    text-xl
                    "
                                >

                                    {user.username[0].toUpperCase()}

                                </div>

                                <div>

                                    <h3
                                        className="
                        text-lg
                        font-bold
                        text-[#4a044e]
                        "
                                    >
                                        {user.username}
                                    </h3>

                                    <p className="text-slate-500">
                                        {user.nama_rs || user.tenant_id}
                                    </p>

                                </div>

                            </div>

                            <div className="flex items-center gap-4">

                                <span
                                    className={
                                        user.role === 'director'
                                            ? `
                            bg-purple-100
                            text-purple-700
                            px-4
                            py-2
                            rounded-full
                            text-sm
                            font-semibold
                            `
                                            : `
                            bg-pink-100
                            text-pink-700
                            px-4
                            py-2
                            rounded-full
                            text-sm
                            font-semibold
                            `
                                    }
                                >
                                    {user.role}
                                </span>

                                <button
                                    className="
                    px-4
                    py-2
                    rounded-xl
                    bg-pink-100
                    text-pink-700
                    "
                                >
                                    Edit
                                </button>

                                <button
                                    onClick={() => deleteUser(user.username)}
                                    className="
                    px-4
                    py-2
                    rounded-xl
                    bg-red-100
                    text-red-600
                    "
                                >
                                    Delete
                                </button>

                            </div>

                        </div>

                    ))}

                </div>

            </div>

        </div>

    )

}

export default UsersPage