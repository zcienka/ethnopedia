import Table from "../components/Table"
import Navbar from "../components/Navbar"
import Sidebar from "../components/Sidebar"

const Home = () => {

    return <div className="flex flex-col">
        <div className="flex flex-grow">
            <Sidebar />
            <div className="flex-grow">
                <Navbar />
                <Table />
            </div>
        </div>
    </div>
}

export default Home
