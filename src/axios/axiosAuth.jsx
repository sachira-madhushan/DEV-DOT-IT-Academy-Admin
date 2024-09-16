import axios from "axios";

export const axiosInstance=axios.create(
    {
        baseURL:"http://127.0.0.1:4000/api/admin/",
        headers: {
            'Content-Type': 'application/json',
            'Authorization':'Bearer '+localStorage.getItem("admin-token")
        },
    }
)

