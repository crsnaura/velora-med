import axios from 'axios'
import { useEffect, useState } from 'react'
import {
    PieChart,
    Pie,
    Cell,
    ResponsiveContainer,
    Tooltip
} from 'recharts'
function DirectorDashboardPage() {
    const user = JSON.parse(
        localStorage.getItem('user')
    )

    const [stats, setStats] = useState(null)
    const chartData = [
        {
            name: 'Approved',
            value: stats?.approved_po || 0
        },
        {
            name: 'Pending',
            value: stats?.pending_po || 0
        },
        {
            name: 'Critical',
            value: stats?.critical_items || 0
        }
    ]

    const COLORS = [
        '#f72585',
        '#ff8fab',
        '#7209b7'
    ]

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

    }, [])

    return (

        <div className="space-y-8">

            <div>

                <h1
                    className="
                    text-5xl
                    font-black
                    text-[#4a044e]
                    tracking-tight
                    "
                >
                    Executive Dashboard
                </h1>

                <p className="text-[#9f789b] mt-2">
                    Strategic inventory and procurement overview
                </p>

            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4gap-6">

                <div className="bg-gradient-to-br from-[#f72585] to-[#b5179e] p-6 rounded-[30px] text-white shadow-xl">
                    <p>Critical Items</p>
                    <h2 className="text-5xl font-black mt-2">
                        {stats?.critical_items || 0}
                    </h2>
                </div>

                <div className="bg-gradient-to-br from-[#ff8fab] to-[#fb6f92] p-6 rounded-[30px] text-white shadow-xl">
                    <p>Pending PO</p>
                    <h2 className="text-5xl font-black mt-2">
                        {stats?.pending_po || 0}
                    </h2>
                </div>

                <div className="bg-gradient-to-br from-[#c77dff] to-[#9d4edd] p-6 rounded-[30px] text-white shadow-xl">
                    <p>Approved PO</p>
                    <h2 className="text-5xl font-black mt-2">
                        {stats?.approved_po || 0}
                    </h2>
                </div>

                <div className="bg-gradient-to-br from-[#6d214f] to-[#4a044e] p-6 rounded-[30px] text-white shadow-xl">
                    <p>Procurement Volume</p>
                    <h2 className="text-5xl font-black mt-2">
                        {stats?.total_procurement || 0}
                    </h2>
                </div>

            </div>
            <div className="bg-white p-8 rounded-[30px] shadow-xl border border-pink-100">

                <h2 className="text-2xl font-black text-[#4a044e] mb-6">
                    Executive Analytics
                </h2>

                <ResponsiveContainer
                    width="100%"
                    height={350}
                >

                    <PieChart>

                        <Pie
                            data={chartData}
                            cx="50%"
                            cy="50%"
                            outerRadius={120}
                            dataKey="value"
                            label
                        >

                            {
                                chartData.map(
                                    (_, index) => (

                                        <Cell
                                            key={index}
                                            fill={COLORS[index]}
                                        />

                                    )
                                )
                            }

                        </Pie>

                        <Tooltip />

                    </PieChart>

                </ResponsiveContainer>

            </div>
            <div className="bg-gradient-to-br from-[#fff7fa] to-[#f8edff] p-8 rounded-[30px] border border-pink-100 shadow-xl">

                <h3 className="text-2xl font-black text-[#4a044e] mb-4">
                    Executive Recommendation
                </h3>

                <p className="text-lg leading-8 text-[#6d214f]">

                    Based on current inventory conditions,
                    there are

                    <span className="font-black text-[#e84393]">
                        {' '}
                        {stats?.critical_items || 0}
                        {' '}
                        critical items
                    </span>

                    requiring immediate attention.

                    Procurement planning should prioritize

                    <span className="font-black text-[#9d4edd]">
                        {' '}
                        {stats?.most_requested?.item_name || '-'}
                    </span>

                    while maintaining strategic partnerships
                    with

                    <span className="font-black text-[#6d214f]">
                        {' '}
                        {stats?.top_supplier?.vendor_name || '-'}
                    </span>.

                </p>

            </div>

            <div className="grid grid-cols-2 gap-6">

                <div
                    className="
                    bg-white/80
                    backdrop-blur-xl
                    p-8
                    rounded-[30px]
                    border
                    border-pink-100
                    shadow-lg
                    "
                >

                    <h3 className="text-2xl font-black text-[#4a044e] mb-4">
                        Top Supplier
                    </h3>

                    <p className="text-4xl font-black text-[#6d214f]">
                        {
                            stats?.top_supplier?.vendor_name
                            || '-'
                        }
                    </p>

                </div>

                <div
                    className="
                    bg-white/80
                    backdrop-blur-xl
                    p-8
                    rounded-[30px]
                    border
                    border-pink-100
                    shadow-lg
                    "
                >

                    <h3 className="text-2xl font-black text-[#4a044e] mb-4">
                        Most Requested Item
                    </h3>

                    <p className="text-4xl font-black text-[#6d214f]">
                        {
                            stats?.most_requested?.item_name
                            || '-'
                        }
                    </p>

                </div>
                <div className="bg-white/80 backdrop-blur-xl p-8 rounded-[30px] border border-pink-100 shadow-lg">

                    <h3 className="text-2xl font-black text-[#4a044e] mb-4">
                        Executive Insights
                    </h3>

                    <ul className="space-y-3 text-[#6d214f]">

                        <li>
                            • {stats?.critical_items || 0} critical inventory items require immediate attention
                        </li>

                        <li>
                            • {stats?.pending_po || 0} purchase orders are awaiting approval
                        </li>

                        <li>
                            • Top supplier performance is led by {
                                stats?.top_supplier?.vendor_name || '-'
                            }
                        </li>

                    </ul>

                </div>

            </div>

        </div>

    )
}

export default DirectorDashboardPage