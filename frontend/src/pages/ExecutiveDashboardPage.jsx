import { useEffect, useState } from 'react'
import axios from 'axios'

function ExecutiveDashboardPage() {
    const user = JSON.parse(
        localStorage.getItem('user')
    )

    const [stats, setStats] = useState(null)

    useEffect(() => {

        axios.get(
            'https://shimmering-magic-production-6404.up.railway.app/api/executive-dashboard',
            {
                headers: {
                    'X-Tenant-ID': user.tenant_id
                }
            }
        )
            .then((response) => {

                setStats(
                    response.data
                )

            })

    }, [])

    if (!stats) {

        return (
            <div>
                Loading...
            </div>
        )

    }

    return (

        <div className="space-y-8">

            <div>

                <h1 className="text-4xl font-black text-[#4a044e]">
                    Executive Dashboard
                </h1>

                <p className="text-slate-400 mt-2">
                    Executive Healthcare Supply Chain Monitoring
                </p>

            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">

                <div className="bg-red-500 text-white p-6 rounded-3xl">

                    <p>Critical Items</p>

                    <h2 className="text-5xl font-black mt-2">
                        {stats.critical_items}
                    </h2>

                </div>

                <div className="bg-yellow-500 text-white p-6 rounded-3xl">

                    <p>Pending PO</p>

                    <h2 className="text-5xl font-black mt-2">
                        {stats.pending_po}
                    </h2>

                </div>

                <div className="bg-green-600 text-white p-6 rounded-3xl">

                    <p>Approved PO</p>

                    <h2 className="text-5xl font-black mt-2">
                        {stats.approved_po}
                    </h2>

                </div>

                <div className="bg-[#6d214f] text-white p-6 rounded-3xl">

                    <p>Total Procurement</p>

                    <h2 className="text-4xl font-black mt-2">
                        {stats.total_procurement}
                    </h2>

                </div>

            </div>

            <div className="grid grid-cols-2 gap-6">

                <div
                    className="
                    bg-white
                    rounded-3xl
                    p-8
                    border
                    border-pink-100
                "
                >

                    <p className="text-slate-400">
                        Top Supplier
                    </p>

                    <h2 className="text-4xl font-black text-[#4a044e] mt-2">
                        {stats.top_supplier?.vendor_name}
                    </h2>

                    <p className="mt-3 text-slate-500">
                        {stats.top_supplier?.total} Units Supplied
                    </p>

                </div>

                <div
                    className="
                    bg-white
                    rounded-3xl
                    p-8
                    border
                    border-pink-100
                "
                >

                    <p className="text-slate-400">
                        Most Requested Item
                    </p>

                    <h2 className="text-4xl font-black text-[#4a044e] mt-2">
                        {stats.most_requested?.item_name}
                    </h2>

                    <p className="mt-3 text-slate-500">
                        {stats.most_requested?.total} Units Requested
                    </p>

                </div>

            </div>

        </div>

    )

}

export default ExecutiveDashboardPage