import React, { useEffect, useState, useRef } from 'react'
import { useRouter } from 'next/router'
import { db } from '../Firebase/firebase'
import { useQuery, useMutation } from 'react-query'
import { getUserList, deleteUser } from '../src/query/query'
import { useGet } from '../hooks/useGet'



function Userlist() {
    const router = useRouter()
    const [docId, setdocId] = useState(0)
    const loadMoreButtonRef = useRef();
    // const { data, isLoading, isFetching, isError, refetch } = useQuery(["userList"], getUserList, {
    //     retry: 4,
    //     retryDelay: 2000,
    //     refetchOnWindowFocus: false
    // })

    const { data, isLoading, isFetching, isError, refetch, fetchNextPage, hasNextPage, isFetchingNextPage, } = useGet();


    const { mutateAsync } = useMutation(deleteUser, {
        onSuccess: () => {
            refetch()
        }
    })

    const handleEditUser = async (event, id) => {
        // event.stopPropagation()
        router.push({
            pathname: '/register',
            query: {
                id: id
            }
        })
    }

    // useEffect(() => {
    //     console.log("I am calling")
    //     if (data && data.pages[0].response.length > 0) {
    //         setdocId(data.pages[0].response[data.pages[0].response.length - 1].id)
    //     }
    // }, [docId])

    console.log(data)
    // console.log(data)

    // useEffect(() => {
    //     if (!hasNextPage) {
    //       return;
    //     }
    //     const observer = new IntersectionObserver(
    //       (entries) => entries.forEach((entry) => {
    //         if (entry.isIntersecting) {
    //           fetchNextPage();
    //         }
    //       }),
    //     );
    //     const el = loadMoreButtonRef && loadMoreButtonRef.current;
    //     if (!el) {
    //       return;
    //     }
    //     observer.observe(el);
    //     return () => {
    //       observer.unobserve(el);
    //     };
    //   }, [loadMoreButtonRef.current, hasNextPage]);



    const handleDeleteUser = async (event, id) => {
        event.stopPropagation()
        if (id) {
            await mutateAsync(id)
        }
    }
    if (isLoading) {
        return <h1>Loading.........</h1>
    }

    if (isError) {
        return <h1>Sorry There is some Error in data</h1>
    }

    if (!isFetchingNextPage && isFetching) {
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
                    data && data.pages && data.pages[0].response && data.pages[0].response.length > 0 && data.pages[data.pages.length - 1].response.map((item, key) => (
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
            <button ref={loadMoreButtonRef} onClick={fetchNextPage}>{isFetchingNextPage
                ? 'Loading more...'
                : hasNextPage
                    ? 'Load More'
                    : 'Nothing more to load'}</button>
        </div>
    )
}

export default Userlist


