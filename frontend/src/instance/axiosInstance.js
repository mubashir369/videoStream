import axios from "axios";
const axiosInstance=axios.create({
    baseURL:"http://localhost:5000/api",
    //headers: {'Access-Control-Allow-Origin':"*"}
})
export default axiosInstance