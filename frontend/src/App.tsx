import React from "react"
import { Route, BrowserRouter, Routes } from "react-router-dom"
import { QueryClient, QueryClientProvider } from "react-query"
import LoginPage from "./pages/LoginPage"
import Home from "./pages/Home"
import ArtworkEdit from "./components/artwork/ArtworkEdit"
import "./index.css"
import Sections from "./components/Sections"
import Subsections from "./components/Subsections"
import Categories from "./pages/Categories"
import ArtworkView from "./pages/ArtworkView"
import NotFoundPage from "./pages/NotFoundPage"
import Artworks from "./components/artwork/Artworks"

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
                    {/*<Route path="/" element={<LandingPage/>} />*/}
                    <Route path="/artwork/:artworkId/edit" element={<ArtworkEdit />} />
                    <Route path="/artwork/:artworkId" element={<ArtworkView />} />
                    <Route path="/sections" element={<Sections />} />
                    <Route path="/subsections" element={<Subsections />} />

                    <Route path="/" element={<Artworks />} />
                    {/*<Route path="/" element={<Home />} />*/}
                    <Route path="/categories/:collectionName" element={<Categories />} />
                    <Route path="/login" element={<LoginPage />} />

                    <Route path="/:artworkId" element={<ArtworkView />} />

                    <Route path="*" element={<NotFoundPage/>} />
                </Routes>
            </BrowserRouter>
        </QueryClientProvider>
    </div>

}

export default App
