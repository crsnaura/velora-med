import { useEffect, useState } from 'react'
import axios from 'axios'
import {
    ResponsiveContainer,
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend
} from 'recharts'
function ForecastInsightsPage() {

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

    const riskLevel =
        stats?.critical_items > 20
            ? 'HIGH'
            : stats?.critical_items > 10
                ? 'MEDIUM'
                : 'LOW'
    const forecastData = [
        {
            item: 'Paracetamol',
            current: 120,
            forecast: 150
        },
        {
            item: 'Amoxicillin',
            current: 90,
            forecast: 110
        },
        {
            item: 'Vitamin C',
            current: 140,
            forecast: 180
        },
        {
            item: 'Insulin',
            current: 80,
            forecast: 95
        },
        {
            item: 'Ceftriaxone',
            current: 100,
            forecast: 130
        }
    ]
    return (

        <div className="space-y-6">

            <h1 className="text-4xl font-black text-[#4a044e]">
                Forecast Insights
            </h1>

            <p className="text-slate-500">
                AI-driven forecasting and demand risk analysis
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4gap-6">

                <div className="bg-[#FFE5EC] p-6 rounded-3xl">

                    <h3 className="text-slate-500">
                        Critical Items
                    </h3>

                    <p className="text-5xl font-black text-rose-600">
                        {stats?.critical_items || 0}
                    </p>

                </div>

                <div className="bg-[#DBEAFE] p-6 rounded-3xl">

                    <h3 className="text-slate-500">
                        Forecast Risk
                    </h3>

                    <p className="text-4xl font-black text-blue-600">
                        {riskLevel}
                    </p>

                </div>

                <div className="bg-[#FFF8DB] p-6 rounded-3xl">

                    <h3 className="text-slate-500">
                        Most Requested
                    </h3>

                    <p className="text-2xl font-black text-amber-600">
                        {
                            stats?.most_requested?.item_name
                            || '-'
                        }
                    </p>

                </div>

                <div className="bg-[#DCFCE7] p-6 rounded-3xl">

                    <h3 className="text-slate-500">
                        Reorder Action
                    </h3>

                    <p className="text-2xl font-black text-green-600">
                        {
                            stats?.critical_items > 0
                                ? 'Required'
                                : 'Stable'
                        }
                    </p>

                </div>

            </div>

            <div className="
bg-white
p-8
rounded-[30px]
shadow-xl
border
border-pink-100
">

                <h2 className="
    text-2xl
    font-black
    text-[#4a044e]
    mb-6
    ">
                    Demand Forecast Trend
                </h2>

                <ResponsiveContainer
                    width="100%"
                    height={400}
                >

                    <LineChart data={forecastData}>

                        <CartesianGrid strokeDasharray="3 3" />

                        <XAxis dataKey="item" />

                        <YAxis />

                        <Tooltip />

                        <Legend />

                        <Line
                            type="monotone"
                            dataKey="current"
                            stroke="#e84393"
                            strokeWidth={4}
                        />

                        <Line
                            type="monotone"
                            dataKey="forecast"
                            stroke="#7b2cbf"
                            strokeWidth={4}
                        />

                    </LineChart>

                </ResponsiveContainer>

            </div>

            <div
                className="
bg-gradient-to-br
from-[#fff0f6]
to-[#f8edff]
p-8
rounded-[30px]
border
border-pink-100
shadow-xl
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
                    AI Recommendation
                </h2>

                <p
                    className="
text-lg
leading-8
text-[#6d214f]
"
                >

                    Demand forecast indicates increasing
                    usage of

                    <span className="font-black text-[#e84393]">
                        Vitamin C
                    </span>

                    and

                    <span className="font-black text-[#7b2cbf]">
                        Paracetamol
                    </span>.

                    Additional procurement is recommended
                    to prevent future stock shortages.

                    Current forecast risk remains

                    <span className="font-black text-green-600">
                        LOW
                    </span>.

                </p>

            </div>

            <div className="bg-white p-8 rounded-3xl">

                <h2 className="text-2xl font-black text-[#4a044e] mb-4">
                    Executive Recommendation
                </h2>

                <p className="text-slate-600 leading-relaxed">

                    Based on current inventory conditions,
                    there are

                    <span className="font-bold text-rose-600">
                        {' '}
                        {stats?.critical_items || 0}
                        {' '}
                        critical items
                    </span>

                    {' '}requiring attention.

                    The most requested item is

                    <span className="font-bold text-[#6d214f]">
                        {' '}
                        {
                            stats?.most_requested?.item_name
                            || '-'
                        }
                    </span>

                    .

                    Procurement planning should prioritize
                    high-demand items to reduce stockout risk.

                </p>

            </div>

        </div>

    )

}

export default ForecastInsightsPage