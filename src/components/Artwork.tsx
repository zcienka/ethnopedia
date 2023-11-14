import { useQuery } from "react-query"
import { getArtworks } from "../api/artworks"
import LoadingPage from "../pages/LoadingPage"
import { v4 as uuidv4 } from "uuid"
import Category from "./Category"
import Table from "./Table"
import Row from "./table/Row"

const Artwork = () => {
    const { data: fetchedData } = useQuery(
        ["artwork"],
        getArtworks,
    )

    const categoryColorList = [
        "indigo",
        "cyan",
        "pink",
    ]

    if (fetchedData === undefined) {
        return <LoadingPage />
    } else {
        const allArtworks = fetchedData.artworks.map((artwork: any, index: number) => {
            const rowNames = fetchedData.columnNames.map((columnName: string) => {
                if (columnName === "Kategoria") {
                    const color = categoryColorList[index]
                    return <td className="px-4 py-3" key={columnName}>
                        <Category name={artwork[columnName]} color={color} />
                    </td>
                } else {
                    return <td className="px-4 py-3" key={uuidv4()}>
                            {artwork[columnName]}
                        </td>
                }
            })

            return <Row columnNames={rowNames} navigationPath={`/artwork/${artwork._id}`} />
        })

        return <Table fetchedData={fetchedData} tableRows={allArtworks} />
    }
}

export default Artwork
