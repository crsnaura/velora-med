import { Link } from 'react-router-dom'
function StatsCard({
    title,
    value,
    icon,
    gradient,
    link
}) {

    return (

        <Link
            to={link || '#'}
            className={`
        block
        p-7
        rounded-[30px]
        text-white

        shadow-[0_15px_35px_rgba(0,0,0,0.12)]

        hover:-translate-y-2
        hover:scale-[1.02]

        transition-all
        duration-500

        cursor-pointer

        ${gradient}
    `}
        >
            <div className="flex justify-between items-start">

                <div>

                    <p className="text-sm text-white/70 mb-3 tracking-wide">
                        {title}
                    </p>

                    <h1 className="text-5xl font-black tracking-tight">
                        {value}
                    </h1>

                    <p className="text-xs text-white/70 mt-2">
                        View details →
                    </p>

                </div>

                <div
                    className="
            w-14 h-14
            rounded-2xl
            bg-white/15
            backdrop-blur-md
            flex
            items-center
            justify-center
            text-2xl
            shadow-inner
          "
                >
                    {icon}
                </div>

            </div>

        </Link>

    )
}

export default StatsCard