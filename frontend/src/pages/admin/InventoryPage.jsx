import InventoryTable from '../../components/InventoryTable'
import { useEffect, useState } from 'react'
import axios from 'axios'
import InventoryStatusChart from '../../components/InventoryStatusChart'
function InventoryPage({
  medicines = [],
  search,
  setSearch,
  selectedTenant
}) {

  const [analytics, setAnalytics] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const user = JSON.parse(
    localStorage.getItem('user')
  )
  const tenantId =
    user?.role === 'super_admin'
      ? localStorage.getItem('selectedTenant')
      : user?.tenant_id

  useEffect(() => {
    setLoading(true)

    axios
      .get(
        'https://shimmering-magic-production-6404.up.railway.app/api/inventory/analytics',
        {
          headers: {
            'X-Tenant-ID': tenantId
          }
        }
      )
      .then((response) => {
        setAnalytics(response.data)
      })
      .catch((error) => {
        console.error(error)
        setError('Failed to load inventory analytics')
      })
      .finally(() => {
        setLoading(false)
      })

  }, [selectedTenant])
  let insight = ''

  if (analytics?.health_score >= 80) {
    insight =
      'Inventory dalam kondisi sangat sehat dan stabil.'
  }
  else if (analytics?.health_score >= 60) {
    insight =
      'Inventory cukup sehat namun perlu monitoring item Warning.'
  }
  else {
    insight =
      `Inventory Health rendah (${analytics?.health_score}%). Terdapat ${analytics?.critical} item Critical yang perlu segera direstock.`
  }
  const showCriticalItems = () => {

    const items =
      analytics?.critical_items
        ?.map(
          item =>
            `${item.item_name} (${item.current_stock})`
        )
        .join('\n')

    alert(
      `Critical Items:\n\n${items || 'Tidak ada'}`
    )

  }

  const showWarningItems = () => {

    const items =
      analytics?.warning_items
        ?.map(
          item =>
            `${item.item_name} (${item.days_left} hari)`
        )
        .join('\n')

    alert(
      `Warning Items:\n\n${items || 'Tidak ada'}`
    )

  }

  const showSafeItems = () => {

    const items =
      analytics?.safe_items
        ?.map(
          item =>
            `${item.item_name} (${item.current_stock})`
        )
        .join('\n')

    alert(
      `Safe Items:\n\n${items || 'Tidak ada'}`
    )

  }
  if (loading) {

    return (

      <div className="animate-pulse space-y-6">

        <div className="h-12 w-72 bg-pink-100 rounded-xl"></div>

        <div className="grid-cols-1 md:grid-cols-2 xl:grid-cols-5 gap-6">

          <div className="h-40 bg-pink-100 rounded-3xl"></div>
          <div className="h-40 bg-pink-100 rounded-3xl"></div>
          <div className="h-40 bg-pink-100 rounded-3xl"></div>
          <div className="h-40 bg-pink-100 rounded-3xl"></div>
          <div className="h-40 bg-pink-100 rounded-3xl"></div>

        </div>

      </div>

    )

  }
  if (error) {

    return (

      <div
        className="
      bg-red-50
      border
      border-red-200
      p-8
      rounded-3xl
      "
      >

        <h2 className="text-2xl font-black text-red-600">
          Failed To Load Inventory
        </h2>

        <p className="mt-2 text-slate-600">
          {error}
        </p>

        <button
          onClick={() => window.location.reload()}
          className="
        mt-5
        bg-red-500
        text-white
        px-5
        py-3
        rounded-xl
        "
        >
          Retry
        </button>

      </div>

    )

  }
  return (

    <div className="space-y-8">
      {/* HEADER */}

      <div>

        <h1 className="text-4xl font-black text-[#4a044e]">
          Inventory Medis
        </h1>

        <p className="text-slate-400 mt-2">
          Monitoring stok obat & status prediksi AI
        </p>

      </div>

      {/* KPI */}

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-5 gap-6">

        <div className="bg-gradient-to-br from-[#ec8ac7] to-[#e84393] p-6 rounded-3xl text-white">
          <p>Total Item</p>
          <h2 className="text-5xl font-black">
            {analytics?.total_items || 0}
          </h2>
        </div>

        <div
          onClick={showCriticalItems}
          className="
  bg-gradient-to-br
  from-[#4a044e]
  to-[#6d214f]
  p-6
  rounded-3xl
  text-white
  cursor-pointer
  hover:scale-105
  transition-all
  duration-300
  "
        >
          <p>Critical</p>
          <h2 className="text-5xl font-black">
            {analytics?.critical || 0}
          </h2>
          <p className="text-sm opacity-80 mt-2">
            Click for details
          </p>
        </div>

        <div
          onClick={showWarningItems}
          className="
  bg-gradient-to-br
  from-[#7b2cbf]
  to-[#9d4edd]
  p-6
  rounded-3xl
  text-white
  cursor-pointer
  hover:scale-105
  transition-all
  duration-300
  "
        >
          <p>Warning</p>
          <h2 className="text-5xl font-black">
            {analytics?.warning || 0}
          </h2>
          <p className="text-sm opacity-80 mt-2">
            Click for details
          </p>
        </div>

        <div
          onClick={showSafeItems}
          className="
  bg-gradient-to-br
  from-[#c8a2c8]
  to-[#d4b5e8]
  p-6
  rounded-3xl
  text-white
  cursor-pointer
  hover:scale-105
  transition-all
  duration-300
  "
        >

          <p>Safe</p>
          <h2 className="text-5xl font-black">
            {analytics?.safe || 0}
          </h2>
          <p className="text-sm opacity-80 mt-2">
            Click for details
          </p>
        </div>

        <div
          className={`
            p-6 rounded-3xl text-white
            ${analytics?.health_score >= 80
              ? 'bg-gradient-to-br from-green-400 to-green-700'
              : analytics?.health_score >= 40
                ? 'bg-gradient-to-br from-yellow-400 to-yellow-600'
                : 'bg-gradient-to-br from-red-400 to-red-700'
            }
          `}
        >

          <p>Health Score</p>

          <h2 className="text-5xl font-black">
            {analytics?.health_score || 0}%
          </h2>

        </div>
      </div>

      {/* ANALYTICS */}

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">

        {/* RESTOCK */}

        <div className="bg-white p-6 rounded-3xl border border-pink-100">

          <h2 className="text-xl font-bold text-[#4a044e] mb-4">
            Restock Priority
          </h2>

          {analytics?.critical_items.map((item, index) => (

            <div
              key={index}
              className="flex justify-between py-2 border-b"
            >

              <span>{item.item_name}</span>

              <span className="font-bold text-red-500">
                {item.current_stock}
              </span>

            </div>

          ))}

        </div>

        {/* FAST MOVING */}

        <div className="bg-white p-6 rounded-3xl border border-pink-100">

          <h2 className="text-xl font-bold text-[#4a044e] mb-4">
            Fast Moving
          </h2>

          {analytics?.fast_moving?.map((item, index) => (

            <div
              key={index}
              className="flex justify-between py-2 border-b"
            >

              <span>{item.item_name}</span>

              <span className="font-bold text-pink-600">
                {item.avg_usage_per_day}
              </span>

            </div>

          ))}

        </div>

        {/* STOCKOUT */}

        <div className="bg-white p-6 rounded-3xl border border-pink-100">

          <h2 className="text-xl font-bold text-[#4a044e] mb-4">
            Stockout Risk
          </h2>

          {analytics?.warning_items.map((item, index) => (

            <div
              key={index}
              className="flex justify-between py-2 border-b"
            >

              <span>{item.item_name}</span>

              <span className="font-bold text-orange-500">
                {item.days_left} hari
              </span>

            </div>

          ))}

        </div>

      </div>
      <div
        className="
  bg-gradient-to-br
  from-[#fff7fb]
  via-[#faf5ff]
  to-[#fdf2f8]
  p-8
  rounded-[32px]
  border
  border-pink-100
  shadow-lg
  "
      >

        <h2 className="text-2xl font-bold text-[#4a044e] mb-4">
          Inventory Status Distribution
        </h2>

        <div className="grid grid-cols-2 gap-8 items-center">

          <InventoryStatusChart
            analytics={analytics}
          />

          <div className="space-y-5">

            <div
              className="
      flex
      justify-between
      bg-red-50
      p-4
      rounded-2xl
      "
            >
              <span className="font-semibold text-red-600">
                Critical
              </span>

              <span className="font-black text-red-600">
                {analytics?.critical || 0}
              </span>
            </div>

            <div
              className="
      flex
      justify-between
      bg-yellow-50
      p-4
      rounded-2xl
      "
            >
              <span className="font-semibold text-yellow-600">
                Warning
              </span>

              <span className="font-black text-yellow-600">
                {analytics?.warning || 0}
              </span>
            </div>

            <div
              className="
      flex
      justify-between
      bg-green-50
      p-4
      rounded-2xl
      "
            >
              <span className="font-semibold text-green-600">
                Safe
              </span>

              <span className="font-black text-green-600">
                {analytics?.safe || 0}
              </span>
            </div>

          </div>

        </div>
        <h3
          className="
  text-lg
  font-bold
  text-[#4a044e]
  mb-4
  "
        >
          Inventory Health Score
        </h3>
        {/* HEALTH BAR */}

        <div className="mt-8">

          <div className="flex justify-between mb-2">

            <span className="font-semibold text-[#4a044e]">
              Inventory Health
            </span>

            <span className="font-bold text-[#6d214f]">
              {analytics?.health_score || 0}%
            </span>

          </div>

          <div className="w-full bg-gray-200 rounded-full h-4">

            <div
              className="
          h-4
          rounded-full
          bg-gradient-to-r
          from-[#6d214f]
          to-[#9d4edd]
        "
              style={{
                width: `${analytics?.health_score || 0}%`
              }}
            />

          </div>

        </div>

      </div>
      {/* ALERT */}

      <div className="bg-red-50 border border-red-200 p-6 rounded-3xl">

        <h2 className="text-xl font-bold text-red-600 mb-2">
          ⚠ Inventory Insight
        </h2>

        <p>

          {insight}

          <span className="font-bold text-red-600">
            {' '}
            {analytics?.critical || 0}
          </span>

          {' '}item dengan status Critical
          yang membutuhkan perhatian segera.

        </p>

      </div>

      {/* TABLE */}

      <InventoryTable
        medicines={medicines}
        search={search}
        setSearch={setSearch}
      />

    </div>

  )
}

export default InventoryPage