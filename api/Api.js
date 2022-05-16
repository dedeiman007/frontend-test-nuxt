import axios from 'axios'

const Api = axios.create({
    baseURL: 'https://gorest.co.in/public/v2/',
    headers: {
        'Authorization': `Bearer 9690fb8196780608aa119e9cadbf3901b8d6679995f2667a259a1f07fb7617cd`
    } 
})

export default Api