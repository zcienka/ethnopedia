import Table from "../components/Table"
import Navbar from "../components/Navbar"
import Sidebar from "../components/Sidebar"
import { useEffect, useState } from "react"

const Home = () => {

    return <div className="flex flex-col">
        <div className="flex flex-row flex-grow">
            <Sidebar />
            <div className="flex flex-grow flex-col">
                <Navbar />
                <Table />
            </div>
        </div>
    </div>
}

export default Home
