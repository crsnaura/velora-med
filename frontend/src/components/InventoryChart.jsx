import { useEffect, useState } from 'react'
import axios from 'axios'
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js'

import { Bar } from 'react-chartjs-2'

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
)

function InventoryChart() {
    const [chartData, setChartData] = useState([])
    const user = JSON.parse(
        localStorage.getItem('user')
    )
    const tenantId =
        user?.role === 'super_admin'
            ? localStorage.getItem('selectedTenant')
            : user?.tenant_id
    useEffect(() => {

        axios
            .get(
                'https://shimmering-magic-production-6404.up.railway.app/api/dashboard/chart',
                {
                    headers: {
                        'X-Tenant-ID': tenantId
                    }
                }
            )
            .then((response) => {
                setChartData(response.data)
            })
            .catch((error) => {
                console.error(error)
            })

    }, [])

    const data = {
        labels: chartData.map(
            (item) => item.item_name
        ),

        datasets: [
            {
                label: 'Jumlah Stok',

                data: chartData.map(
                    (item) => item.current_stock
                ),

                backgroundColor: [
                    '#d8a7b1',
                    '#c3aed6',
                    '#f7c5cc',
                    '#e7b2bc',
                    '#f3b8c5'
                ],
            },
        ],
    }


    return (
        <div
            className="
        relative 
        overflow-hidden
        bg-white/80
        backdrop-blur-xl
        p-7
        rounded-[30px]
        border
        border-pink-100
        shadow-[0_20px_50px_rgba(217,145,179,0.14)]

        hover:-translate-y-2
        hover:scale-[1.01]
        hover:shadow-[0_25px_60px_rgba(217,145,179,0.22)]

        transition-all
        duration-500
    "
        >
            <div
                className="
        absolute
        -top-20
        -right-20

        w-52
        h-52

        bg-pink-300/20

        rounded-full

        blur-3xl
    "
            ></div>
            <h2 className="
            text-3xl
            font-black
            text-[#4a044e]
            tracking-tight
            mb-2
        ">
                Stok Obat
            </h2>
            <p className="text-sm text-[#9f789b] mb-6">
                Data 5 stok terendah
            </p>

            <div className="h-[320px]">

                <Bar
                    data={data}
                    options={{
                        maintainAspectRatio: false,

                        plugins: {

                            legend: {
                                labels: {
                                    color: '#6d214f',

                                    font: {
                                        family: 'sans-serif',
                                        size: 13,
                                    }
                                }
                            }

                        },

                        scales: {

                            x: {
                                grid: {
                                    display: false,
                                },

                                ticks: {
                                    color: '#9f1239',
                                }
                            },

                            y: {

                                grid: {
                                    color: 'rgba(217,145,179,0.15)',
                                },

                                ticks: {
                                    color: '#9f1239',
                                }
                            }

                        }

                    }}
                />

            </div>
        </div>
    )
}

export default InventoryChart