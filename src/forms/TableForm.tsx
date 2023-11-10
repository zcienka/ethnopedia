import React, { useState } from "react"
import Input from "../components/Input"
import { v4 as uuidv4 } from "uuid"
import { ReactComponent as Close } from "../assets/icons/close.svg"

const TableForm = () => {
    const [inputs, setInputs] = useState([{ id: 1, value: "" }])
    const [nextInputId, setNextInputId] = useState(2)

    const addNewInput = () => {
        setInputs([...inputs, { id: nextInputId, value: "" }])
        setNextInputId(nextInputId + 1)
    }

    const handleInputChange = (id: any, event: any) => {

        if(event.target !== undefined) {
            const updatedInputs = inputs.map(input => {
                if (input.id === id) {
                    return { ...input, value: event.target.value }
                }
                return input
            })
            setInputs(updatedInputs)
        }
    }

    return <section className="fixed top-0 left-0 flex items-center justify-center w-full h-full z-50">
        <div className="absolute top-0 left-0 right-0 bottom-0 flex items-center justify-center">
            <div className="fixed inset-0 bg-black opacity-50" />
            <div className="relative w-full max-w-2xl max-h-full">
                <div className="relative bg-white rounded-lg shadow dark:bg-gray-800 border dark:border-gray-700">
                    <div className="flex justify-end">
                        <button type="button"
                                className="text-gray-400  bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg
                                    text-sm w-8 h-8 inline-flex justify-center items-center dark:hover:bg-gray-600
                                    dark:hover:text-white"
                                data-modal-hide="default-modal">
                            <Close />
                        </button>
                    </div>
                    <div className="py-8 px-4 mx-auto max-w-2xl lg:py-4">
                        <h2 className="mb-4 text-xl font-bold text-gray-900 dark:text-white">
                            Dodaj nową tabelę
                        </h2>
                        <form action="#">
                            {inputs.map((input) => (
                                <Input
                                    columnName={"Kolumna nr " + input.id.toString()}
                                    onInputChange={(value) => handleInputChange(input.id, value)} />
                            ))}
                            {/*<Input columnName={"Kolumna nr " + (index + 1).toString()}*/}
                            {/*       onInputChange={(value) => handleInputChange(input.id, value)} />*/}

                            <button
                                type="button"
                                onClick={addNewInput}
                                className="inline-flex items-center px-5 py-2.5 mt-4 sm:mt-6 text-sm font-medium text-center
                    text-white bg-primary-700 rounded-lg focus:ring-4 focus:ring-primary-200
                     dark:focus:ring-primary-900 hover:bg-primary-800"
                            >
                                Dodaj nową kolumnę
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </section>
}
export default TableForm