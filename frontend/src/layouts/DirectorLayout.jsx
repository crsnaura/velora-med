import DirectorSidebar from '../components/DirectorSidebar'

function DirectorLayout({ children }) {

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

            <DirectorSidebar />

            <div className="flex-1 p-8">

                {children}

            </div>

        </div>

    )

}

export default DirectorLayout