import axios from "axios";

axios.interceptors.response.use(null, (error) => {
    const expectedError =
        error.response &&
        error.response.status >= 400 &&
        error.response.statu < 500;

    if (expectedError) {
        console.log('Logging the error');
        console.error('An unexpected error occured');
    }

    return Promise.reject(error);
});



const http = {
    get: axios.get,
    post: axios.post,
    put: axios.put,
    delete: axios.delete,
}

export default http;