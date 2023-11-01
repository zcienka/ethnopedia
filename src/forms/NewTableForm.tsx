import React, { useState } from "react"
import Input from "../components/Input"
import { v4 as uuidv4 } from "uuid"

const NewTableForm = () => {
    const [inputs, setInputs] = useState([{ id: 1 }])
    const [nextInputId, setNextInputId] = useState(2)

    const addNewInput = () => {
        setInputs([...inputs, { id: nextInputId }])
        setNextInputId(nextInputId + 1)
    }

    const handleInputChange = (id: number, value: any) => {
        const updatedInputs = [...inputs]

        const inputToUpdate: any = updatedInputs.find((input) => input.id === id)

        if (inputToUpdate) {
            inputToUpdate.value = value
        }

        setInputs(updatedInputs)
    }

    return <section className="bg-white dark:bg-gray-900">
        <div className="py-8 px-4 mx-auto max-w-2xl lg:py-16">
            <h2 className="mb-4 text-xl font-bold text-gray-900 dark:text-white">Dodaj nową tabelę</h2>
            <form action="#">
                {inputs.map((input, index) => (
                    <span key={uuidv4()}>
                        <Input columnName={"Kolumna nr " + (index + 1).toString()}
                               onInputChange={(value) => handleInputChange(input.id, value)} />
                    </span>

                ))}
                <button
                    type="button"
                    onClick={addNewInput}
                    className="inline-flex items-center px-5 py-2.5 mt-4 sm:mt-6 text-sm font-medium text-center text-white bg-primary-700 rounded-lg focus:ring-4 focus:ring-primary-200 dark:focus:ring-primary-900 hover:bg-primary-800"
                >
                    Dodaj nową kolumnę
                </button>
            </form>
        </div>
    </section>
}
export default NewTableForm