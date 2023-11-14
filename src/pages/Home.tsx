import Artwork from "../components/Artwork"
import Navbar from "../components/Navbar"
import Sidebar from "../components/sidebar/Sidebar"

const Home = () => {

    return <div className="flex flex-col">
        <div className="flex flex-grow">
            <Sidebar />
            <div className="flex-grow">
                <Navbar />
                <Artwork />
            </div>
        </div>
    </div>
}

export default Home
