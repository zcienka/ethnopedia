import axios from "axios"
import { API_URL } from '../config'
export const getSubsections = async () => {
    const response = await axios.get(`${API_URL}v1/subsections`)
    return response.data
}
