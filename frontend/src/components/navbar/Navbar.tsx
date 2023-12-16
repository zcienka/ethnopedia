import React, { useState } from "react"
import { useNavigate } from "react-router-dom"
import ToggleTheme from "./ToggleTheme"
import { ReactComponent as UserIcon } from "../../assets/icons/user-icon.svg"
import { deleteAccount } from "../../api/auth"
import { useMutation } from "react-query"
import { useUser } from "../../providers/UserProvider"
import WarningPopup from "../../pages/collections/WarningPopup"

const Navbar = () => {
    const { isUserLoggedIn, firstName, userId, jwtToken } = useUser()
    const [isDropdownOpen, setIsDropdownOpen] = useState(false)
    const [showDeleteAccountWarning, setShowDeleteAccountWarning] = useState(false)
    const navigate = useNavigate()
    const { setUserData } = useUser()
    const handleLogout = () => {
        setIsDropdownOpen(false)
        setShowDeleteAccountWarning(false)
        localStorage.removeItem("token")
        setUserData(false, "", "", "")
        navigate("/")
    }

    const handleAccountDeletion = () => {
        if (!jwtToken) {
            return
        }
        mutation.mutate()
    }

    const mutation = useMutation(() => deleteAccount(userId, jwtToken as string), {
        onSuccess: () => {
            handleLogout()
        },
    })

    return <nav className="bg-white border-gray-200 dark:bg-gray-900 w-full border-b dark:border-gray-600">
        {showDeleteAccountWarning && <WarningPopup onClose={() => setShowDeleteAccountWarning(!showDeleteAccountWarning) }
                                                   deleteSelected={handleAccountDeletion}
                                                   warningMessage={"Czy na pewno chcesz usunąć konto?"}/>}
        <div className="max-w-screen-xl flex flex-wrap justify-between mx-auto p-4">
            <div className="flex items-center md:order-2">
                <ToggleTheme />
                {isUserLoggedIn ? <>
                        <div onClick={() => setIsDropdownOpen(!isDropdownOpen)} className="rounded-full bg-gray-300
                        p-3 cursor-pointer">
                            <UserIcon />
                        </div>
                        <h2 className="font-semibold ml-2 text-lg">{firstName}</h2>
                    </> :
                    <>
                        <button type="button"
                                className="mr-2 bg-blue-500 hover:bg-blue-400 font-semibold text-white border-none"
                                onClick={() => navigate("/login")}>
                            Zaloguj się
                        </button>
                        <button type="button"
                                className="bg-blue-500 hover:bg-blue-400 font-semibold text-white border-none"
                                onClick={() => navigate("/register")}>
                            Zarejestruj się
                        </button>
                    </>}
                {isDropdownOpen && (
                    <div
                        className="absolute max-w-screen-xl mt-48 w-48 ml-16 bg-white divide-y divide-gray-300 rounded-lg
                        shadow dark:bg-gray-700 dark:divide-gray-600 border border-gray-300">
                        <div className="px-4 py-3">
                            <span className="block text-sm dark:text-white">{firstName}</span>
                        </div>
                        <ul className="py-2">
                            <li>
                                <div onClick={() => setShowDeleteAccountWarning(true)}
                                     className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100
                                        dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white cursor-pointer">
                                    Usuń konto
                                </div>
                            </li>
                            <li>
                                <div onClick={handleLogout}
                                     className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100
                                        dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white cursor-pointer">
                                    Wyloguj się
                                </div>
                            </li>
                        </ul>
                    </div>
                )}
            </div>
            <div className="items-center justify-between hidden w-full md:flex md:w-auto md:order-1" id="navbar-user">
            </div>
        </div>
    </nav>
}
export default Navbar