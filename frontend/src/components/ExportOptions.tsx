import { useState } from "react"
import { ReactComponent as Close } from "../assets/icons/close.svg"
import { useParams } from "react-router-dom"
import { getXlsxWithAllData } from "../api/xlsxFileHandler"

type Props = {
    onClose: () => void
}

const ExportOptions = ({ onClose }: Props) => {
    const [, setWindowOpen] = useState(false)

    const { collection } = useParams()

    return <div
        id="default-modal"
        aria-hidden="true"
        className="fixed top-0 left-0 flex items-center justify-center w-full h-full z-50 "
    >
        <div className="absolute top-0 left-0 right-0 bottom-0 flex items-center justify-center ">
            <div className="fixed inset-0 bg-black opacity-50" />
            <div className="relative w-full max-w-2xl max-h-full ">
                <div className="relative bg-white rounded-lg shadow dark:bg-gray-800 border dark:border-gray-600">
                    <div className="flex items-start justify-between p-4 rounded-t">
                        <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                            Ustawienia eksportu
                        </h3>
                        <button type="button"
                                className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg
                                text-sm w-4 h-4 ml-auto inline-flex justify-center items-center dark:hover:bg-gray-600
                                dark:hover:text-white"
                                data-modal-hide="default-modal"
                        onClick={onClose}>
                            <Close />
                        </button>
                    </div>
                    <div>
                            <div className="flex flex-col items-start px-4">   
                                <p className="flex py-2">Wybierz kolumny do wyeksportowania:</p>                         
                                <span>
                                    <input type="checkbox" id="vehicle1" name="vehicle1" value="Bike"></input>
                                    <label> a</label>
                                </span>
                                <span>
                                    <input type="checkbox" id="vehicle1" name="vehicle1" value="Bike"></input>
                                    <label> b</label>
                                </span>
                                <span>
                                    <input type="checkbox" id="vehicle1" name="vehicle1" value="Bike"></input>
                                    <label> c</label>
                                </span>                
                            </div>
                            <div className="flex justify-end px-4 py-4">
                                <input className="flex items-center justify-end dark:text-white
                                            hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 font-medium px-4 py-2
                                            dark:focus:ring-primary-800 font-semibold text-white bg-gray-800 hover:bg-gray-700 border-gray-800"
                                            type="submit" value="Eksportuj dane" onClick={() => {getXlsxWithAllData(collection as string)}}></input>
                            </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
}

export default ExportOptions
