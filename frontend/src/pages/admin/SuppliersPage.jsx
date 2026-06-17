import { useEffect, useState } from 'react'
import axios from 'axios'

function SuppliersPage() {
  const [analytics, setAnalytics] = useState([])
  const [suppliers, setSuppliers] = useState([])

  useEffect(() => {

    axios
      .get('https://shimmering-magic-production-6404.up.railway.app/api/suppliers')
      .then((response) => {
        setSuppliers(response.data)
      })
      .catch((error) => {
        console.error(error)
      })

    axios
      .get(
        'https://shimmering-magic-production-6404.up.railway.app/api/suppliers/analytics',
        {
          headers: {
            'X-Tenant-ID': user.tenant_id
          }
        }
      )
      .then((response) => {

        setAnalytics(
          response.data
        )

      })

  }, [])

  const totalSuppliers = suppliers.length

  const totalItems = suppliers.reduce(
    (sum, supplier) => sum + supplier.total_items,
    0
  )

  return (

    <div className="space-y-8">

      {/* HEADER */}

      <div>

        <h1 className="text-4xl font-black text-[#4a044e]">
          Suppliers
        </h1>

        <p className="text-slate-400 mt-2">
          Supplier analytics dan monitoring vendor
        </p>

      </div>

      {/* TOP SUPPLIER HERO */}

      {
        analytics.length > 0 && (

          <div
            className="
            bg-gradient-to-r
            from-[#6d214f]
            to-[#4a044e]
            rounded-3xl
            p-8
            text-white
          "
          >

            <p className="text-pink-200 mb-2">
              🏆 Top Supplier
            </p>

            <h2 className="text-4xl font-black">
              {analytics[0].vendor_name}
            </h2>

            <p className="mt-2 text-pink-100">
              {analytics[0].total_quantity} Units Supplied
            </p>

            <div className="mt-6 flex gap-3">

              <span
                className="
                px-4 py-2
                rounded-full
                bg-white/10
                text-sm
              "
              >
                #1 Supplier
              </span>

              <span
                className="
                px-4 py-2
                rounded-full
                bg-white/10
                text-sm
              "
              >
                Highest Contribution
              </span>

            </div>

          </div>

        )
      }

      {/* KPI */}

      <div className="grid grid-cols-2 gap-6">

        <div className="bg-white p-6 rounded-3xl border border-pink-100">

          <p className="text-slate-400 text-sm">
            Total Suppliers
          </p>

          <h2 className="text-5xl font-black text-[#4a044e]">
            {totalSuppliers}
          </h2>

        </div>

        <div className="bg-white p-6 rounded-3xl border border-pink-100">

          <p className="text-slate-400 text-sm">
            Total Inventory Records
          </p>

          <h2 className="text-5xl font-black text-[#4a044e]">
            {totalItems}
          </h2>

        </div>

      </div>

      {/* SUPPLIER RANKING */}

      <div className="bg-white rounded-3xl p-6 border border-pink-100">

        <h2 className="text-2xl font-black text-[#4a044e] mb-6">
          Supplier Ranking
        </h2>

        {
          analytics.map(
            (
              supplier,
              index
            ) => (

              <div
                key={supplier.vendor_name}
                className="
                flex
                justify-between
                py-4
                border-b
              "
              >

                <div>

                  <p className="font-bold text-[#4a044e]">

                    {index === 0 && "🥇 "}
                    {index === 1 && "🥈 "}
                    {index === 2 && "🥉 "}

                    {supplier.vendor_name}

                  </p>

                </div>

                <div className="font-black text-[#4a044e]">

                  {supplier.total_quantity}

                </div>

              </div>

            )
          )
        }

      </div>

      {/* SUPPLIER CARDS */}

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">

        {
          suppliers.map((supplier) => (

            <div
              key={supplier.vendor_name}
              className="
              bg-white
              rounded-3xl
              p-6
              border
              border-pink-100
              hover:shadow-lg
              transition-all
            "
            >

              <h2 className="text-xl font-bold text-[#4a044e]">
                {supplier.vendor_name}
              </h2>

              <p className="text-slate-400 mt-3">
                Inventory Records
              </p>

              <p className="text-4xl font-black text-[#4a044e] mt-2">
                {supplier.total_items}
              </p>

            </div>

          ))
        }

      </div>

     </div>

  )
}

export default SuppliersPage