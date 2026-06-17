import { useEffect, useState } from 'react'
import axios from 'axios'
import ForecastChart from '../../components/ForecastChart'

function ForecastPage() {

  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [drugs, setDrugs] = useState([])
  const [selectedDrug, setSelectedDrug] = useState('M01AB')

  useEffect(() => {

    setLoading(true)

    axios
      .get('http://127.0.0.1:8000/api/forecast/drugs')
      .then((response) => {
        setDrugs(response.data)
      })
      .catch((error) => {
        console.error(error)
        setError('Forecast service unavailable')
      })
      .finally(() => {
        setLoading(false)
      })

  }, [])
  const [predictionData, setPredictionData] = useState([])
  const [historyData, setHistoryData] = useState([])
  useEffect(() => {

    axios
      .get(
        `http://127.0.0.1:8000/api/forecast/history/${selectedDrug}`
      )
      .then((response) => {
        setHistoryData(response.data)
      })
      .catch((error) => {
        console.error(error)
      })

  }, [selectedDrug])
  useEffect(() => {

    axios
      .get(
        `http://127.0.0.1:8000/api/forecast/predict/${selectedDrug}`
      )
      .then((response) => {
        setPredictionData(response.data)
      })
      .catch((error) => {
        console.error(error)
      })

  }, [selectedDrug])

  if (loading) {

    return (

      <div className="animate-pulse">

        <div className="h-12 w-64 bg-pink-100 rounded-xl mb-8"></div>

        <div className="h-[500px] bg-pink-100 rounded-3xl"></div>

      </div>

    )

  }

  if (error) {

    return (

      <div className="bg-red-50 border border-red-200 p-8 rounded-3xl">

        <h2 className="text-red-600 font-black text-2xl">
          Forecast Service Error
        </h2>

        <p className="mt-2">
          {error}
        </p>

      </div>

    )

  }
  return (

    <div className="space-y-8">

      <div>

        <h1 className="text-4xl font-black text-[#4a044e]">
          Forecasting
        </h1>

        <p className="text-slate-400 mt-2">
          Prediksi kebutuhan medis menggunakan AI Forecasting
        </p>

      </div>

      <div className="bg-white p-6 rounded-3xl border border-pink-100">

        <p className="text-sm text-slate-400 mb-2">
          Pilih Kode Obat
        </p>

        <select
          value={selectedDrug}
          onChange={(e) => setSelectedDrug(e.target.value)}
          className="
            border
            border-pink-100
            rounded-xl
            px-4
            py-3
            w-64
          "
        >

          {drugs.map((drug) => (

            <option
              key={drug.drug_code}
              value={drug.drug_code}
            >
              {drug.drug_code}
            </option>

          ))}

        </select>

      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">

        <div className="
bg-gradient-to-br
from-[#ec4899]
to-[#be185d]
p-6
rounded-[30px]
text-white
shadow-lg
">

          <p className="text-slate-400 text-sm">
            Forecast Accuracy
          </p>

          <h2 className="text-5xl font-black text-[#4a044e]">
            94%
          </h2>

        </div>

        <div className="
bg-gradient-to-br
from-[#7c3aed]
to-[#9333ea]
p-6
rounded-[30px]
text-white
shadow-lg
">

          <p className="text-slate-400 text-sm">
            MAPE
          </p>

          <h2 className="text-5xl font-black text-[#4a044e]">
            6%
          </h2>

        </div>

        <div className="
bg-gradient-to-br
from-[#4a044e]
to-[#6d214f]
p-6
rounded-[30px]
text-white
shadow-lg
">

          <p className="text-slate-400 text-sm">
            Forecast Horizon
          </p>

          <h2 className="text-5xl font-black text-[#4a044e]">
            12W
          </h2>

        </div>
        <div className="
bg-gradient-to-br
from-[#f59e0b]
to-[#d97706]
p-6
rounded-[30px]
text-white
shadow-lg
">

          <p className="text-white/80 text-sm">
            Predicted Demand
          </p>

          <h2 className="text-5xl font-black">
            {
              predictionData.length > 0
                ? Math.round(
                  predictionData[
                    predictionData.length - 1
                  ].predicted_demand
                )
                : 0
            }
          </h2>

        </div>

      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">

        {/* CHART */}

        <div
          className="
    col-span-2
    bg-white
    p-8
    rounded-3xl
    border
    border-pink-100
    h-[400px]
    "
        >

          <h2 className="text-2xl font-bold text-[#4a044e] mb-4">
            Forecast Demand
          </h2>

          <ForecastChart
            historyData={historyData}
            predictionData={predictionData}
          />

        </div>

        {/* SUMMARY */}

        <div
          className="
    bg-gradient-to-br
    from-[#fff7fb]
    to-[#f3e8ff]
    p-6
    rounded-[30px]
    border
    border-pink-100
    "
        >

          <h2 className="font-black text-[#4a044e] mb-6">
            Forecast Summary
          </h2>

          <div className="space-y-5">

            <div>

              <p className="text-slate-500 text-sm">
                Selected Drug
              </p>

              <p className="font-black text-2xl text-[#4a044e]">
                {selectedDrug}
              </p>

            </div>

            <div>

              <p className="text-slate-500 text-sm">
                Historical Records
              </p>

              <p className="font-black text-2xl text-[#4a044e]">
                {historyData.length}
              </p>

            </div>

            <div>

              <p className="text-slate-500 text-sm">
                Forecast Period
              </p>

              <p className="font-black text-2xl text-[#4a044e]">
                {predictionData.length} Weeks
              </p>

            </div>

            <div>

              <p className="text-slate-500 text-sm">
                Trend
              </p>

              <p className="font-black text-green-600">
                Increasing
              </p>

            </div>

          </div>

        </div>

      </div>

      <div className="grid grid-cols-2 gap-6">

        {/* AI RECOMMENDATION */}

        <div
          className="
    bg-gradient-to-r
    from-pink-50
    to-purple-50
    p-8
    rounded-[30px]
    border
    border-pink-100
    "
        >

          <h2 className="text-2xl font-black text-[#4a044e] mb-6">
            🤖 AI Recommendation Center
          </h2>

          <div className="space-y-4 text-[#6d214f]">

            <div>
              📈 Forecast menunjukkan tren permintaan meningkat untuk <b>{selectedDrug}</b>
            </div>

            <div>
              ⚠ Safety stock disarankan dinaikkan 15%
            </div>

            <div>
              📦 Lakukan reorder sebelum stok mencapai reorder point
            </div>

            <div>
              🚚 Prioritaskan vendor dengan lead time tercepat
            </div>

          </div>

        </div>

        {/* FORECAST RISK */}

        <div
          className="
    bg-gradient-to-br
    from-red-50
    to-orange-50
    p-8
    rounded-[30px]
    border
    border-red-100
    "
        >

          <h2 className="text-2xl font-black text-red-600 mb-6">
            Forecast Risk Level
          </h2>

          <div className="flex items-center gap-3 mb-4">

            <div
              className="
        w-4
        h-4
        rounded-full
        bg-red-500
        "
            />

            <span className="font-bold text-red-600">
              Medium Risk
            </span>

          </div>

          <p className="text-slate-600 leading-relaxed">

            Demand volatility terdeteksi pada pola penggunaan obat.
            Monitoring mingguan direkomendasikan untuk menghindari
            potensi stockout pada periode mendatang.

          </p>

        </div>

      </div>

    </div>

  )
}

export default ForecastPage
