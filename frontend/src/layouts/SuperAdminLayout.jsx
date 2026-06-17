import { useState } from 'react'
import SuperAdminSidebar from '../components/SuperAdminSidebar'

function SuperAdminLayout({ children }) {

    const [selectedTenant, setSelectedTenant] =
        useState(
            localStorage.getItem(
                'selectedTenant'
            ) || 'T001'
        )

    const handleTenantChange = (e) => {

        localStorage.setItem(
            'selectedTenant',
            e.target.value
        )

        setSelectedTenant(
            e.target.value
        )

        window.location.reload()

    }

    return (

        <div
            className="
flex
min-h-screen

bg-gradient-to-br
from-[#fff7fa]
via-[#fff0f6]
to-[#f8edff]
"
        >

            <SuperAdminSidebar />

            <div className="flex-1 p-8">

                <div className="flex justify-between items-center mb-8">

                    <div>

                        <h1 className="text-4xl font-black text-[#4a044e]">
                            National Command Center
                        </h1>

                        <p className="text-slate-400 mt-2">
                            Multi-hospital healthcare analytics
                        </p>

                    </div>

                    <select
                        value={selectedTenant}
                        onChange={handleTenantChange}
                        className="
                            bg-white
                            border
                            border-pink-200
                            px-4
                            py-3
                            rounded-xl
                            shadow
                        "
                    >

                        <option value="T001">
                            RSUD dr. Soetomo
                        </option>

                        <option value="T002">
                            RSUD Soewandhie
                        </option>

                        <option value="T003">
                            RS Bhakti Dharma Husada
                        </option>

                        <option value="T004">
                            RS Haji Surabaya
                        </option>

                    </select>

                </div>

                {children}

            </div>

        </div>

    )

}

export default SuperAdminLayout