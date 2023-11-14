import React from "react"
import { Route, BrowserRouter, Routes } from "react-router-dom"
import { QueryClient, QueryClientProvider } from "react-query"
import LoginPage from "./pages/LoginPage"
import Home from "./pages/Home"
import ArtworkPreview from "./pages/ArtworkPreview"
import "./index.css"

const queryClient = new QueryClient()

const App = () => {
    const electron = (window as any).electron

    // return <div className="flex flex-row font-black">
    //     homedir: {electron.homeDir()}
    // </div>

    return <div className="dark:text-white">
        <QueryClientProvider client={queryClient}>
            <BrowserRouter>
                <Routes>
                    {/*<Route path="/" element={<LoginPage />} />*/}
                    {/*<Route path="/" element={<LandingPage/>} />*/}
                    <Route path="/artwork/:artworkId" element={<ArtworkPreview />} />
                    <Route path="/" element={<Home />} />
                    <Route path="/login" element={<LoginPage />} />
                </Routes>
            </BrowserRouter>
        </QueryClientProvider>
    </div>

}

export default App
