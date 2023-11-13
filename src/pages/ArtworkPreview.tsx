import { useParams } from "react-router-dom"
import { useQuery } from "react-query"
import { getArtwork, getArtworks } from "../api/artworks"
import LoadingPage from "./LoadingPage"
import { v4 as uuidv4 } from "uuid"
import Category from "../components/Category"

const ArtworkPreview = () => {
    const { artworkId } = useParams<string>()

    const { data: fetchedData } = useQuery({
        queryKey: ["artwork", artworkId],
        queryFn: () => getArtwork(artworkId),
    })




    if (fetchedData === undefined) {
        return <LoadingPage />
    } else {
        const artwork = fetchedData.columnNames.map((columnName: string) => {
            if (columnName === "Kategoria") {
                return <td className="px-4 py-3" key={uuidv4()}>
                    <Category name={fetchedData[columnName]} color={"red"} />
                </td>
            } else {
                return (
                    <td className="px-4 py-3" key={uuidv4()}>
                        {fetchedData.artwork[columnName]}
                    </td>
                )
            }
        })

        return <>
            <div>
                {fetchedData._id}
                {artwork}
            </div>
        </>
    }

}
export default ArtworkPreview