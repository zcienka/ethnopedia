import React, { useState, ChangeEvent, FormEvent } from 'react';
import { ReactComponent as PlusIcon } from "../../assets/icons/plus.svg"
import { ReactComponent as MinusIcon } from "../../assets/icons/minus.svg";


//TODO: nie działają sugestie przy wprowadzaniu danych - działa tylko dla kategorii głównych

interface Category {
  key: string;
  value: string;
  subcategories?: Category[];
}

let example_category: Category = {
  key: "region", value: "Wielkopolska", subcategories: [
    { key: "podregion", value: "Wielkopolska Północno-Wschodnia", subcategories: [
      { key: "podpodregion", value: "podpodregion" },
    ] },
    { key: "podregion etnograficzny", value: "Szamotulskie" },
    { key: "powiat", value: "Szamotulski" }
  ]
}

let example_data: Category[] = [
  { "key": "Tytuł", "value": "tytuł utworu", "subcategories": [] },
  { "key": "Wykonawca", "value": "nazwa zespołu", "subcategories": [
    { "key": "Wykonawca nr 1", "value": "Imię Nazwisko 1" },
    { "key": "Wykonawca nr 2", "value": "Imię Nazwisko 2" } ] },
  { "key": "Region", "value": "Wielkopolska", "subcategories": [
    { "key": "Podregion", "value": "Wielkopolska Północna" },
    { "key": "Podregion etnograficzny", "value": "Szamotulskie" },
    { "key": "Powiat", "value": "Szamotulski"} ] }
]

interface FormFieldProps {
  formData: Category;
  formDataList: Category[];
  index: string;
  level: number;
  handleInputChange: (index: string, e: React.ChangeEvent<HTMLInputElement>) => void;
  handleRemove: (index: string) => void;
  handleAddSubcategory: (index: string) => void;
}

const FormField: React.FC<FormFieldProps> = ({
  formData,
  formDataList,
  index,
  level,
  handleInputChange,
  handleRemove,
  handleAddSubcategory,
}) => {
  // Generate options for the key input based on the example_data structure
  const keyOptions = example_data
    .filter((category) => !formDataList.some((data) => data.key === category.key))
    .map((category, i) => (
      <option key={i} value={category.key} />
    ));

  // Generate options for the value input based on the selected key
  const valueOptions = example_data
    .find((category) => category.key === formData.key)
    ?.subcategories?.filter((subcategory) => !formData.subcategories?.some((data) => data.key === subcategory.key))
    .map((subcategory, i) => (
      <option key={i} value={subcategory.value} />
  ));
    
  return (
    <div key={index} className="flex flex-col pb-1 mt-1 relative">
      <div className="flex items-center group">
        <label className="flex items-center">
          <input
            type="text"
            name={`key`}
            value={formData.key}
            onChange={(e) => handleInputChange(index, e)}
            placeholder={index} // TODO remove
            className="mx-2 p-2"
            list="key-options"
          />
          <datalist id="key-options">{keyOptions}</datalist>
        </label>
        <label className="flex items-center">
          <span>:</span>
          <input
            type="text"
            name={`value`}
            value={formData.value}
            onChange={(e) => handleInputChange(index, e)}
            className="mx-2 p-2"
            list="value-options"
          />
          <datalist id="value-options">{valueOptions}</datalist>
        </label>
        <div className="actions opacity-0 group-hover:opacity-100 transition-opacity duration-100">
          {level < 5 && (
            <button type="button" onClick={() => handleAddSubcategory(index)}>
              <PlusIcon />
            </button>
          )}
          <button type="button" onClick={() => handleRemove(index)}>
            <MinusIcon />
          </button>
        </div>
      </div>
      {/* render subcategories */}
      {formData.subcategories &&
        formData.subcategories.map((subCategory, subIndex) => {
          const uniqueSubIndex = `${index}-${subIndex}`;  // e.g. index '2-0-1'
          return (
            <div className="ml-8 flex flex-row relative mt-1">
              <FormField
                key={uniqueSubIndex}
                index={uniqueSubIndex}
                level={level + 1}
                formData={subCategory}
                formDataList={formDataList}
                handleInputChange={handleInputChange}
                handleRemove={handleRemove}
                handleAddSubcategory={handleAddSubcategory}
              />
            </div>
          );
        })}
    </div>
  );
};


// Function to create an empty structure based on the example_data
const createEmptyStructure = (category: Category): Category => {
  return {
    key: category.key,
    value: '',
    subcategories: category.subcategories ? category.subcategories.map(createEmptyStructure) : undefined,
  };
};


const NewArtworkStructure: React.FC = () => {
  const [formDataList, setFormDataList] = useState<Category[]>(example_data.map(createEmptyStructure));
  
  const [jsonOutput, setJsonOutput] = useState<string>('');

  const handleShowJson = () => {
    setJsonOutput(JSON.stringify(formDataList, null, 2));
  };

  const handleInputChange = (index: string, e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const indexParts = index.split('-').map(Number);  // e.g. index '2-0-1' -> [2, 0, 1]

    setFormDataList((prevDataList) =>
      updateNestedValue(prevDataList, indexParts, name, value)
    );
  };

  // recursively update the value of a nested object
  const updateNestedValue = (dataList: Category[], indexParts: number[], name: string, value: string): Category[] => {
    if (indexParts.length === 0) {
      return dataList;
    }

    const [currentIndex, ...remainingIndexParts] = indexParts;

    return dataList.map((item, i) => {
      if (i === currentIndex) {
        if (remainingIndexParts.length === 0) {
          // We're at the correct item, update it
          return { ...item, [name]: value };
        } else {
          // We need to go deeper, recurse
          const updatedSubcategories = updateNestedValue(item.subcategories || [], remainingIndexParts, name, value);
          return { ...item, subcategories: updatedSubcategories };
        }
      } else {
        return item;
      }
    });
  };

  const handleAddCategory = () => {
    setFormDataList((prevDataList) => [...prevDataList, { key: '', value: '', subcategories: [] }]);
  };

  const handleAddSubcategory = (index: string) => {
    const indexParts = index.split('-').map(Number);  // e.g. index '2-0-1' -> [2, 0, 1]
  
    setFormDataList((prevDataList) =>
      addSubcategory(prevDataList, indexParts)
    );
  };
  
  const addSubcategory = (dataList: Category[], indexParts: number[]): Category[] => {
    if (indexParts.length === 0) {
      return [...dataList, { key: '', value: '', subcategories: [] }];
    }
  
    const [currentIndex, ...remainingIndexParts] = indexParts;
  
    return dataList.map((item, i) => {
      if (i === currentIndex) {
        if (remainingIndexParts.length === 0) {
          // We're at the correct item, add a subcategory
          return {
            ...item,
            subcategories: [
              ...(item.subcategories || []),
              { key: '', value: '' }
            ]
          };
        } else {
          // We need to go deeper, recurse
          const updatedSubcategories = addSubcategory(item.subcategories || [], remainingIndexParts);
          return { ...item, subcategories: updatedSubcategories };
        }
      } else {
        return item;
      }
    });
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    console.log('Form submitted:', formDataList);
  };

  const handleRemove = (index: string) => {
    const indexParts = index.split('-').map(Number);  // e.g. index '2-0-1' -> [2, 0, 1]
  
    setFormDataList((prevDataList) =>
      removeCategory(prevDataList, indexParts)
    );
  };
  
  const removeCategory = (dataList: Category[], indexParts: number[]): Category[] => {
    if (indexParts.length === 0) {
      return dataList;
    }
  
    const [currentIndex, ...remainingIndexParts] = indexParts;
  
    return dataList.map((item, i) => {
      if (i === currentIndex) {
        if (remainingIndexParts.length === 0) {
          // We're at the correct item, remove it
          return null;
        } else {
          // We need to go deeper, recurse
          const updatedSubcategories = removeCategory(item.subcategories || [], remainingIndexParts);
          return { ...item, subcategories: updatedSubcategories };
        }
      } else {
        return item;
      }
    }).filter(item => item !== null) as Category[];
  };

  return (
    <div style={{ overflowY: 'auto', height: '70vh' }}> {/* TODO */}
      <div className="m-4">
        <form onSubmit={handleSubmit}>
          {formDataList.map((formData, index) => (
            <FormField
              key={index.toString()}
              index={index.toString()}
              level={0}
              formData={formData}
              formDataList={formDataList}
              handleInputChange={handleInputChange}
              handleRemove={handleRemove}
              handleAddSubcategory={handleAddSubcategory}
            />
          ))}
          <button type="button" onClick={handleAddCategory}>
            <PlusIcon />
          </button>
          <button type="button" onClick={handleShowJson}>
            Show JSON
          </button>
          {/* <button type="submit">Submit</button> */}
        </form>
        <pre>{jsonOutput}</pre>
      </div>
    </div>
  );
}

export default NewArtworkStructure;
