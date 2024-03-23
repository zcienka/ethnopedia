import React from "react"

export interface Subcategory {
    name: string;
    values: string[];
    subcategories?: Subcategory[];
}

export interface EditingState {
    isEditing: boolean
    editingIndex: number | null
    editValue: string
}

export interface SelectedDetail {
    category: any
    subcategories: Subcategory[]
    collection: string
    values?: string[]
    date: string
}

export interface SubcategoryListProps {
    identifier: string
    subcategories: Subcategory[]

    selectedDetail: SelectedDetail;
    selectedDetails: { [key: string]: SelectedDetail };
    setSelectedDetails: React.Dispatch<React.SetStateAction<{ [key: string]: SelectedDetail }>>;

    editingState: EditingState
    handleDoubleClick: (index: number, name: string) => void
    handleChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void
    handleBlur: () => void
    deleteSubcategory: (identifier: string, index: number) => void
    inputRef: React.RefObject<HTMLTextAreaElement>
    handleSubcategoryChange: (identifier: string, index: number, value: string) => void
    setEditingState: React.Dispatch<React.SetStateAction<EditingState>>
}

export interface RecursiveSubcategoryProps {
    subcategories: Subcategory[];
    addSubcategory: (path: number[]) => void;
    addValueToSubcategory: (path: number[], newValue: string, index?: number) => void;
    deleteSubcategory: (path: number[]) => void;
    path?: number[];
    handleSubcategoryNameChange: (path: number[], newName: string) => void;
    toggleDropdown: (path: number[]) => void;
    isDropdownVisible: (path: number[]) => boolean;
    addDropdownOption: (path: number[], newOption: string, row: number, index: number) => void;
    replaceValuesInSubcategory: (path: number[], newValues: string[]) => void;
    values: string[];
    setValues: React.Dispatch<React.SetStateAction<string[]>>;
    onOpenRenameModal?: (path: number[], values: string[]) => void;
    modalState: ModalState;
    setModalState: React.Dispatch<React.SetStateAction<ModalState>>;
}

export interface ModalState {
    isOpen: boolean
    data: {
        values: string[]
        path: number[]
        index: number
    }
}

