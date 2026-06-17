import { useState, useEffect } from 'react'
import axios from 'axios'

function SettingsPage() {

  const [users, setUsers] = useState([])

  useEffect(() => {

    axios
      .get('http://127.0.0.1:8000/api/users')
      .then((response) => {
        setUsers(response.data)
      })

  }, [])
  return (
    <div className="space-y-8">

      <div>

        <h1 className="text-4xl font-black text-[#4a044e]">
          Settings
        </h1>

        <p className="text-slate-400 mt-2">
          Konfigurasi sistem Velora Med
        </p>

      </div>

      <div className="grid grid-cols-2 gap-6">

        <div className="bg-white p-6 rounded-3xl border border-pink-100">

          <h2 className="text-xl font-bold text-[#4a044e] mb-4">
            System Information
          </h2>

          <div className="space-y-3">

            <div className="flex justify-between">
              <span>Version</span>
              <span className="font-bold">1.0.0</span>
            </div>

            <div className="flex justify-between">
              <span>Framework</span>
              <span className="font-bold">FastAPI</span>
            </div>

            <div className="flex justify-between">
              <span>Frontend</span>
              <span className="font-bold">React + Vite</span>
            </div>

          </div>

        </div>

        <div className="bg-white p-6 rounded-3xl border border-pink-100">

          <h2 className="text-xl font-bold text-[#4a044e] mb-4">
            Database Status
          </h2>

          <div className="space-y-3">

            <div className="flex justify-between">
              <span>Database</span>
              <span className="text-green-600 font-bold">
                Connected
              </span>
            </div>

            <div className="flex justify-between">
              <span>Engine</span>
              <span className="font-bold">
                PostgreSQL
              </span>
            </div>

            <div className="flex justify-between">
              <span>Architecture</span>
              <span className="font-bold">
                Multi Tenant
              </span>
            </div>

          </div>

        </div>

      </div>

      <div className="bg-white p-6 rounded-3xl border border-pink-100">

        <h2 className="text-xl font-bold text-[#4a044e] mb-4">
          Cloud Architecture
        </h2>

        <ul className="space-y-2 text-slate-600">

          <li>✓ Multi-Tenant SaaS Architecture</li>

          <li>✓ REST API with FastAPI</li>

          <li>✓ PostgreSQL Database</li>

          <li>✓ Predictive Analytics Module</li>

          <li>✓ AI Healthcare Supply Chain Dashboard</li>

        </ul>

      </div>
      <div className="bg-gradient-to-br from-[#fff7fb] to-[#f3e8ff] p-8 rounded-[30px] shadow-xl border border-pink-100">

        <h2 className="text-2xl font-black text-[#4a044e] mb-6">
          System Status
        </h2>

        <div className="space-y-6">

          <div>
            <p className="text-sm text-slate-500">
              Tenant Connectivity
            </p>

            <p className="text-4xl font-black text-green-500">
              Online
            </p>
          </div>

          <div>
            <p className="text-sm text-slate-500">
              Active Users
            </p>

            <p className="text-4xl font-black text-[#6d214f]">
              {users.length}
            </p>
          </div>

        </div>

      </div>


    </div>
  )
}

export default SettingsPage