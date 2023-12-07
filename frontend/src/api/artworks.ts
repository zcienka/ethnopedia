import axios from "axios"
import { API_URL } from "../config"
import { useMutation } from "react-query"

export const getArtworks = async () => {
    const response = await axios.get(`${API_URL}v1/artwork`)
    return response.data
}

export const getArtwork = async (id: string) => {
    return await axios.get(`${API_URL}v1/artwork/${id}`)
        .then(res => res.data)
}

export const getAdvancedSearchResult = async (queryParameters: string) => {
    return await axios.get(`${API_URL}v1/artwork/filter?${queryParameters}`)
        .then(res => res.data)
}

export const getQuickSearchResult = async (queryParameters: string) => {
    return await axios.get(`${API_URL}v1/artwork/search?${queryParameters}`)
        .then(res => res.data)
}

export const createArtwork = async () => {
    return await axios
        .post(`${API_URL}v1/artwork`, {})
        .then(res => res.data)
}

export const updateArtwork = async ({ id, artwork }: {
    id: string
    artwork: any
}) => {
    const response = await axios.patch(`${API_URL}v1/artwork/${id}`, artwork)
    return response.data
}

export const useBatchDeleteArtworkMutation = () => {
    return useMutation(async (artworks: string[]) => {
        const artworkIds = artworks.join(",")
        const url = `${API_URL}v1/artwork/${artworkIds}`

        const res = await axios.delete(url)
        return res.data
    })
}


export const deleteArtwork = async (id: string) => {
    const response = await axios.delete(`${API_URL}v1/artwork/${id}`)
    return response.data
}