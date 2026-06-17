import { useEffect, useState } from 'react'
import axios from 'axios'
import {
    PieChart,
    Pie,
    Cell
} from 'recharts'
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer
} from 'recharts'
function ProcurementAnalyticsPage() {

    const [stats, setStats] = useState(null)

    const user = JSON.parse(
        localStorage.getItem('user')
    )

    useEffect(() => {

        axios.get(
            'https://shimmering-magic-production-6404.up.railway.app/api/executive-dashboard',
            {
                headers: {
                    'x-tenant-id':
                        user.tenant_id
                }
            }
        )
            .then((response) => {

                setStats(
                    response.data
                )

            })
            .catch((error) => {

                console.error(error)

            })

    }, [])

    const procurementStatusData = [
        {
            name: 'Approved',
            value: stats?.approved_po || 0
        },
        {
            name: 'Pending',
            value: stats?.pending_po || 0
        },
        {
            name: 'Rejected',
            value: stats?.rejected_po || 0
        }
    ]

    const supplierData = [
        {
            supplier: 'Kimia Farma',
            score: 95
        },
        {
            supplier: 'Kalbe',
            score: 88
        },
        {
            supplier: 'Dexa',
            score: 84
        },
        {
            supplier: 'Indofarma',
            score: 80
        }
    ]

    const COLORS = [
        '#e84393',
        '#9d4edd',
        '#ff6b6b'
    ]

    return (

        <div className="space-y-6">

            <h1 className="text-4xl font-black text-[#4a044e]">
                Procurement Analytics
            </h1>

            <p className="text-slate-500">
                Procurement performance overview
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">

                <div className="bg-[#FFF8DB] p-6 rounded-3xl">

                    <h3 className="text-slate-500">
                        Pending PO
                    </h3>

                    <p className="text-5xl font-black text-amber-600">
                        {stats?.pending_po || 0}
                    </p>

                </div>

                <div className="bg-[#DCFCE7] p-6 rounded-3xl">

                    <h3 className="text-slate-500">
                        Approved PO
                    </h3>

                    <p className="text-5xl font-black text-green-600">
                        {stats?.approved_po || 0}
                    </p>

                </div>

                <div className="bg-[#DBEAFE] p-6 rounded-3xl">

                    <h3 className="text-slate-500">
                        Procurement Volume
                    </h3>

                    <p className="text-5xl font-black text-blue-600">
                        {stats?.total_procurement || 0}
                    </p>

                </div>

            </div>

            <div className="grid grid-cols-2 gap-6">

                {/* PROCUREMENT STATUS */}

                <div
                    className="
        bg-white/80
        backdrop-blur-xl
        p-6
        rounded-[30px]
        border
        border-pink-100
        shadow-lg
        "
                >

                    <h2
                        className="
            text-2xl
            font-black
            text-[#4a044e]
            mb-4
            "
                    >
                        Procurement Status
                    </h2>

                    <ResponsiveContainer
                        width="100%"
                        height={260}
                    >

                        <PieChart>

                            <Pie
                                data={procurementStatusData}
                                dataKey="value"
                                outerRadius={90}
                                label
                            >

                                {
                                    procurementStatusData.map(
                                        (_, index) => (

                                            <Cell
                                                key={index}
                                                fill={
                                                    [
                                                        '#e84393',
                                                        '#9d4edd',
                                                        '#ff6b6b'
                                                    ][index]
                                                }
                                            />

                                        )
                                    )
                                }

                            </Pie>

                            <Tooltip />

                        </PieChart>

                    </ResponsiveContainer>

                </div>

                {/* SUPPLIER PERFORMANCE */}

                <div
                    className="
        bg-white/80
        backdrop-blur-xl
        p-6
        rounded-[30px]
        border
        border-pink-100
        shadow-lg
        "
                >

                    <h2
                        className="
            text-2xl
            font-black
            text-[#4a044e]
            mb-4
            "
                    >
                        Supplier Performance
                    </h2>

                    <ResponsiveContainer
                        width="100%"
                        height={260}
                    >

                        <BarChart
                            data={supplierData}
                        >

                            <CartesianGrid
                                strokeDasharray="3 3"
                            />

                            <XAxis
                                dataKey="supplier"
                            />

                            <YAxis />

                            <Tooltip />

                            <Bar
                                dataKey="score"
                                fill="#9d4edd"
                                radius={[10, 10, 0, 0]}
                            />

                        </BarChart>

                    </ResponsiveContainer>

                </div>

            </div>
            <div className="grid grid-cols-2 gap-6">

                <div className="bg-white p-6 rounded-3xl">

                    <h3 className="font-bold text-lg mb-4">
                        Top Supplier
                    </h3>

                    <p className="text-3xl font-black text-[#6d214f]">
                        {
                            stats?.top_supplier?.vendor_name
                            || '-'
                        }
                    </p>

                    <p className="text-slate-500 mt-2">
                        Total Supply:
                        {' '}
                        {
                            stats?.top_supplier?.total
                            || 0
                        }
                    </p>

                </div>

                <div className="bg-white p-6 rounded-3xl">

                    <h3 className="font-bold text-lg mb-4">
                        Most Requested Item
                    </h3>

                    <p className="text-3xl font-black text-[#6d214f]">
                        {
                            stats?.most_requested?.item_name
                            || '-'
                        }
                    </p>

                    <p className="text-slate-500 mt-2">
                        Total Usage:
                        {' '}
                        {
                            stats?.most_requested?.total
                            || 0
                        }
                    </p>

                </div>

            </div>

            <div className="
bg-white
p-8
rounded-3xl
shadow-lg
border
border-pink-100
">

                <h2 className="
  text-2xl
  font-black
  text-[#4a044e]
  mb-4
  ">
                    Procurement Insight
                </h2>

                <ul className="
  space-y-3
  text-[#6d214f]
  ">

                    <li>
                        • Total procurement volume mencapai {stats?.total_procurement || 0}
                    </li>

                    <li>
                        • Supplier terbaik saat ini adalah {
                            stats?.top_supplier?.vendor_name || '-'
                        }
                    </li>

                    <li>
                        • Item paling banyak digunakan adalah {
                            stats?.most_requested?.item_name || '-'
                        }
                    </li>

                    <li>
                        • {stats?.pending_po || 0} purchase order masih menunggu persetujuan
                    </li>

                </ul>

            </div>

            <div className="
bg-gradient-to-br
from-[#fff0f6]
to-[#f8edff]
p-8
rounded-3xl
shadow-lg
border
border-pink-100
">

                <h2 className="
  text-2xl
  font-black
  text-[#4a044e]
  mb-4
  ">
                    Strategic Recommendation
                </h2>

                <p className="
  text-lg
  leading-8
  text-[#6d214f]
  ">

                    Procurement activity is currently stable.
                    Focus should be placed on reducing pending
                    purchase orders and maintaining supplier
                    reliability.

                    Demand trends indicate continued growth for

                    <span className="font-black text-[#e84393]">
                        {' '}
                        {stats?.most_requested?.item_name || '-'}
                    </span>

                    , therefore additional procurement planning
                    is recommended to avoid future stock shortages.

                </p>

            </div>

        </div>

    )

}

export default ProcurementAnalyticsPage