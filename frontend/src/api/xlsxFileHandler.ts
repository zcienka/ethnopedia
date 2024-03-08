import axios from "axios"
import { API_URL } from "../config"
import { useMutation } from "react-query"

export const getXlsxWithAllData = async (collectionName: string) => {
    return await axios({
        url: `${API_URL}v1/xlsx/${collectionName}`,
        method: 'GET',
        responseType: 'blob',
    }).then((response) => {
        // create file link in browser's memory
        const href = URL.createObjectURL(response.data);
    
        // create "a" HTML element with href to file & click
        const link = document.createElement('a');
        link.href = href;
        link.setAttribute('download', 'test.xlsx');
        document.body.appendChild(link);
        link.click();
    
        // clean up "a" element & remove ObjectURL
        document.body.removeChild(link);
        URL.revokeObjectURL(href);
    });
}