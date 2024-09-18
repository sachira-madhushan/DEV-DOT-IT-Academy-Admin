import axios from "axios";

export const axiosCourseInstance=axios.create(
    {
        baseURL:"http://127.0.0.1:4000/api/course/",
        headers: {
            'Content-Type': 'application/json', 
        },
    }
)

