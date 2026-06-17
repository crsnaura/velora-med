import { NavLink } from 'react-router-dom'
import { HeartPulse } from 'lucide-react'
import {
    BarChart3,
    TrendingUp,
    FileText
} from 'lucide-react'

function DirectorSidebar() {

    const user = JSON.parse(
        localStorage.getItem('user')
    )
    const tenantId =
        user?.role === 'super_admin'
            ? localStorage.getItem('selectedTenant')
            : user?.tenant_id
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
                        Executive Portal
                    </p>

                </div>

            </div>

            <div className="mb-10">

                <p className="text-pink-200 text-xs uppercase tracking-[0.2em] mb-3">
                    Current Tenant
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

                    <div className="flex items-center gap-4 mb-4">

                        <div
                            className="
                            w-12 h-12
                            rounded-2xl
                            bg-gradient-to-br
                            from-pink-300
                            to-rose-400
                            flex
                            items-center
                            justify-center
                            text-white
                            text-xl
                            shadow-md
                            "
                        >
                            🏥
                        </div>

                        <div>

                            <h2 className="text-white font-bold text-lg leading-tight">
                                {user?.tenant_id}
                            </h2>

                            <p className="text-pink-100 text-sm">
                                Executive Access
                            </p>

                        </div>

                    </div>

                    <div
                        className="
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
                        Tenant ID : {tenantId}
                    </div>

                </div>

            </div>

            <ul className="space-y-4">

                <NavLink
                    to="/director/dashboard"
                    className={({ isActive }) =>
                        isActive
                            ? "bg-gradient-to-r from-pink-600 to-rose-500 text-white p-3 rounded-xl flex items-center gap-3"
                            : "p-3 hover:bg-white/10 text-pink-100 rounded-xl flex items-center gap-3"
                    }
                >
                    <BarChart3 size={20} />
                    Executive Dashboard
                </NavLink>

                <NavLink
                    to="/director/procurement"
                    className={({ isActive }) =>
                        isActive
                            ? "bg-gradient-to-r from-pink-600 to-rose-500 text-white p-3 rounded-xl flex items-center gap-3"
                            : "p-3 hover:bg-white/10 text-pink-100 rounded-xl flex items-center gap-3"
                    }
                >
                    <FileText size={20} />
                    Procurement Analytics
                </NavLink>

                <NavLink
                    to="/director/forecast"
                    className={({ isActive }) =>
                        isActive
                            ? "bg-gradient-to-r from-pink-600 to-rose-500 text-white p-3 rounded-xl flex items-center gap-3"
                            : "p-3 hover:bg-white/10 text-pink-100 rounded-xl flex items-center gap-3"
                    }
                >
                    <TrendingUp size={20} />
                    Forecast Insights
                </NavLink>

            </ul>

        </div>

    )

}

export default DirectorSidebar