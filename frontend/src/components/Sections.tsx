import Table from "./Table"
import { useQuery } from "react-query"
import { getSections } from "../api/sections"
import LoadingPage from "../pages/LoadingPage"
import { v4 as uuidv4 } from "uuid"

const Sections = () => {
    const { data: fetchedData } = useQuery(
        ["section"],
        getSections,
    )

    if (fetchedData === undefined) {
        return <LoadingPage />
    } else {
        const allSections = fetchedData.sections.map((section: any) => {
            const rowNames = fetchedData.sections.map(() => {
                    return <td className="px-4 py-3" key={uuidv4()}>
                        {section.Name}
                    </td>
                }
            )[0]
        })

        return <div>
            <Table fetchedData={fetchedData} tableRows={allSections} />
        </div>
    }
}

export default Sections