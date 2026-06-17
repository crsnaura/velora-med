import ForecastChart from './components/ForecastChart'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import './App.css'
import InventoryTable from './components/InventoryTable'
import TopNavbar from './components/TopNavbar'
import StatsCard from './components/StatsCard'
import Sidebar from './components/Sidebar'
import {
  useEffect,
  useState,
  useContext
} from 'react'

import { AuthContext }
  from './context/AuthContext'
import axios from 'axios'
import InventoryChart from './components/InventoryChart'
import {
  Routes,
  Route
} from 'react-router-dom'

import DashboardPage from './pages/admin/DashboardPage'
import InventoryPage from './pages/admin/InventoryPage'
import ForecastPage from './pages/admin/ForecastPage'
import SuppliersPage from './pages/admin/SuppliersPage'
import SettingsPage from './pages/admin/SettingsPage'
import AdminLayout from './layouts/AdminLayout'

import LoginPage from './pages/public/LoginPage'
import LandingPage from './pages/public/LandingPage'
import SupplierDashboardPage from './pages/supplier/SupplierDashboardPage'
import StockInPage from './pages/admin/StockInPage'
import StockOutPage from './pages/admin/StockOutPage'
import ReorderPage from './pages/admin/ReorderPage'
import DirectorDashboardPage
  from './pages/director/DashboardPage'
import PurchaseOrdersPage from './pages/admin/PurchaseOrdersPage'
import DirectorLayout from './layouts/DirectorLayout'
import ForecastInsightsPage from './pages/director/ForecastInsightsPage'
import ProcurementAnalyticsPage from './pages/director/ProcurementAnalyticsPage'
import ProtectedRoute from './components/ProtectedRoute'
import SuperAdminDashboardPage
  from './pages/superadmin/SuperAdminDashboardPage'
import SuperAdminLayout
  from './layouts/SuperAdminLayout'
import UsersPage
  from './pages/superadmin/UsersPage'
import TenantsPage
  from './pages/superadmin/TenantsPage'
import SuperAdminPurchaseOrdersPage from './pages/superadmin/PurchaseOrdersPage'

function App() {
  const { user } =
    useContext(AuthContext)
  const [selectedTenant,
    setSelectedTenant] = useState(
      localStorage.getItem('selectedTenant')
    )
    
const tenantId =
  user?.role === 'super_admin'
    ? localStorage.getItem('selectedTenant')
    : user?.tenant_id
const [search, setSearch] = useState('')
const [medicines, setMedicines] = useState([])
const [dashboardStats, setDashboardStats] = useState({
  total_items: 0,
  critical_items: 0,
  warning_items: 0,
  safe_items: 0
})
const [demandStats, setDemandStats] = useState(null)
const [alertData, setAlertData] = useState(null)
const [supplyStats, setSupplyStats] = useState(null)


useEffect(() => {
  if (
    !tenantId ||
    tenantId === 'GLOBAL'
  ) {
    return
  }

  axios
    .get('http://127.0.0.1:8000/api/dashboard/stats',
      {
        headers: {
          'X-Tenant-ID': tenantId
        }
      }
    )
    .then((response) => {
      setDashboardStats(response.data)
    })
    .catch((error) => {
      console.error(error)
    })

  axios
    .get(
      'http://127.0.0.1:8000/api/inventory',
      {
        headers: {
          'X-Tenant-ID': tenantId
        },

        params: {
          search: search
        }
      }
    )
    .then((response) => {
      setMedicines(response.data)
    })
    .catch((error) => {
      console.error(error)
    })

  axios
    .get(
      'http://127.0.0.1:8000/api/dashboard/alerts',
      {
        headers: {
          'X-Tenant-ID': tenantId
        }
      }
    )
    .then((response) => {
      setAlertData(response.data)
    })
    .catch((error) => {
      console.error(error)
    })

  axios
    .get(
      'http://127.0.0.1:8000/api/forecast/history/M01AB',
    )
    .then((response) => {
      setDashboardHistory(
        response.data.slice(-30)
      )
    })

  axios
    .get(
      'http://127.0.0.1:8000/api/forecast/predict/M01AB'
    )
    .then((response) => {
      setDashboardPrediction(
        response.data
      )
    })

  axios
    .get(
      'http://127.0.0.1:8000/api/dashboard/supply-chain',
      {
        headers: {
          'X-Tenant-ID': tenantId
        }
      }
    )
    .then((response) => {

      setSupplyStats(
        response.data
      )

    })
    .catch((error) => {

      console.error(error)

    })

  axios
    .get(
      'http://127.0.0.1:8000/api/demand/analytics',
      {
        headers: {
          'X-Tenant-ID': tenantId
        }
      }
    )
    .then((response) => {

      setDemandStats(
        response.data
      )

    })

}, [tenantId, search])

const [dashboardHistory, setDashboardHistory] = useState([])
const [dashboardPrediction, setDashboardPrediction] = useState([])
const hospitalMedicines = medicines
const filteredMedicines = medicines
return (

  <Routes>
    <Route
      path="/"
      element={<LandingPage />}
    />

    <Route
      path="/login"
      element={<LoginPage />}
    />
    <Route
      path="/admin/dashboard"
      element={

        <AdminLayout>

          <DashboardPage>

            <>
              <TopNavbar />

              {/* MAIN KPI */}

              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 mb-8">

                <StatsCard
                  title="Total Obat"
                  value={dashboardStats.total_items}
                  icon="💊"
                  gradient="bg-gradient-to-br from-[#d991b3] to-[#b76e79]"
                  link="/admin/inventory"
                />

                <StatsCard
                  title="Obat Kritis"
                  value={dashboardStats.critical_items}
                  icon="🚨"
                  gradient="bg-gradient-to-br from-[#6d214f] to-[#4a044e]"
                  link="/admin/inventory"
                />

                <StatsCard
                  title="Total Stock In"
                  value={supplyStats?.total_stock_in || 0}
                  icon="📦"
                  gradient="bg-gradient-to-br from-[#b68fdc] to-[#9f7aea]"
                  link="/admin/stock-in"
                />

                <StatsCard
                  title="Total Stock Out"
                  value={supplyStats?.total_stock_out || 0}
                  icon="🚚"
                  gradient="bg-gradient-to-br from-[#8e5ea2] to-[#6d214f]"
                  link="/admin/stock-out"
                />

              </div>
              <div className="mb-8">
                <div className="grid grid-cols-2 gap-6 mb-8">

                  <InventoryChart />

                  <div className="bg-white/90 backdrop-blur-md p-6 rounded-3xl border border-pink-100 shadow-sm">

                    <h2 className="text-2xl font-black text-[#4a044e] tracking-tight mb-4">
                      Forecast Prediksi
                    </h2>

                    <p className="text-sm text-slate-400 mb-6">
                      Prediksi permintaan obat 30 hari ke depan
                    </p>

                    <ForecastChart
                      historyData={dashboardHistory}
                      predictionData={dashboardPrediction}
                    />

                  </div>

                </div>
              </div>

              <div className="bg-red-100 border border-red-300 p-6 rounded-xl mb-8">

                <h2 className="text-2xl font-bold text-red-700 mb-2">
                  ⚠️ Alert Prediksi Stok
                </h2>

                <p className="text-lg">
                  Kebutuhan medis
                  <span className="font-bold">
                    {' '}{alertData?.item_name}
                  </span>
                  {' '}
                  saat ini berada pada status
                  <span className="font-bold text-red-600">
                    {' '}{alertData?.stock_status}
                  </span>
                  {' '}
                  dengan stok tersisa
                  <span className="font-bold">
                    {' '}{alertData?.current_stock}
                  </span>
                  {' '}
                  unit.
                </p>

                <button className="mt-4 bg-red-600 text-white px-5 py-3 rounded-lg hover:bg-red-700">
                  ORDER ULANG SEKARANG
                </button>

              </div>

            </>

          </DashboardPage>

        </AdminLayout>
      }
    />

    <Route
      path="/admin/inventory"
      element={
        <ProtectedRoute
          allowedRole="admin"
        >

          <AdminLayout>
            <InventoryPage
              medicines={filteredMedicines}
              search={search}
              setSearch={setSearch}
            />
          </AdminLayout>

        </ProtectedRoute>
      }
    />

    <Route
      path="/admin/forecast"
      element={
        <ProtectedRoute
          allowedRole="admin"
        >

          <AdminLayout>
            <ForecastPage />
          </AdminLayout>
        </ProtectedRoute>
      }
    />
    <Route
      path="/admin/reorder"
      element={
        <ProtectedRoute
          allowedRole="admin"
        >
          <AdminLayout>
            <ReorderPage />
          </AdminLayout>
        </ProtectedRoute>
      }
    />
    <Route
      path="/admin/purchase-orders"
      element={
        <ProtectedRoute
          allowedRole="admin"
        >

          <AdminLayout>
            <PurchaseOrdersPage />
          </AdminLayout>
        </ProtectedRoute>
      }
    />
    <Route
      path="/admin/settings"
      element={
        <ProtectedRoute
          allowedRole="admin"
        >

          <AdminLayout>
            <SettingsPage />
          </AdminLayout>
        </ProtectedRoute>
      }
    />
    <Route
      path="/director/dashboard"
      element={
        <ProtectedRoute
          allowedRole="director"
        >
          <DirectorLayout>

            <DirectorDashboardPage />

          </DirectorLayout>
        </ProtectedRoute>
      }
    />
    <Route
      path="/director/forecast"
      element={
        <ProtectedRoute
          allowedRole="director"
        >

          <DirectorLayout>

            <ForecastInsightsPage />

          </DirectorLayout>
        </ProtectedRoute>
      }
    />

    <Route
      path="/director/procurement"
      element={
        <ProtectedRoute
          allowedRole="director"
        >

          <DirectorLayout>

            <ProcurementAnalyticsPage />

          </DirectorLayout>
        </ProtectedRoute>
      }
    />
    <Route
      path="/super-admin/dashboard"
      element={
        <ProtectedRoute
          allowedRole="super_admin"
        >

          <SuperAdminLayout>

            <SuperAdminDashboardPage />

          </SuperAdminLayout>

        </ProtectedRoute>
      }
    />
    <Route
      path="/super-admin/users"
      element={
        <ProtectedRoute
          allowedRole="super_admin"
        >

          <SuperAdminLayout>

            <UsersPage />

          </SuperAdminLayout>

        </ProtectedRoute>
      }
    />
    <Route
      path="/super-admin/tenants"
      element={
        <ProtectedRoute
          allowedRole="super_admin"
        >

          <SuperAdminLayout>

            <TenantsPage />

          </SuperAdminLayout>

        </ProtectedRoute>
      }
    />
    <Route
      path="/super-admin/purchase-orders"
      element={
        <ProtectedRoute
          allowedRole="super_admin"
        >
          <SuperAdminLayout>

            <SuperAdminPurchaseOrdersPage />

          </SuperAdminLayout>
        </ProtectedRoute>
      }
    />
    <Route
      path="/super-admin/suppliers"
      element={
        <ProtectedRoute
          allowedRole="super_admin"
        >
          <SuperAdminLayout>
            <SuppliersPage />
          </SuperAdminLayout>
        </ProtectedRoute>
      }
    />
    <Route
      path="/super-admin/inventory"
      element={
        <SuperAdminLayout>

          <InventoryPage
            medicines={filteredMedicines}
            search={search}
            setSearch={setSearch}
          />

        </SuperAdminLayout>
      }
    />

    <Route
      path="/super-admin/stock-in"
      element={
        <SuperAdminLayout>
          <StockInPage />
        </SuperAdminLayout>
      }
    />

    <Route
      path="/super-admin/stock-out"
      element={
        <SuperAdminLayout>
          <StockOutPage />
        </SuperAdminLayout>
      }
    />

    <Route
      path="/super-admin/forecast"
      element={
        <SuperAdminLayout>
          <ForecastPage />
        </SuperAdminLayout>
      }
    />

    <Route
      path="/super-admin/reorder"
      element={
        <SuperAdminLayout>
          <ReorderPage />
        </SuperAdminLayout>
      }
    />

    <Route
      path="/super-admin/settings"
      element={
        <SuperAdminLayout>
          <SettingsPage />
        </SuperAdminLayout>
      }
    />
    <Route
      path="/supplier/dashboard"
      element={
        <ProtectedRoute
          allowedRole="supplier"
        >
          <SupplierDashboardPage />
        </ProtectedRoute>
      }
    />
    <Route
      path="/admin/stock-in"
      element={
        <ProtectedRoute
          allowedRole="admin"
        >

          <AdminLayout>
            <StockInPage />
          </AdminLayout>
        </ProtectedRoute>
      }
    />

    <Route
      path="/admin/stock-out"
      element={
        <ProtectedRoute
          allowedRole="admin"
        >

          <AdminLayout>
            <StockOutPage />
          </AdminLayout>
        </ProtectedRoute>
      }
    />
  </Routes>
)
}

export default App