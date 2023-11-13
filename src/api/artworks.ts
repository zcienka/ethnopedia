import axios from "axios"

const API_URL = "http://localhost:8080/api/"
export const getArtworks = async () => {
    const response = await axios.get(`${API_URL}v1/artwork`)
    return response.data
}

export const getArtwork = async (id: any) => {
    return await axios.get(`${API_URL}v1/artwork/${id}`).then(res => res.data)
}

export const createArtwork = async () => {
    return await axios
        .post(`${API_URL}v1/artwork`, {})
        .then(res => res.data)
}


export const updatePostFn = async ({ id, artwork }: {
    id: string
    artwork: any
}) => {
    const response = await axios.patch(`v1/artwork/${id}`, artwork)
    return response.data
}

export const deletePostFn = async (id: string) => {
    const response = await axios.delete(`v1/artwork/${id}`)
    return response.data
}