import React, { useEffect } from 'react'
import { useRouter } from 'next/router'
import { db } from '../Firebase/firebase'
import { useQuery, useMutation } from 'react-query'
import { getUserList, deleteUser } from '../src/query/query'



function Userlist() {
    const router = useRouter()
    const { data, isLoading, isFetching, isError, refetch } = useQuery(["userList"], getUserList, {
        retry: 4,
        retryDelay: 2000,
        refetchOnWindowFocus: true
    })


    const {mutateAsync} = useMutation(deleteUser, {
        onSuccess: () => {
            refetch()
        }
    })

    const handleEditUser = async(event, id) => {
        // event.stopPropagation()
        router.push({
            pathname:'/register',
            query: {
                id: id
            }
        })
    }

    const handleDeleteUser = async(event, id) => {
        event.stopPropagation()
        if(id){
            await mutateAsync(id)
        }
    }
    if (isLoading) {
        return <h1>Loading.........</h1>
    }

    if (isError) {
        return <h1>Sorry There is some Error in data</h1>
    }

    if (isFetching) {
        return <h1>Updating Data Please Wait</h1>
    }

    return (
        <div>
            <table>
                <tr>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Phone</th>
                    <th>Gender</th>
                    <th>Actions</th>
                </tr>
                {
                    data && data.response && data.response.length > 0 && data.response.map((item, key) => (
                        <tr key={item.key}>
                            <td>{item.name}</td>
                            <td>{item.email}</td>
                            <td>{item.phone}</td>
                            <td>{item.gender}</td>
                            <td><button onClick={(event) => handleEditUser(event, item.id)}>Edit</button><button onClick={(event) => handleDeleteUser(event, item.id)}>Delete</button> </td>
                        </tr>
                    ))
                }

            </table>
        </div>
    )
}

export default Userlist


