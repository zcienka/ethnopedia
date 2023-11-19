import { v4 as uuidv4 } from "uuid"
import { useNavigate } from "react-router-dom"

type Props = {
    columnNames: any[],
    navigationPath: string
}
const Row = ({ columnNames, navigationPath }: Props) => {
    const navigate = useNavigate()

    return <tr className="border-b dark:border-gray-700 cursor-pointer"
               key={uuidv4()}
               onClick={() => navigate(navigationPath)}>
        <th scope="col" className="p-4">
            <div className="flex items-center">
                <input id="checkbox-all-search" type="checkbox"
                       className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500
                                dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800
                                focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                <label htmlFor="checkbox-all-search" className="sr-only">
                    checkbox
                </label>
            </div>
        </th>
        {columnNames}
    </tr>
}
export default Row