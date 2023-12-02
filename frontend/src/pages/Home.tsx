import Navbar from "../components/navbar/Navbar"
import CollectionsPage from "./CollectionsPage"
import React from "react"

const Home = () => {
    return <div className="flex flex-col">
        <div className="flex-grow">
            <Navbar />
            <CollectionsPage />
        </div>
    </div>
}

export default Home
