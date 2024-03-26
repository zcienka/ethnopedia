import { useState } from "react"
import { ReactComponent as DragAndDrop } from "../assets/icons/dragAndDrop.svg"
import { ReactComponent as Close } from "../assets/icons/close.svg"

type Props = {
    onClose: () => void
}

const FileDropzone = ({ onClose }: Props) => {
    const [, setWindowOpen] = useState(false)
    const [, setUploadedFile] = useState(null)

    const handleFileUpload = (event: any) => {
        const file = event.target.files[0]

        if (file) {
            setUploadedFile(file)
            setWindowOpen(true)
        }
    }

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
                            Prześlij plik
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
                    <div className="w-full h-full flex items-center justify-center">
                        <label
                            htmlFor="dropzone-file"
                            className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300
                                        border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-gray-600
                                        dark:bg-gray-800 hover:bg-gray-100 dark:border-gray-600
                                        dark:hover:border-gray-500 dark:hover:bg-gray-700">
                            <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                <DragAndDrop />
                                <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                                    <span className="font-semibold">Kliknij, aby przesłać</span> lub przeciągnij i upuść
                                </p>
                                <p className="text-xs text-gray-500 dark:text-gray-400">Pliki XLSX, XLS lub CSV</p>
                            </div>
                            <input
                                id="dropzone-file"
                                type="file"
                                className="hidden"
                                onChange={handleFileUpload}
                            />
                        </label>
                    </div>
                </div>
            </div>
        </div>
    </div>
}

export default FileDropzone
