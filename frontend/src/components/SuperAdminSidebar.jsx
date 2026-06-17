import { NavLink } from 'react-router-dom'
import {
    HeartPulse,
    LayoutDashboard,
    Building2,
    Users,
    FileText,
    Package,
    ArrowDownCircle,
    ArrowUpCircle,
    BrainCircuit,
    ClipboardList,
    Settings
} from 'lucide-react'
import { useEffect, useState } from 'react'
import axios from 'axios'

function SuperAdminSidebar() {

    const user = JSON.parse(
        localStorage.getItem('user')
    )
    const [tenants, setTenants] = useState([])

    const [selectedTenant, setSelectedTenant] =
        useState(
            localStorage.getItem('selectedTenant')
            || 'T001'
        )

    useEffect(() => {

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

    return (

        <div className="w-72 bg-gradient-to-b from-[#4a044e] to-[#701a75] border-r border-gray-200 p-5">

            <div className="mb-12 flex items-center gap-4">

                <div
                    className="
                    w-14 h-14
                    rounded-3xl
                    bg-gradient-to-br
                    from-pink-300
                    to-rose-400
                    flex
                    items-center
                    justify-center
                    shadow-lg
                    shadow-pink-500/20
                    "
                >
                    <HeartPulse
                        size={28}
                        className="text-white"
                    />
                </div>

                <div>

                    <h1
                        className="
                        text-4xl
                        font-black
                        tracking-tight
                        leading-none
                        bg-gradient-to-r
                        from-pink-200
                        via-rose-300
                        to-pink-400
                        bg-clip-text
                        text-transparent
                        "
                    >
                        Velora Med
                    </h1>

                    <p
                        className="
                        text-pink-200/70
                        text-xs
                        tracking-[0.25em]
                        uppercase
                        mt-1
                        "
                    >
                        National Command Center
                    </p>

                </div>

            </div>

            <div className="mb-10">

                <p className="text-pink-200 text-xs uppercase tracking-[0.2em] mb-3">
                    Global Control
                </p>

                <div
                    className="
                    bg-white/10
                    border
                    border-white/10
                    backdrop-blur-md
                    rounded-3xl
                    p-5
                    shadow-lg
                    "
                >

                    <h2 className="text-white font-bold text-lg">
                        {user?.username}
                    </h2>

                    <p className="text-pink-100 text-sm">
                        Super Administrator
                    </p>

                    <select
                        value={selectedTenant}
                        onChange={(e) => {

                            localStorage.setItem(
                                'selectedTenant',
                                e.target.value
                            )

                            setSelectedTenant(
                                e.target.value
                            )

                            window.location.reload()
                        }}
                        className="
    mt-4
    w-full
    bg-white/10
    border
    border-white/10
    rounded-2xl
    px-4
    py-3
    text-pink-100
    text-sm
    "
                    >
                        {
                            tenants.map((tenant) => (

                                <option
                                    key={tenant.tenant_id}
                                    value={tenant.tenant_id}
                                    className="text-black"
                                >
                                    {tenant.nama_rs}
                                </option>

                            ))
                        }
                    </select>

                </div>

            </div>

            <ul className="space-y-4">

                <NavLink
                    to="/super-admin/dashboard"
                    className={({ isActive }) =>
                        isActive
                            ? "bg-gradient-to-r from-pink-600 to-rose-500 text-white p-3 rounded-xl flex items-center gap-3"
                            : "p-3 hover:bg-white/10 text-pink-100 rounded-xl flex items-center gap-3"
                    }
                >
                    <LayoutDashboard size={20} />
                    Dashboard
                </NavLink>

                <NavLink
                    to="/super-admin/tenants"
                    className={({ isActive }) =>
                        isActive
                            ? "bg-gradient-to-r from-pink-600 to-rose-500 text-white p-3 rounded-xl flex items-center gap-3"
                            : "p-3 hover:bg-white/10 text-pink-100 rounded-xl flex items-center gap-3"
                    }
                >
                    <Building2 size={20} />
                    Tenants
                </NavLink>

                <NavLink
                    to="/super-admin/users"
                    className={({ isActive }) =>
                        isActive
                            ? "bg-gradient-to-r from-pink-600 to-rose-500 text-white p-3 rounded-xl flex items-center gap-3"
                            : "p-3 hover:bg-white/10 text-pink-100 rounded-xl flex items-center gap-3"
                    }
                >
                    <Users size={20} />
                    Users
                </NavLink>

                <NavLink
                    to="/super-admin/purchase-orders"
                    className={({ isActive }) =>
                        isActive
                            ? "bg-gradient-to-r from-pink-600 to-rose-500 text-white p-3 rounded-xl flex items-center gap-3"
                            : "p-3 hover:bg-white/10 text-pink-100 rounded-xl flex items-center gap-3"
                    }
                >
                    <FileText size={20} />
                    Purchase Orders
                </NavLink>
                <NavLink
                    to="/super-admin/inventory"
                    className={({ isActive }) =>
                        isActive
                            ? "bg-gradient-to-r from-pink-600 to-rose-500 text-white p-3 rounded-xl flex items-center gap-3"
                            : "p-3 hover:bg-white/10 text-pink-100 rounded-xl flex items-center gap-3"
                    }
                >
                    <Package size={20} />
                    Inventory
                </NavLink>

                <NavLink
                    to="/super-admin/stock-in"
                    className={({ isActive }) =>
                        isActive
                            ? "bg-gradient-to-r from-pink-600 to-rose-500 text-white p-3 rounded-xl flex items-center gap-3"
                            : "p-3 hover:bg-white/10 text-pink-100 rounded-xl flex items-center gap-3"
                    }
                >
                    <ArrowDownCircle size={20} />
                    Stock In
                </NavLink>

                <NavLink
                    to="/super-admin/stock-out"
                    className={({ isActive }) =>
                        isActive
                            ? "bg-gradient-to-r from-pink-600 to-rose-500 text-white p-3 rounded-xl flex items-center gap-3"
                            : "p-3 hover:bg-white/10 text-pink-100 rounded-xl flex items-center gap-3"
                    }
                >
                    <ArrowUpCircle size={20} />
                    Stock Out
                </NavLink>

                <NavLink
                    to="/super-admin/forecast"
                    className={({ isActive }) =>
                        isActive
                            ? "bg-gradient-to-r from-pink-600 to-rose-500 text-white p-3 rounded-xl flex items-center gap-3"
                            : "p-3 hover:bg-white/10 text-pink-100 rounded-xl flex items-center gap-3"
                    }
                >
                    <BrainCircuit size={20} />
                    Forecasting
                </NavLink>

                <NavLink
                    to="/super-admin/reorder"
                    className={({ isActive }) =>
                        isActive
                            ? "bg-gradient-to-r from-pink-600 to-rose-500 text-white p-3 rounded-xl flex items-center gap-3"
                            : "p-3 hover:bg-white/10 text-pink-100 rounded-xl flex items-center gap-3"
                    }
                >
                    <ClipboardList size={20} />
                    Reorder Center
                </NavLink>

                <NavLink
                    to="/super-admin/settings"
                    className={({ isActive }) =>
                        isActive
                            ? "bg-gradient-to-r from-pink-600 to-rose-500 text-white p-3 rounded-xl flex items-center gap-3"
                            : "p-3 hover:bg-white/10 text-pink-100 rounded-xl flex items-center gap-3"
                    }
                >
                    <Settings size={20} />
                    Settings
                </NavLink>

            </ul>

        </div>

    )

}

export default SuperAdminSidebar