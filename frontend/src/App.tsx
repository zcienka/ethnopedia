import React from "react"
import { Route, BrowserRouter, Routes } from "react-router-dom"
import { QueryClient, QueryClientProvider } from "react-query"
import LoginPage from "./pages/LoginPage"
import Home from "./pages/Home"
import "./index.css"
import Categories from "./pages/Categories"
import ArtworkPage from "./pages/artworks/ArtworkPage"
import NotFoundPage from "./pages/NotFoundPage"
import Artworks from "./components/artwork/Artworks"
import RegisterPage from "./pages/RegisterPage"
import { UserProvider } from "./providers/UserProvider"
import CreateArtwork from "./components/artwork/CreateArtwork"
import CreateCollectionStructure from "./pages/collections/CreateCollectionStructure"

const queryClient = new QueryClient()

const App = () => {
    // const electron = (window as any).electron

    // return <div className="flex flex-row font-black">
    //     homedir: {electron.homeDir()}
    // </div>

    return <div className="dark:text-white min-h-screen bg-gray-50 dark:bg-gray-900">
        <UserProvider>
            <QueryClientProvider client={queryClient}>
                <BrowserRouter>
                    <Routes>
                        <Route path="/collections/:collection/artworks/:artworkId" element={<ArtworkPage />} />
                        <Route path="/collections/:collection/create-artwork" element={<CreateArtwork />} />
                        <Route path="/collections/create" element={<CreateCollectionStructure />} />

                        <Route path="/" element={<Home />} />
                        <Route path="/collections/:collection/artworks" element={<Artworks />} />
                        <Route path="/categories/:collectionName" element={<Categories />} />

                        <Route path="/login" element={<LoginPage />} />
                        <Route path="/register" element={<RegisterPage />} />

                        <Route path="*" element={<NotFoundPage />} />
                    </Routes>
                </BrowserRouter>
            </QueryClientProvider>
        </UserProvider>
    </div>

}

export default App
