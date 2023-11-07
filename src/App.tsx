import React from "react"
import { Route, BrowserRouter, Routes } from "react-router-dom"
import { QueryClient, QueryClientProvider } from "react-query"
import LoginPage from "./pages/LoginPage"
import "./i18n"
import "i18next"
import Home from "./pages/Home"
import LandingPage from "./pages/LandingPage"

const queryClient = new QueryClient()

const App = () => {
    const electron = (window as any).electron

    // return <div className="flex flex-row font-black">
    //     homedir: {electron.homeDir()}
    // </div>

    return <QueryClientProvider client={queryClient}>
        <BrowserRouter>
            <Routes>
                {/*<Route path="/" element={<LoginPage />} />*/}
                {/*<Route path="/" element={<LandingPage/>} />*/}
                <Route path="/" element={<Home />} />
            </Routes>
        </BrowserRouter>
    </QueryClientProvider>
}

export default App
