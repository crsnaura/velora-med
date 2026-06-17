import { useState, useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { AuthContext } from '../../context/AuthContext'
import axios from 'axios'

function LoginPage() {

    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [showPassword, setShowPassword] = useState(false)
    const [error, setError] = useState('')

    const { login } = useContext(AuthContext)

    const navigate = useNavigate()

    const handleLogin = async (e) => {

        e.preventDefault()

        try {

            const response = await axios.post(
                'http://127.0.0.1:8000/api/login',
                {
                    username,
                    password
                }
            )

            const userData =
                response.data

            login(
                userData
            )

            if (
                userData.role === 'admin'
            ) {

                navigate(
                    '/admin/dashboard'
                )

                return
            }

            if (
                userData.role === 'director'
            ) {

                navigate(
                    '/director/dashboard'
                )

                return
            }

            if (
                userData.role === 'super_admin'
            ) {

                navigate(
                    '/super-admin/dashboard'
                )

                return
            }

            setError(
                'Role tidak dikenali'
            )

        }
        catch (error) {

            setError(
                'Username atau password salah'
            )

        }
    }

    return (

        <div className="min-h-screen bg-[#fff7fa] flex items-center justify-center">

            <div
                className="
                    bg-white
                    w-full
                    max-w-md
                    p-10
                    rounded-3xl
                    shadow-lg
                    border
                    border-pink-100
                "
            >

                <div className="mb-8 text-center">

                    <h1
                        className="
                            text-4xl
                            font-black
                            text-[#4a044e]
                        "
                    >
                        Velora Med
                    </h1>

                    <p className="text-slate-500 mt-2">
                        AI Healthcare Analytics
                    </p>

                </div>

                {error && (

                    <div
                        className="
                            bg-red-50
                            border
                            border-red-200
                            text-red-600
                            p-3
                            rounded-xl
                            mb-5
                        "
                    >
                        {error}
                    </div>

                )}

                <form
                    onSubmit={handleLogin}
                    className="space-y-5"
                >

                    <div>

                        <label className="block mb-2 text-sm font-medium">
                            Username
                        </label>

                        <input
                            type="text"
                            value={username}
                            onChange={(e) =>
                                setUsername(e.target.value)
                            }
                            className="
                                w-full
                                border
                                border-pink-200
                                rounded-xl
                                p-3
                                outline-none
                            "
                            placeholder="Masukkan username"
                        />

                    </div>

                    <div>

                        <label className="block mb-2 text-sm font-medium">
                            Password
                        </label>

                        <div className="relative">

                            <input
                                type={
                                    showPassword
                                        ? 'text'
                                        : 'password'
                                }
                                value={password}
                                onChange={(e) =>
                                    setPassword(e.target.value)
                                }
                                className="
                                    w-full
                                    border
                                    border-pink-200
                                    rounded-xl
                                    p-3
                                    outline-none
                                "
                                placeholder="Masukkan password"
                            />

                            <button
                                type="button"
                                onClick={() =>
                                    setShowPassword(
                                        !showPassword
                                    )
                                }
                                className="
                                    absolute
                                    right-3
                                    top-3
                                    text-sm
                                    text-[#6d214f]
                                "
                            >
                                {showPassword
                                    ? 'Hide'
                                    : 'Show'}
                            </button>

                        </div>

                    </div>

                    <button
                        type="submit"
                        className="
                            w-full
                            py-3
                            rounded-xl
                            bg-[#6d214f]
                            text-white
                            font-bold
                            hover:opacity-90
                        "
                    >
                        Login
                    </button>

                </form>

                <p className="text-center text-xs text-slate-400 mt-6">
                    AI Healthcare Supply Chain Platform
                </p>

            </div>

        </div>

    )
}

export default LoginPage