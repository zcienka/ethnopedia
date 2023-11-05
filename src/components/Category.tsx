interface Props {
    name: string
    color: string
}

const Category = ({ name, color }: Props) => {
    console.log(color)
    const textColorClass = `text-emerald-200`
    return <span
        className={`inline-flex items-center ${textColorClass} text-xs mr-2 px-3 py-3 font-bold rounded-full`}
    >
        {name}
    </span>
}
export default Category
