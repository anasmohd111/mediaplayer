import axios from "axios";

// create a function for common api request
export const commonRequest = async (method, url, body) => {

    // request configuration ---------- add like object
    let reqConfig = {
        method,
        url,
        data: body,
        headers: {
            "Content-type": "application/json"
        }

    }

    // create axios instance
    // api call
    return await axios(reqConfig).then((response) => {
        return response
    }).catch((error) => {
        return error
    })

}