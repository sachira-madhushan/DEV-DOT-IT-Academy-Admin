import axios from "axios";

export const axiosUserInstance=axios.create(
    {
        baseURL:"http://127.0.0.1:4000/api/user/",
        headers: {
            'Content-Type': 'application/json', 
        },
    }
)

