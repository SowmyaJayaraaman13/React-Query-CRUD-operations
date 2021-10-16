import { useQuery, useInfiniteQuery } from 'react-query'
import { getUserList } from '../src/query/query'



export function useGet() {
    return useInfiniteQuery("userList", getUserList, {
        retry: 4,
        retryDelay: 2000,
        refetchOnWindowFocus: false,
        getNextPageParam: (lastPage) => {
            console.log(lastPage)
            const { page, total_pages: totalPages } = lastPage;
            return (page < totalPages) ? page + 1 : undefined;
        }
    })
}