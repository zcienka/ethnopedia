import SampleAvatar from "../../assets/images/sample-avatar.jpg"
import { useState } from "react"
import ToggleTheme from "./ToggleTheme"
import { useNavigate } from "react-router-dom"

const Navbar = () => {
    const [isUserLoggedIn] = useState(false)
    const navigate = useNavigate()

    return <nav className="bg-white border-gray-200 dark:bg-gray-900 w-full border-b shadow-md dark:border-gray-700">
        <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
            <div className="flex items-center md:order-2">
                <ToggleTheme />
                {isUserLoggedIn ? <button type="button"
                                          className="flex mr-3 text-sm bg-gray-800 rounded-full md:mr-0 focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600"
                                          id="user-menu-button" aria-expanded="false"
                                          data-dropdown-toggle="user-dropdown"
                                          data-dropdown-placement="bottom">
                        <span className="sr-only">Open user menu</span>
                        <img className="w-8 h-8 rounded-full" src={SampleAvatar} alt="avatar" />
                    </button> :
                    <>
                        <button type="button"
                                className="mr-2 bg-sky-500 hover:bg-sky-400 font-semibold text-white border-none"
                                onClick={() => navigate("/login")}>
                            Zaloguj się
                        </button>
                        <button type="button"
                                className="bg-sky-500 hover:bg-sky-400 font-semibold text-white border-none"
                                onClick={() => navigate("/register")}>
                            Zarejestruj się
                        </button>
                    </>}
                <div
                    className="z-50 hidden my-4 text-base list-none bg-white divide-y divide-gray-100 rounded-lg shadow dark:bg-gray-700 dark:divide-gray-600"
                    id="user-dropdown">
                    <div className="px-4 py-3">
                        <span className="block text-sm dark:text-white">
                            Bonnie Green
                        </span>
                        <span
                            className="block text-sm  text-gray-500 truncate dark:text-gray-400">name@flowbite.com</span>
                    </div>
                    <ul className="py-2" aria-labelledby="user-menu-button">
                        <li>
                            <div
                                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">Dashboard
                            </div>
                        </li>
                        <li>
                            <div
                                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">Settings
                            </div>
                        </li>
                        <li>
                            <div
                                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">Earnings
                            </div>
                        </li>
                        <li>
                            <div
                                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">Sign
                                out
                            </div>
                        </li>
                    </ul>
                </div>
                <button data-collapse-toggle="navbar-user" type="button"
                        className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
                        aria-controls="navbar-user" aria-expanded="false">
                    <span className="sr-only">Open main menu</span>
                    <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none"
                         viewBox="0 0 17 14">
                        <path stroke="currentColor"
                              d="M1 1h15M1 7h15M1 13h15" />
                    </svg>
                </button>
            </div>
            <div className="items-center justify-between hidden w-full md:flex md:w-auto md:order-1" id="navbar-user">
            </div>
        </div>
    </nav>

}
export default Navbar