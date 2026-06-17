import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import {
    PieChart,
    Pie,
    Cell,
    ResponsiveContainer,
    Tooltip,
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid
} from 'recharts'
import {
    Building2,
    Users,
    FileText,
    CheckCircle,
    Clock3,
    XCircle,
    ArrowRight
} from 'lucide-react'

function SuperAdminDashboardPage() {

    const navigate = useNavigate()

    const [tenants, setTenants] =
        useState([])

    const [users, setUsers] =
        useState([])
    const [purchaseOrders, setPurchaseOrders] = useState([])

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
                'http://127.0.0.1:8000/api/purchase-orders'
            )
            .then((response) => {

                setPurchaseOrders(
                    response.data
                )

            })

    }, [])
    const approvedPO = purchaseOrders.filter(
        (po) =>
            po.status === 'Approved'
    ).length
    const pendingPO = purchaseOrders.filter(
        (po) => po.status === 'Pending'
    ).length

    const rejectedPO = purchaseOrders.filter(
        (po) => po.status === 'Rejected'
    ).length
    const poStatusData = [
        {
            name: 'Approved',
            value: approvedPO
        },
        {
            name: 'Pending',
            value: pendingPO
        },
        {
            name: 'Rejected',
            value: rejectedPO
        }
    ]

    const hospitalData = [
        {
            name: 'T001',
            value: purchaseOrders.filter(
                po => po.tenant_id === 'T001'
            ).length
        },
        {
            name: 'T002',
            value: purchaseOrders.filter(
                po => po.tenant_id === 'T002'
            ).length
        },
        {
            name: 'T003',
            value: purchaseOrders.filter(
                po => po.tenant_id === 'T003'
            ).length
        },
        {
            name: 'T004',
            value: purchaseOrders.filter(
                po => po.tenant_id === 'T004'
            ).length
        }
    ]

    const COLORS = [
        '#f472b6',
        '#c084fc',
        '#6d214f'
    ]
    return (

        <div className="space-y-8">

            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">

                {/* HOSPITAL */}

                <div
                    onClick={() => navigate('/super-admin/tenants')}
                    className="
        cursor-pointer
        bg-gradient-to-br
        from-[#f472b6]
        to-[#db2777]
        p-6
        rounded-[32px]
        text-white
        shadow-xl
        hover:scale-[1.03]
hover:-translate-y-1
hover:shadow-2xl
        transition
        duration-300
        "
                >

                    <div className="flex justify-between items-start">

                        <div>

                            <p className="text-white/80">
                                Total Hospitals
                            </p>

                            <h2 className="text-5xl font-black mt-3">
                                {tenants.length}
                            </h2>
                            <p className="text-white/70 text-sm mt-1">
                                Connected nationwide
                            </p>

                        </div>

                        <Building2 size={40} />

                    </div>

                    <div
                        onClick={() =>
                            navigate('/super-admin/users')
                        }
                        className="
    cursor-pointer
    "
                    >
                        <div className="mt-6 flex items-center justify-between">

                            <span className="text-sm font-medium">
                                View Details
                            </span>

                            <ArrowRight
                                size={18}
                                className="
            transition-transform
            group-hover:translate-x-2
            "
                            />

                        </div>

                    </div>

                </div>

                {/* USERS */}

                <div
                    onClick={() => navigate('/super-admin/users')}
                    className="
        cursor-pointer
        bg-gradient-to-br
        from-[#d8b4fe]
        to-[#9333ea]
        p-6
        rounded-[32px]
        text-white
        shadow-xl
        hover:scale-[1.03]
hover:-translate-y-1
hover:shadow-2xl
        transition
        duration-300
        "
                >

                    <div className="flex justify-between items-start">

                        <div>

                            <p className="text-white/80">
                                Total Users
                            </p>

                            <h2 className="text-5xl font-black mt-3">
                                {users.length}
                            </h2>
                            <p className="text-white/70 text-sm mt-1">
                                Platform operators
                            </p>

                        </div>

                        <Users size={40} />

                    </div>

                    <div
                        onClick={() =>
                            navigate('/super-admin/users')
                        }
                        className="
    cursor-pointer
    "
                    >

                        <div className="mt-6 flex items-center justify-between">

                            <span className="text-sm font-medium">
                                View Details
                            </span>

                            <ArrowRight
                                size={18}
                                className="
            transition-transform
            group-hover:translate-x-2
            "
                            />

                        </div>

                    </div>

                </div>

                {/* PO */}

                <div
                    onClick={() =>
                        navigate('/super-admin/purchase-orders')
                    }
                    className="
        cursor-pointer
        bg-gradient-to-br
        from-[#7c2d6a]
        to-[#4a044e]
        p-6
        rounded-[32px]
        text-white
        shadow-xl
        hover:scale-[1.03]
hover:-translate-y-1
hover:shadow-2xl
        transition
        duration-300
        "
                >

                    <div className="flex justify-between items-start">

                        <div>

                            <p className="text-white/80">
                                Total Purchase Orders
                            </p>

                            <h2 className="text-5xl font-black mt-3">
                                {purchaseOrders.length}
                            </h2>
                            <p className="text-white/70 text-sm mt-1">
                                Procurement requests
                            </p>

                        </div>

                        <FileText size={40} />

                    </div>

                    <div
                        onClick={() =>
                            navigate('/super-admin/users')
                        }
                        className="
    cursor-pointer
    "
                    >

                        <div className="mt-6 flex items-center justify-between">

                            <span className="text-sm font-medium">
                                View Details
                            </span>

                            <ArrowRight
                                size={18}
                                className="
            transition-transform
            group-hover:translate-x-2
            "
                            />

                        </div>

                    </div>

                </div>

                {/* APPROVED */}

                <div
                    onClick={() =>
                        navigate('/super-admin/purchase-orders')
                    }
                    className="
        cursor-pointer
        bg-gradient-to-br
        from-[#ec4899]
        to-[#be185d]
        p-6
        rounded-[32px]
        text-white
        shadow-xl
        hover:scale-[1.03]
hover:-translate-y-1
hover:shadow-2xl
        transition
        duration-300
        "
                >

                    <div className="flex justify-between items-start">

                        <div>

                            <p className="text-white/80">
                                Approved PO
                            </p>

                            <h2 className="text-5xl font-black mt-3">
                                {approvedPO}
                            </h2>
                            <p className="text-white/70 text-sm mt-1">
                                Successfully approved
                            </p>

                        </div>

                        <CheckCircle size={40} />

                    </div>

                    <div
                        onClick={() =>
                            navigate('/super-admin/users')
                        }
                        className="
    cursor-pointer
    "
                    >

                        <div className="mt-6 flex items-center justify-between">

                            <span className="text-sm font-medium">
                                View Details
                            </span>

                            <ArrowRight
                                size={18}
                                className="
            transition-transform
            group-hover:translate-x-2
            "
                            />

                        </div>

                    </div>
                </div>

            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">

                {/* PENDING */}

                <div
                    className="
        bg-gradient-to-br
        from-[#fb7185]
        to-[#e11d48]
        p-6
        rounded-[32px]
        text-white
        shadow-xl
        hover:scale-[1.03]
hover:-translate-y-1
hover:shadow-2xl
        transition
        "
                >

                    <div className="flex justify-between">

                        <div>

                            <p>Pending PO</p>

                            <h2 className="text-5xl font-black mt-3">
                                {pendingPO}
                            </h2>

                        </div>

                        <Clock3 size={40} />

                    </div>

                </div>

                {/* REJECTED */}

                <div
                    className="
        bg-gradient-to-br
        from-[#831843]
        to-[#4a044e]
        p-6
        rounded-[32px]
        text-white
        shadow-xl
        hover:scale-[1.03]
hover:-translate-y-1
hover:shadow-2xl
        transition
        "
                >

                    <div className="flex justify-between">

                        <div>

                            <p>Rejected PO</p>

                            <h2 className="text-5xl font-black mt-3">
                                {rejectedPO}
                            </h2>

                        </div>

                        <XCircle size={40} />

                    </div>

                </div>

                {/* RATE */}

                <div
                    className="
        bg-gradient-to-br
        from-[#c084fc]
        to-[#9333ea]
        p-6
        rounded-[32px]
        text-white
        shadow-xl
        hover:scale-[1.03]
hover:-translate-y-1
hover:shadow-2xl
        transition
        "
                >

                    <p>Approval Rate</p>

                    <h2 className="text-5xl font-black mt-3">

                        {
                            purchaseOrders.length > 0
                                ? Math.round(
                                    approvedPO /
                                    purchaseOrders.length *
                                    100
                                )
                                : 0
                        }%

                    </h2>

                    <div className="mt-4">

                        <div className="h-2 bg-white/20 rounded-full">

                            <div
                                className="h-2 bg-white rounded-full"
                                style={{
                                    width: `${purchaseOrders.length > 0
                                        ? Math.round(
                                            approvedPO /
                                            purchaseOrders.length *
                                            100
                                        )
                                        : 0
                                        }%`
                                }}
                            />

                        </div>

                    </div>

                </div>

            </div>
            <div className="grid grid-cols-2 gap-6">

                {/* PO STATUS */}

                <div
                    className="
    bg-gradient-to-br
    from-white
    to-pink-50
    p-8
    rounded-[30px]
    shadow-lg
    border
    border-pink-100
    "
                >

                    <h2 className="text-2xl font-black text-[#4a044e] mb-6">
                        Purchase Order Status
                    </h2>
                    <div className="space-y-8 mt-8">

                        <div>

                            <div className="flex justify-between mb-2">

                                <span className="font-semibold text-green-600">
                                    Approved
                                </span>

                                <span className="font-bold">
                                    {approvedPO}
                                </span>

                            </div>

                            <div className="h-4 bg-pink-100 rounded-full">

                                <div
                                    className="
                h-4
                rounded-full
                bg-gradient-to-r
                from-pink-500
                to-fuchsia-600
                "
                                    style={{
                                        width: `${Math.round(
                                            approvedPO /
                                            purchaseOrders.length *
                                            100
                                        )}%`
                                    }}
                                />

                            </div>

                        </div>

                        <div>

                            <div className="flex justify-between mb-2">

                                <span className="font-semibold text-orange-500">
                                    Pending
                                </span>

                                <span className="font-bold">
                                    {pendingPO}
                                </span>

                            </div>

                            <div className="h-4 bg-pink-100 rounded-full">

                                <div
                                    className="
                h-4
                rounded-full
                bg-gradient-to-r
                from-rose-400
                to-pink-500
                "
                                    style={{
                                        width: `${Math.round(
                                            pendingPO /
                                            purchaseOrders.length *
                                            100
                                        )}%`
                                    }}
                                />

                            </div>

                        </div>

                        <div>

                            <div className="flex justify-between mb-2">

                                <span className="font-semibold text-[#6d214f]">
                                    Rejected
                                </span>

                                <span className="font-bold">
                                    {rejectedPO}
                                </span>

                            </div>

                            <div className="h-4 bg-pink-100 rounded-full">

                                <div
                                    className="
                h-4
                rounded-full
                bg-gradient-to-r
                from-[#6d214f]
                to-[#4a044e]
                "
                                    style={{
                                        width: `${Math.round(
                                            rejectedPO /
                                            purchaseOrders.length *
                                            100
                                        )}%`
                                    }}
                                />

                            </div>

                        </div>

                    </div>
                    <div className="mt-8">

                        <div
                            className="
        bg-gradient-to-r
        from-pink-50
        to-purple-50
        rounded-2xl
        p-4
        "
                        >

                            <p className="text-[#6d214f]">

                                <span className="font-bold">
                                    Approval Rate:
                                </span>

                                {' '}
                                {
                                    Math.round(
                                        approvedPO /
                                        purchaseOrders.length *
                                        100
                                    )
                                }%

                                {' '}of procurement requests
                                successfully approved.

                            </p>

                        </div>

                    </div>

                </div>


                {/* HOSPITAL ACTIVITY */}

                <div
                    className="
    bg-gradient-to-br
    from-white
    to-pink-50
    p-8
    rounded-[30px]
    shadow-lg
    border
    border-pink-100
    "
                >

                    <h2 className="text-2xl font-black text-[#4a044e] mb-6">
                        National Performance Ranking
                    </h2>

                    <div className="space-y-5">

                        <div
                            className="
        flex
        items-center
        justify-between
        bg-gradient-to-r
        from-yellow-50
        to-yellow-100
        p-4
        rounded-2xl
        "
                        >

                            <div>

                                <p className="font-black text-xl">
                                    🥇 RSUD Dr Soetomo
                                </p>

                                <p className="text-sm text-slate-500">
                                    Highest procurement efficiency
                                </p>

                            </div>

                            <span
                                className="
            text-3xl
            font-black
            text-yellow-600
            "
                            >
                                97%
                            </span>

                        </div>

                        <div
                            className="
        flex
        items-center
        justify-between
        bg-gradient-to-r
        from-slate-50
        to-slate-100
        p-4
        rounded-2xl
        "
                        >

                            <div>

                                <p className="font-black text-xl">
                                    🥈 RSUD Mohamad Soewandhie
                                </p>

                                <p className="text-sm text-slate-500">
                                    Strong procurement performance
                                </p>

                            </div>

                            <span
                                className="
            text-3xl
            font-black
            text-slate-600
            "
                            >
                                94%
                            </span>

                        </div>

                        <div
                            className="
        flex
        items-center
        justify-between
        bg-gradient-to-r
        from-orange-50
        to-orange-100
        p-4
        rounded-2xl
        "
                        >

                            <div>

                                <p className="font-black text-xl">
                                    🥉 RSUD Bhakti Dharma Husada
                                </p>

                                <p className="text-sm text-slate-500">
                                    Stable operational activity
                                </p>

                            </div>

                            <span
                                className="
            text-3xl
            font-black
            text-orange-600
            "
                            >
                                92%
                            </span>

                        </div>

                    </div>
                    <div
                        className="
    mt-6
    bg-red-50
    border
    border-red-100
    rounded-2xl
    p-4
    "
                    >

                        <h3
                            className="
        font-bold
        text-red-600
        mb-2
        "
                        >
                            Attention Required
                        </h3>

                        <p>
                            RSUD Eka Candrarini has
                            32 pending purchase orders
                            requiring immediate review.
                        </p>

                    </div>
                </div>

            </div>
            <div className="grid grid-cols-2 gap-6">
                <div
                    className="
    bg-gradient-to-br
    from-[#fff7fb]
    to-[#fde7f3]
    rounded-[32px]
    p-8
    col-span-2
    border
    border-pink-100
    shadow-lg
    "
                >

                    <div className="flex items-center justify-between mb-6">

                        <h2 className="text-2xl font-black text-[#4a044e]">
                            Alert Center
                        </h2>

                        <span
                            className="
            bg-red-100
            text-red-600
            px-4
            py-2
            rounded-full
            text-sm
            font-bold
            "
                        >
                            Live Monitoring
                        </span>

                    </div>

                    <div className="grid grid-cols-2 gap-4">

                        {/* ALERT 1 */}

                        <div
                            className="
            bg-red-50
            border
            border-red-200
            rounded-2xl
            p-5
            flex
            items-center
            gap-4
            "
                        >

                            <div className="text-3xl">
                                🚨
                            </div>

                            <div>

                                <p className="font-bold text-red-700">
                                    Critical Procurement Queue
                                </p>

                                <p className="text-slate-600">
                                    {pendingPO} purchase orders
                                    are still waiting for review.
                                </p>

                            </div>

                        </div>

                        {/* ALERT 2 */}

                        <div
                            className="
            bg-amber-50
            border
            border-amber-200
            rounded-2xl
            p-5
            flex
            items-center
            gap-4
            "
                        >

                            <div className="text-3xl">
                                ⚠️
                            </div>

                            <div>

                                <p className="font-bold text-amber-700">
                                    Inventory Monitoring Required
                                </p>

                                <p className="text-slate-600">
                                    Multiple hospitals have
                                    inventory levels approaching
                                    reorder thresholds.
                                </p>

                            </div>

                        </div>

                        {/* ALERT 3 */}

                        <div
                            className="
            bg-blue-50
            border
            border-blue-200
            rounded-2xl
            p-5
            flex
            items-center
            gap-4
            "
                        >

                            <div className="text-3xl">
                                🏆
                            </div>

                            <div>

                                <p className="font-bold text-blue-700">
                                    Top Performing Hospital
                                </p>

                                <p className="text-slate-600">
                                    RSUD Dr. Soetomo achieved
                                    the highest procurement
                                    efficiency this month.
                                </p>

                            </div>

                        </div>

                        {/* ALERT 4 */}

                        <div
                            className="
            bg-green-50
            border
            border-green-200
            rounded-2xl
            p-5
            flex
            items-center
            gap-4
            "
                        >

                            <div className="text-3xl">
                                ✅
                            </div>

                            <div>

                                <p className="font-bold text-green-700">
                                    Platform Status Healthy
                                </p>

                                <p className="text-slate-600">
                                    {tenants.length} hospitals
                                    are connected and actively
                                    operating on Velora Med.
                                </p>

                            </div>

                        </div>

                    </div>

                </div>
            </div>

            <div
                className="
    mt-6
    bg-gradient-to-r
    from-[#4a044e]
    to-[#86198f]
    rounded-3xl
    p-8
    text-white
    "
            >

                <h2 className="text-2xl font-black mb-4">
                    Platform Impact
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">

                    <div>

                        <p className="text-5xl font-black">
                            98%
                        </p>

                        <p className="opacity-80">
                            Procurement Visibility
                        </p>

                    </div>

                    <div>

                        <p className="text-5xl font-black">
                            24/7
                        </p>

                        <p className="opacity-80">
                            Monitoring Availability
                        </p>

                    </div>

                    <div>

                        <p className="text-5xl font-black">
                            AI
                        </p>

                        <p className="opacity-80">
                            Demand Forecasting Enabled
                        </p>

                    </div>

                </div>

            </div>
        </div>

    )
}

export default SuperAdminDashboardPage