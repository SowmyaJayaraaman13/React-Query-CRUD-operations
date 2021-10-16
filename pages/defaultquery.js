import React, { useState } from 'react'
import { useQuery, QueryClient, useQueryClient } from 'react-query'
import { defaultQueryFn } from '../src/query/query'

function Defaultquery() {
    const queryClient =  useQueryClient()
    const [urlParam, setUrlParam] = useState(undefined)
    const { isLoading, data } = useQuery(urlParam)
    console.log(data)
    if (isLoading) {
        return <h1>Loading..... Pls Wait</h1>
    }
    const preFetch = async (url) => {
        await queryClient.prefetchQuery([url],() => defaultQueryFn({
            queryKey:[url]
        }))
    }
    return (
        <div>
            <button onClick={() => preFetch("/posts")}>Prefetch Post</button>
            <button onClick={() => preFetch("/albums")}>Prefetch Albums</button>
            <button onClick={() => setUrlParam('/posts')}>Posts</button>
            <button onClick={() => setUrlParam('/albums')}>Albums</button>
            <button onClick={() => queryClient.invalidateQueries(true)}>Force Refetch All</button>
            <button onClick={() => queryClient.clear()}>Clear Cache</button>
            {/* <button onClick={() => setUrlParam('/todos')}>Todos</button>
            <button onClick={() => setUrlParam('/users')}>Users</button> */}
            {
                data && data.length > 0 && data.map(item => (
                    <details key={item.id}>
                        <summary >{item.title}</summary>
                        <p>I am a text</p>
                    </details>
                ))
            }
        </div>
    )
}

export default Defaultquery
