import axios from "axios"

export const fetchTracks = async () => {
    const response = await axios.get("http://localhost:8000/api/v1/track")
    console.log({response})
    return response.data
}
