import React from "react"

interface EditingState {
    isEditing: boolean;
    editingIndex: number | null;
    editValue: string;
}

interface SelectedDetail {
    category: any;
    subcategories: Subcategory[];
    collection: string
    values?: string[]
    date: string
}

interface SubcategoryComponentProps {
    subcatIndex: number;
    editingState: EditingState;
    handleChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
    handleBlur: () => void;
    inputRef?: React.RefObject<HTMLTextAreaElement>;
    handleDoubleClick: (index: number | null, name: string) => void;
    selectedDetail: SelectedDetail;
    setSelectedDetail: React.Dispatch<React.SetStateAction<{ [key: string]: SelectedDetail }>>;
}

interface Subcategory {
    name: string;
    values?: string[];
    subcategories?: Subcategory[];
}

const SubcategoryComponent: React.FC<SubcategoryComponentProps> = ({
                                                                       subcatIndex,
                                                                       // subcatDetail,
                                                                       editingState,
                                                                       handleChange,
                                                                       handleBlur,
                                                                       inputRef,
                                                                       handleDoubleClick,
                                                                       selectedDetail
                                                                   }) => {


    return (
        <>
            {editingState.isEditing && editingState.editingIndex === subcatIndex ? (
                <div
                    className="flex flex-row items-center w-fit border border-gray-300 rounded-md px-2 py-1 shadow-md mt-2">
          <textarea
              ref={inputRef}
              className="border-none h-fit w-96"
              value={editingState.editValue}
              onChange={handleChange}
              onBlur={handleBlur}
              autoFocus></textarea>
                </div>
            ) : (
                <div>{subcatIndex}</div>
                // <div className="flex flex-row items-center border border-gray-300 rounded-md px-2 py-1 shadow-md mt-2"
                //      onDoubleClick={() => handleDoubleClick(subcatIndex, subcatDetail.name)}>
                //     <p className="w-full">{subcatDetail.name === "" ? "Wybierz podkategorię" : subcatDetail.name}</p>
                // </div>
            )}
        </>
    )
}

export default SubcategoryComponent