import { getCategories } from "../api/categories"
import { useQuery } from "react-query"
import { useParams } from "react-router-dom"
import { ReactNode } from "react"

interface FetchDataWrapperProps {
    children: (props: {
        id: string | undefined,
        categoriesData: any,
        isSuccess: boolean
    }) => ReactNode;
}

const FetchDataWrapper: React.FC<FetchDataWrapperProps> = ({ children }) => {
    const { collection: id } = useParams<string>()
    const { data: categoriesData, isSuccess } = useQuery(
        ["allCategories", id],
        () => getCategories(id as string),
        { enabled: !!id },
    )

    return <>{children({ id, categoriesData, isSuccess })}</>
}
export default FetchDataWrapper