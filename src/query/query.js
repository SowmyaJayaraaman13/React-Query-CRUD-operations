import axios from 'axios'

export const getUserList = async ({pageParam = 1}) => {
    console.log(pageParam)
    const result = await axios.get(`http://localhost:3000/api/helper?page=${pageParam}`)
    return result.data
}

export const postUserList = async (body) => {
    const result = await axios.post('http://localhost:3000/api/helper', body)
    // return result.data
}

export const deleteUser = async (id) => {
    const result = await axios.delete(`http://localhost:3000/api/helper/${id}`)
    // return result.data
}

export const getUserById = async ({queryKey}) => {
    console.log(queryKey)
    if(queryKey[1].id){
        const id = queryKey[1].id
        const result = await axios.get(`http://localhost:3000/api/helper/${id}`)
        return result.data || null
    }
}

export const updateUserById = async(param) => {
    const result = await axios.put(`http://localhost:3000/api/helper/${param.id}`, param.body)
}

export const defaultQueryFn = async({queryKey}) => {
    await new Promise(r => setTimeout(r, 1000))
    if(queryKey[0]){
        const result = await axios.get(`https://jsonplaceholder.typicode.com${queryKey[0]}`)
        return result.data
    }
    
}