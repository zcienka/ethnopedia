import React, { useState, ChangeEvent, FormEvent } from 'react';

interface Metadata {
  [key: string]: string | Subcategory;
}

interface Subcategory extends Array<string | Metadata> {
  0: string;
  1: Metadata;
}

const NewArtworkStructure: React.FC = () => {
  const [formDataList, setFormDataList] = useState<Metadata[]>([{ key: '', value: '' }]);
  const [jsonData, setJsonData] = useState<string>('');

  const handleInputChange = (index: number, e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormDataList((prevDataList) =>
      prevDataList.map((item, i) => (i === index ? { ...item, [name]: value } : item))
    );
  };

  const handleAddCategory = () => {
    setFormDataList((prevDataList) => [...prevDataList, { key: '', value: '' }]);
  };

  const handleAddSubcategory = (index: number) => {
    setFormDataList((prevDataList) =>
      prevDataList.map((item, i) =>
        i === index
          ? {
              ...item,
              value: Array.isArray(item.value)
                ? [...item.value, { key: '', value: '' }]
                : ['', { key: '', value: '' }],
            } as unknown as Metadata
          : item
      )
    );
  };

  const handleGenerateJson = () => {
    const newData: Metadata = {};
    formDataList.forEach((item) => {
      if (typeof item.key == 'string' && item.value) {
        newData[item.key] = item.value;
      } else if (Array.isArray(item.key) && item.key.length > 0) {
        newData[item.key[0]] = item.value;
      }
    });
    setJsonData(JSON.stringify(newData, null, 2));
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    console.log('Form submitted:', formDataList);
  };

  const handleRemove = (index: number) => {
    setFormDataList((prevDataList) => prevDataList.filter((_, i) => i !== index));
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        {formDataList.map((formData, index) => (
          <div key={index}>
            <label>
              <input
                type="text"
                name={`key`}
                value={typeof formData.key === 'string' ? formData.key : formData.key[0]}
                onChange={(e) => handleInputChange(index, e)}
              />
            </label>
            <label>
              :
              <input
                type="text"
                name={`value`}
                value={typeof formData.value === 'string' ? formData.value : formData.value[0]}
                onChange={(e) => handleInputChange(index, e)}
              />
            </label>
            <button type="button" onClick={() => handleRemove(index)}>
              -
            </button>
            <button type="button" onClick={() => handleAddSubcategory(index)}>
              +
            </button>
          </div>
        ))}
        <button type="button" onClick={handleAddCategory}>
          Add Another Value
        </button>
        <button type="button" onClick={handleGenerateJson}>
          Show JSON
        </button>
        <button type="submit">Submit</button>
      </form>
      <pre>{jsonData}</pre>
    </div>
  );
};

export default NewArtworkStructure;
