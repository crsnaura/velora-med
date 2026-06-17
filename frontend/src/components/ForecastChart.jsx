import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend
} from 'chart.js'

import { Line } from 'react-chartjs-2'

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend
)

function ForecastChart({
  historyData,
  predictionData
}) {

  const historyLabels = historyData.map(
    item => item.sales_date
  )

  const forecastLabels = predictionData.map(
    item => `Forecast ${item.day}`
  )

  const data = {

    labels: [
      ...historyLabels,
      ...forecastLabels
    ],

    datasets: [

      {
        label: 'Historical Sales',

        data: [
          ...historyData.map(
            item => item.sales_qty
          ),

          ...Array(predictionData.length).fill(null)
        ],

        borderColor: '#d991b3',

        backgroundColor: '#d991b3',

        tension: 0.3
      },

      {
        label: 'Forecast',

        data: [

          ...Array(historyData.length).fill(null),

          ...predictionData.map(
            item => item.predicted_sales
          )

        ],

        borderColor: '#6d214f',

        backgroundColor: '#6d214f',

        borderDash: [5, 5],

        tension: 0.3
      }

    ]
  }

  return (
    <div className="h-[300px]">

      <Line
        data={data}
        options={{
          maintainAspectRatio: false
        }}
      />

    </div>
  )
}

export default ForecastChart