import {
    Chart as ChartJS,
    ArcElement,
    Tooltip,
    Legend
} from 'chart.js'

import { Doughnut } from 'react-chartjs-2'

ChartJS.register(
    ArcElement,
    Tooltip,
    Legend
)

function InventoryStatusChart({ analytics }) {

    const data = {
        labels: [
            'Critical',
            'Warning',
            'Safe'
        ],

        datasets: [
            {
                data: [
                    analytics?.critical || 0,
                    analytics?.warning || 0,
                    analytics?.safe || 0
                ],

                backgroundColor: [
                    '#6d214f',
                    '#b76e79',
                    '#d4b5e8'
                ],

                borderWidth: 0
            }
        ]
    }

    return (
        <div className="relative h-[300px]">

            <Doughnut
                data={data}
                options={{
                    maintainAspectRatio: false,

                    plugins: {
                        legend: {
                            position: 'bottom',

                            labels: {
                                color: '#4a044e',
                                font: {
                                    size: 14,
                                    weight: 'bold'
                                }
                            }
                        }
                    },

                    cutout: '70%'
                }}
            />

            <div
                className="
        absolute inset-0
        flex flex-col
        items-center
        justify-center
        pointer-events-none
      "
            >

                <span className="text-5xl font-black text-[#6d214f]">
                    {analytics?.health_score || 0}%
                </span>

                <span className="text-sm text-[#b76e79]">
                    Health
                </span>

            </div>

        </div>
    )
}

export default InventoryStatusChart