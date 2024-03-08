import axios from "axios"
import { API_URL } from "../config"
import { useMutation } from "react-query"

export const getXlsxWithAllData = async () => {
    const response = await axios.get(`${API_URL}v1/xlsx`)
    return response.data
}