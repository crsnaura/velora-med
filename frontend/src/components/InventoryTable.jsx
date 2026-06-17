function InventoryTable({ medicines, search, setSearch }) {

    return (

        <div
            className="
            bg-white/80
            backdrop-blur-xl
            p-8
            rounded-[30px]
            border
            border-pink-100
            shadow-[0_10px_40px_rgba(217,145,179,0.12)]
            hover:shadow-[0_15px_50px_rgba(217,145,179,0.18)]
            transition-all
            duration-300
        "
        >
            {/* HEADER */}
            <div className="flex justify-between items-center mb-6">

                <div>
                    <h2 className="text-3xl font-black text-[#4a044e] tracking-tight">
                        Inventory Medis
                    </h2>

                    <p className="text-sm text-slate-400 mt-1">
                        Monitoring stok obat & status prediksi AI
                    </p>
                </div>

            </div>

            {/* SEARCH */}
            <div className="relative mb-6">

                <input
                    type="text"
                    placeholder="Cari nama obat..."
                    className="
            w-full
            bg-[#fff7fa]
            border
            border-pink-100
            rounded-2xl
            px-5
            py-4
            outline-none
            focus:ring-2
            focus:ring-pink-200
            transition-all
            duration-300
            text-sm
            placeholder:text-slate-400
          "
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />

            </div>

            {/* TABLE */}
            <div className="overflow-hidden rounded-2xl border border-pink-100">

                <table className="w-full">

                    <thead className="bg-[#fff1f5]">

                        <tr className="text-left">

                            <th className="px-6 py-5 text-xs uppercase tracking-wider text-[#9f1239] font-bold">
                                Nama Obat
                            </th>

                            <th className="px-6 py-5 text-xs uppercase tracking-wider text-[#9f1239] font-bold">
                                Stok
                            </th>

                            <th className="px-6 py-5 text-xs uppercase tracking-wider text-[#9f1239] font-bold">
                                Status
                            </th>
                            <th className="px-6 py-5 text-xs uppercase tracking-wider text-[#9f1239] font-bold">
                                AI Prediction
                            </th>

                            <th className="px-6 py-5 text-xs uppercase tracking-wider text-[#9f1239] font-bold">
                                Action
                            </th>

                        </tr>

                    </thead>

                    <tbody className="bg-white">

                        {(medicines || []).map((medicine, index) => (

                            <tr
                                key={`${medicine.item_name}-${index}`}
                                className="
                  border-b
                  border-pink-50
                  hover:bg-pink-50/40
                  transition-all
                  duration-200
                "
                            >

                                <td className="px-6 py-5 font-semibold text-[#4a044e]">
                                    {medicine.item_name}
                                </td>

                                <td className="px-6 py-5 font-medium text-slate-500">
                                    {medicine.current_stock}
                                </td>

                                <td className="px-6 py-5">

                                    <span
                                        className={
                                            medicine.stock_status === 'Critical'
                                                ? 'px-4 py-2 rounded-xl bg-red-100 text-red-700 text-xs font-bold'
                                                : medicine.stock_status === 'Warning'
                                                    ? 'px-4 py-2 rounded-xl bg-yellow-100 text-yellow-700 text-xs font-bold'
                                                    : 'px-4 py-2 rounded-xl bg-green-100 text-green-700 text-xs font-bold'
                                        }
                                    >
                                        {medicine.stock_status}
                                    </span>

                                </td>
                                <td className="px-6 py-5">

                                    {
                                        medicine.stock_status === 'Critical' ? (

                                            <span className="text-red-600 font-bold">
                                                🔴 Stockout Risk
                                            </span>

                                        ) : medicine.stock_status === 'Warning' ? (

                                            <span className="text-yellow-600 font-bold">
                                                🟡 Reorder Soon
                                            </span>

                                        ) : (

                                            <span className="text-green-600 font-bold">
                                                🟢 Stable
                                            </span>

                                        )
                                    }

                                </td>
                                <td className="px-6 py-5">

                                    {
                                        medicine.stock_status === 'Critical' ? (

                                            <button
                                                className="
                bg-red-500
                text-white
                px-4
                py-2
                rounded-xl
                text-sm
                font-semibold
                "
                                            >
                                                Reorder Now
                                            </button>

                                        ) : medicine.stock_status === 'Warning' ? (

                                            <button
                                                className="
                bg-yellow-500
                text-white
                px-4
                py-2
                rounded-xl
                text-sm
                font-semibold
                "
                                            >
                                                Monitor
                                            </button>

                                        ) : (

                                            <button
                                                className="
                bg-green-500
                text-white
                px-4
                py-2
                rounded-xl
                text-sm
                font-semibold
                "
                                            >
                                                Healthy
                                            </button>

                                        )
                                    }

                                </td>
                            </tr>

                        ))}

                    </tbody>

                </table>

            </div>

        </div>

    )
}

export default InventoryTable