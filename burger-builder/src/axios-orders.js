import axios from "axios";

 const instance = axios.create({
    baseURL:'https://react-burger-project-64c88-default-rtdb.firebaseio.com/'
})
export default instance;