function SupplierDashboardPage() {
    return (
        <div className="space-y-6">

            <h1 className="text-4xl font-black text-[#4a044e]">
                Supplier Portal
            </h1>

            <p className="text-slate-500">
                Kelola permintaan dan pengiriman obat
            </p>

            <div className="grid grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">

                <div className="bg-white p-6 rounded-3xl">
                    <h3>Permintaan Aktif</h3>
                    <p className="text-5xl font-black text-orange-600">
                        12
                    </p>
                </div>

                <div className="bg-white p-6 rounded-3xl">
                    <h3>Pengiriman</h3>
                    <p className="text-5xl font-black text-blue-600">
                        7
                    </p>
                </div>

                <div className="bg-white p-6 rounded-3xl">
                    <h3>Partner RS</h3>
                    <p className="text-5xl font-black text-green-600">
                        15
                    </p>
                </div>

            </div>

        </div>
    )
}

export default SupplierDashboardPage