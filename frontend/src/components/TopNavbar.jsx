function TopNavbar() {
  return (

    <div className="flex justify-between items-center mb-8">

      <div>
        <h1 className="text-4xl font-bold">
          AI Healthcare Analytics Dashboard
        </h1>

        <p className="text-gray-500 mt-1">
          Monitoring stok obat rumah sakit
        </p>
      </div>

      <div className="flex items-center gap-4">

        {/* SEARCH */}
        <div
          className="bg-gradient-to-r from-[#d991b3] to-[#b76e79] hover:opacity-90 transition-all duration-300 text-white px-5 py-3 rounded-xl shadow-sm">
          National Healthcare Supply Chain Monitoring
        </div>
        {/* PROFILE */}
        <div className="bg-gradient-to-r from-[#d991b3] to-[#b76e79] hover:opacity-90 transition-all duration-300 text-white px-5 py-3 rounded-xl shadow-sm">
          Admin
        </div>

      </div>

    </div>

  )
}

export default TopNavbar