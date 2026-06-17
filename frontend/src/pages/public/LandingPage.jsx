import { Link } from 'react-router-dom'
import { useState, useEffect } from 'react'
import axios from 'axios'

function LandingPage() {
    const [showDemo, setShowDemo] =
        useState(false)

    const [stats, setStats] = useState(null)
    useEffect(() => {

        axios
            .get(
                'https://shimmering-magic-production-6404.up.railway.app/api/dashboard/landing-stats'
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

    return (
        <div
            className="
    min-h-screen
    bg-gradient-to-br
    from-[#EDE9FE]
    via-[#FCE7F3]
    to-[#DBEAFE]
    "
        >


            {/* NAVBAR */}

            <nav className="relative z-10 flex justify-between items-center px-12 py-8">

                <div>

                    <h1 className="text-4xl font-black text-[#312E81]">
                        Velora Med
                    </h1>

                    <p className="text-slate-500">
                        AI Healthcare Analytics
                    </p>

                </div>

                <Link
                    to="/login"
                    className="
                px-6
                py-3
                rounded-2xl
                bg-[#8B5CF6]
                text-white
                font-bold
                hover:scale-105
                transition-all
                "
                >
                    Login
                </Link>

            </nav>

            {/* HERO */}

            <section className="relative z-10 px-12 py-20">

                <div className="grid grid-cols-2 gap-20 items-center">

                    <div>

                        <span
                            className="
                        inline-block
                        px-4
                        py-2
                        rounded-full
                        bg-pink-100
                        text-pink-700
                        text-sm
                        font-semibold
                        "
                        >
                            AI-Powered Healthcare Analytics
                        </span>

                        <h1
                            className="
                        mt-8
                        text-7xl
                        font-black
                        text-[#312E81]
                        leading-[1.05]
                        "
                        >
                            Predict Demand.
                            <br />
                            Prevent Stockouts.
                            <br />
                            Optimize Supply Chains.
                        </h1>

                        <p
                            className="
                        mt-8
                        text-xl
                        text-slate-600
                        leading-relaxed
                        "
                        >
                            Velora Med membantu rumah sakit mengelola inventory,
                            memprediksi kebutuhan obat dan alat kesehatan,
                            serta mengoptimalkan pengadaan melalui AI Forecasting.
                        </p>

                        <div className="flex gap-4 mt-10">

                            <Link
                                to="/login"
                                className="
                            px-8
                            py-4
                            rounded-2xl
                            bg-[#8B5CF6]
                            text-white
                            font-bold
                            hover:scale-105
                            transition-all
                            "
                            >
                                Get Started
                            </Link>

                            <button
                                onClick={() => setShowDemo(true)}
                                className="
  border
  border-purple-300
  px-8
  py-4
  rounded-2xl
  font-bold
  text-[#4a044e]
  hover:bg-white
  transition-all
  "
                            >
                                Watch Demo
                            </button>

                        </div>

                    </div>

                    {/* LIVE OVERVIEW */}

                    <div
                        className="
                    bg-white/80
                    backdrop-blur-xl
                    border
                    border-white
                    shadow-xl
                    rounded-[40px]
                    p-8
                    "
                    >

                        <p className="text-slate-500 mb-6">
                            Live Healthcare Overview
                        </p>

                        <div className="grid grid-cols-2 gap-4">

                            <div className="bg-pink-50 p-6 rounded-3xl">
                                <p className="text-slate-500">Hospitals</p>
                                <h2 className="text-4xl font-black text-pink-600">
                                    {stats?.total_hospitals || 0}
                                </h2>
                            </div>

                            <div className="bg-blue-50 p-6 rounded-3xl">
                                <p className="text-slate-500">Inventory</p>
                                <h2 className="text-4xl font-black text-blue-600">
                                    {stats?.total_inventory || 0}
                                </h2>
                            </div>

                            <div className="bg-rose-50 p-6 rounded-3xl">
                                <p className="text-slate-500">Critical Items</p>
                                <h2 className="text-4xl font-black text-rose-600">
                                    {stats?.critical_items || 0}
                                </h2>
                            </div>

                            <div className="bg-violet-50 p-6 rounded-3xl">
                                <p className="text-slate-500">Purchase Orders</p>
                                <h2 className="text-4xl font-black text-violet-600">
                                    {stats?.total_po || 0}
                                </h2>
                            </div>

                        </div>

                    </div>

                </div>

            </section>

            {/* WHY */}

            <section className="px-12 py-24">

                <div className="text-center mb-16">

                    <h2 className="text-5xl font-black text-[#312E81]">
                        Why Velora Med
                    </h2>

                    <p className="mt-4 text-slate-500 text-xl">
                        Designed for modern healthcare supply chain management
                    </p>

                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">

                    <div className="bg-pink-50 rounded-[32px] p-8 shadow-lg">
                        <div className="text-5xl mb-6">📦</div>
                        <h3 className="text-2xl font-black text-[#312E81]">
                            Inventory Monitoring
                        </h3>
                        <p className="mt-4 text-slate-600">
                            Track inventory in real time across facilities.
                        </p>
                    </div>

                    <div className="bg-blue-50 rounded-[32px] p-8 shadow-lg">
                        <div className="text-5xl mb-6">🧠</div>
                        <h3 className="text-2xl font-black text-[#312E81]">
                            AI Demand Forecasting
                        </h3>
                        <p className="mt-4 text-slate-600">
                            Predict future healthcare demand accurately.
                        </p>
                    </div>

                    <div className="bg-violet-50 rounded-[32px] p-8 shadow-lg">
                        <div className="text-5xl mb-6">🚨</div>
                        <h3 className="text-2xl font-black text-[#312E81]">
                            Critical Stock Alerts
                        </h3>
                        <p className="mt-4 text-slate-600">
                            Detect high-risk inventory before shortages happen.
                        </p>
                    </div>

                </div>

            </section>
            <section className="px-12 py-24">

                <div className="text-center mb-16">

                    <h2
                        className="
            text-6xl
            font-black
            text-[#3730A3]
            "
                    >
                        How Velora Works
                    </h2>

                    <p
                        className="
            mt-4
            text-xl
            text-slate-600
            "
                    >
                        AI-powered procurement workflow
                    </p>

                </div>

                <div
                    className="
        grid
        md:grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4
        gap-8
        "
                >

                    <div
                        className="
            bg-white/70
            backdrop-blur-md
            rounded-3xl
            p-8
            shadow-lg
            "
                    >

                        <div
                            className="
                w-14 h-14
                rounded-2xl
                bg-pink-100
                flex
                items-center
                justify-center
                text-2xl
                mb-6
                "
                        >
                            📦
                        </div>

                        <h3 className="font-black text-2xl text-[#3730A3]">
                            Collect Data
                        </h3>

                        <p className="mt-3 text-slate-600">
                            Inventory, stock movement,
                            suppliers, and hospital demand.
                        </p>

                    </div>

                    <div
                        className="
            bg-white/70
            backdrop-blur-md
            rounded-3xl
            p-8
            shadow-lg
            "
                    >

                        <div
                            className="
                w-14 h-14
                rounded-2xl
                bg-blue-100
                flex
                items-center
                justify-center
                text-2xl
                mb-6
                "
                        >
                            🧠
                        </div>

                        <h3 className="font-black text-2xl text-[#3730A3]">
                            AI Forecasting
                        </h3>

                        <p className="mt-3 text-slate-600">
                            Predict future medicine and
                            medical equipment demand.
                        </p>

                    </div>

                    <div
                        className="
            bg-white/70
            backdrop-blur-md
            rounded-3xl
            p-8
            shadow-lg
            "
                    >

                        <div
                            className="
                w-14 h-14
                rounded-2xl
                bg-yellow-100
                flex
                items-center
                justify-center
                text-2xl
                mb-6
                "
                        >
                            🚨
                        </div>

                        <h3 className="font-black text-2xl text-[#3730A3]">
                            Risk Detection
                        </h3>

                        <p className="mt-3 text-slate-600">
                            Detect stockout risks before
                            shortages happen.
                        </p>

                    </div>

                    <div
                        className="
            bg-white/70
            backdrop-blur-md
            rounded-3xl
            p-8
            shadow-lg
            "
                    >

                        <div
                            className="
                w-14 h-14
                rounded-2xl
                bg-green-100
                flex
                items-center
                justify-center
                text-2xl
                mb-6
                "
                        >
                            📝
                        </div>

                        <h3 className="font-black text-2xl text-[#3730A3]">
                            Generate PO
                        </h3>

                        <p className="mt-3 text-slate-600">
                            Create purchase orders with
                            AI-powered recommendations.
                        </p>

                    </div>

                </div>

            </section>
            <section
                className="
  bg-white/70
  backdrop-blur-xl
  rounded-[40px]
  p-10
  shadow-xl
  border
  border-pink-100
  "
            >

                <h2
                    className="
    text-5xl
    font-black
    text-center
    text-[#312e81]
    mb-3
    "
                >
                    Director Dashboard Preview
                </h2>

                <p
                    className="
    text-center
    text-slate-500
    mb-10
    "
                >
                    Executive visibility across inventory,
                    procurement and AI forecasting
                </p>

                <div className="grid grid-cols-4 gap-6">

                    <div
                        className="
      bg-gradient-to-br
      from-pink-500
      to-pink-400
      text-white
      p-6
      rounded-3xl
      "
                    >
                        <p className="text-sm opacity-80">
                            Inventory Health
                        </p>

                        <h3 className="text-4xl font-black">
                            92%
                        </h3>
                    </div>

                    <div
                        className="
      bg-gradient-to-br
      from-violet-600
      to-purple-500
      text-white
      p-6
      rounded-3xl
      "
                    >
                        <p className="text-sm opacity-80">
                            Forecast Accuracy
                        </p>

                        <h3 className="text-4xl font-black">
                            94%
                        </h3>
                    </div>

                    <div
                        className="
      bg-gradient-to-br
      from-emerald-500
      to-green-400
      text-white
      p-6
      rounded-3xl
      "
                    >
                        <p className="text-sm opacity-80">
                            Approved PO
                        </p>

                        <h3 className="text-4xl font-black">
                            320
                        </h3>
                    </div>

                    <div
                        className="
      bg-gradient-to-br
      from-amber-500
      to-orange-400
      text-white
      p-6
      rounded-3xl
      "
                    >
                        <p className="text-sm opacity-80">
                            Critical Items
                        </p>

                        <h3 className="text-4xl font-black">
                            11
                        </h3>
                    </div>

                </div>

                <div className="grid grid-cols-2 gap-6 mt-8">

                    <div
                        className="
      bg-gradient-to-r
      from-[#fff7fb]
      to-[#f3e8ff]
      rounded-3xl
      p-6
      "
                    >

                        <h3 className="font-black text-[#4a044e] mb-4">
                            Executive Insights
                        </h3>

                        <div className="space-y-3">

                            <p>
                                ↑ Forecast accuracy mencapai 94%
                            </p>

                            <p>
                                ↑ Inventory Health stabil di atas 90%
                            </p>

                            <p>
                                ↓ 11 item membutuhkan reorder segera
                            </p>

                        </div>

                    </div>

                    <div
                        className="
      bg-gradient-to-r
      from-[#fff7fb]
      to-[#f3e8ff]
      rounded-3xl
      p-6
      "
                    >

                        <h3 className="font-black text-[#4a044e] mb-4">
                            AI Forecast Summary
                        </h3>

                        <div className="space-y-3">

                            <p>
                                Demand meningkat 12%
                            </p>

                            <p>
                                Safety stock optimal
                            </p>

                            <p>
                                Risiko stockout rendah
                            </p>

                        </div>

                    </div>

                </div>

            </section>
            {/* CTA */}

            <section className="px-12 pb-32">

                <div
                    className="
                bg-gradient-to-r
                from-[#C4B5FD]
                via-[#F9A8D4]
                to-[#BFDBFE]
                rounded-[40px]
                p-16
                text-center
                "
                >

                    <h2 className="text-6xl font-black text-[#312E81]">
                        Ready To Transform
                        <br />
                        Healthcare Supply Chains?
                    </h2>

                    <p className="mt-6 text-xl text-slate-700">
                        Bring AI-powered forecasting and procurement decisions
                        into your hospital operations.
                    </p>

                    <Link
                        to="/login"
                        className="
                    inline-block
                    mt-10
                    px-10
                    py-5
                    rounded-2xl
                    bg-white
                    text-[#312E81]
                    font-bold
                    shadow-lg
                    "
                    >
                        Get Started
                    </Link>

                </div>

            </section>
            {
                showDemo && (

                    <div
                        className="
      fixed
      inset-0
      bg-black/50
      backdrop-blur-sm
      flex
      items-center
      justify-center
      z-50
      "
                    >

                        <div
                            className="
        bg-white
        w-[700px]
        rounded-[30px]
        p-8
        shadow-2xl
        "
                        >

                            <div className="flex justify-between items-center mb-8">

                                <h2
                                    className="
            text-3xl
            font-black
            text-[#4a044e]
            "
                                >
                                    Platform Demo
                                </h2>

                                <button
                                    onClick={() => setShowDemo(false)}
                                    className="
            text-3xl
            text-slate-400
            "
                                >
                                    ×
                                </button>

                            </div>

                            <div className="grid grid-cols-2 gap-4">

                                <div
                                    className="
            p-6
            rounded-2xl
            bg-pink-50
            border
            border-pink-100
            "
                                >
                                    📈
                                    <h3 className="font-black mt-2">
                                        AI Forecasting
                                    </h3>

                                    <p className="text-sm text-slate-500 mt-1">
                                        Prediksi kebutuhan obat menggunakan AI.
                                    </p>
                                </div>

                                <div
                                    className="
            p-6
            rounded-2xl
            bg-purple-50
            border
            border-purple-100
            "
                                >
                                    📦
                                    <h3 className="font-black mt-2">
                                        Inventory Monitoring
                                    </h3>

                                    <p className="text-sm text-slate-500 mt-1">
                                        Monitoring stok real-time.
                                    </p>
                                </div>

                                <div
                                    className="
            p-6
            rounded-2xl
            bg-green-50
            border
            border-green-100
            "
                                >
                                    👨‍💼
                                    <h3 className="font-black mt-2">
                                        Director Dashboard
                                    </h3>

                                    <p className="text-sm text-slate-500 mt-1">
                                        Executive insight & KPI rumah sakit.
                                    </p>
                                </div>

                                <div
                                    className="
            p-6
            rounded-2xl
            bg-orange-50
            border
            border-orange-100
            "
                                >
                                    🛒
                                    <h3 className="font-black mt-2">
                                        Procurement Workflow
                                    </h3>

                                    <p className="text-sm text-slate-500 mt-1">
                                        Purchase order dan supplier management.
                                    </p>
                                </div>

                            </div>

                        </div>

                    </div>

                )
            }

        </div>
    )
}

export default LandingPage