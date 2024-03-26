import CustomTextField from "../../CustomTextField"

interface Record {
    subcategoryName: string;
    setSubcategoryName: (name: string) => void;
}

interface Props {
    record: Record;
}

const SubcategoryNameField: React.FC<Props> = ({ record }) => (
    <CustomTextField
        columnName="subcategoryName"
        value={record.subcategoryName}
        onInputChange={(value) => record.setSubcategoryName(value)}
    />
)

export default SubcategoryNameField
