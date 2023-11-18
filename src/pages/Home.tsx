import Navbar from "../components/Navbar"
import Sidebar from "../components/sidebar/Sidebar"
import CollectionsPage from "./CollectionsPage"
import SearchComponent from "../components/search/SearchComponent"
import React from "react"

const Home = () => {
    return <div className="flex flex-col">
        <div className="flex flex-grow">
            <div className="flex-grow">
                <Navbar />
                <CollectionsPage />
            </div>
        </div>
    </div>
}

export default Home
