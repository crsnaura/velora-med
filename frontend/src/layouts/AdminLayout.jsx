import Sidebar from '../components/Sidebar'

function AdminLayout({
    children
}) {
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

            <Sidebar />

            <div className="flex-1 p-8">
                {children}
            </div>

        </div>
    )
}

export default AdminLayout