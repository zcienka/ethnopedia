import React from "react"
import {Route, BrowserRouter, Routes} from "react-router-dom"
import Home from "./pages/Home"
import MetadataForm from "./forms/MetadataForm"

const App = () => {
    const electron = (window as any).electron

    // return <div className="flex flex-row font-black">
    //     homedir: {electron.homeDir()}
    // </div>
    return <BrowserRouter>
        <Routes>
            {/*<Route path="/" element={<Home/>} />*/}
            <Route path="/" element={<MetadataForm/>} />
        </Routes>
    </BrowserRouter>

}

export default App
