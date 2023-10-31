import React from "react"
import { Route, BrowserRouter, Routes } from "react-router-dom"
import Home from "./pages/Home"
import MetadataForm from "./forms/MetadataForm"
import { QueryClient, QueryClientProvider } from "react-query"

const queryClient = new QueryClient()


const App = () => {
    const electron = (window as any).electron

    // return <div className="flex flex-row font-black">
    //     homedir: {electron.homeDir()}
    // </div>

    return <QueryClientProvider client={queryClient}>
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Home />} />
                {/*<Route path="/" element={<MetadataForm/>} />*/}
            </Routes>
        </BrowserRouter>
    </QueryClientProvider>
}

export default App
