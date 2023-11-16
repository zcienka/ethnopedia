import AlbumCover from "../assets/images/album-cover.png"

const GridItem = () => {
    return (
        <section className="bg-gray-50 dark:bg-gray-900 p-3 sm:p-5 h-full cursor-pointer">
            <div className="grid grid-flow-col auto-cols-max gap-4">
                <div className="shadow-lg rounded-lg overflow-hidden w-64">
                    <img className="h-auto w-full" src={AlbumCover} alt="Album Cover" />
                    <div className="p-4">
                        <p className="text-xl font-semibold">Album/Song Title 1</p>
                        <p className="text-gray-600">Artist Name 1</p>
                    </div>
                </div>

                <div className="shadow-lg rounded-lg overflow-hidden w-64">
                    <img className="h-auto w-full" src={AlbumCover} alt="Album Cover" />
                    <div className="p-4">
                        <p className="text-xl font-semibold">Album/Song Title 2</p>
                        <p className="text-gray-600">Artist Name 2</p>
                    </div>
                </div>
            </div>
        </section>
    )
}
export default GridItem
