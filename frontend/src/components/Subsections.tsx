import { useQuery } from "react-query"
import { getSections } from "../api/sections"
import LoadingPage from "../pages/LoadingPage"
import { v4 as uuidv4 } from "uuid"
import Table from "./Table"
import { getSubsections } from "../api/subsections"

const Subsections = () => {
    const { data: fetchedData } = useQuery(
        ["subsection"],
        getSubsections,
    )

    if (fetchedData === undefined) {
        return <LoadingPage />
    } else {
        const allSections = fetchedData.subsections.map((section: any) => {
            const rowNames = fetchedData.subsections.map(() => {
                    return <td className="px-4 py-3" key={uuidv4()}>
                        {section.Name}
                    </td>
                }
            )[0]
        })

        return <Table fetchedData={fetchedData} tableRows={allSections} />
    }
}

export default Subsections