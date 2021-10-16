import React, { useState, lazy } from 'react'
import { useQuery, QueryClient } from 'react-query'
import dynamic from 'next/dynamic'

const DynamicLazyComponent = dynamic(() => import('../src/components/characters'), {
    ssr: false
})





function Cascading() {
    // function casc (){
    //     const { data, status } = useQuery("episodes", getEpisodes);
    // }


    const [episodeId, setepisodeId] = useState(0)
    const [characters, setCharacters] = useState([])
    const [page, setPage] = useState(1)

    const getEpisodes = async () => {
        const res = await fetch(`https://rickandmortyapi.com/api/episode?page=${page}`)
        return res.json()
    }
    const getCharacters = async ({ queryKey }) => {
        const filtered_characters = data.results.filter(item => item.id == queryKey[1])
        const characters_detail = await Promise.all(filtered_characters[0].characters.map(async url => {
            const resp = await fetch(url);
            return resp.json();
        }));

        setCharacters(characters_detail)

        // setepisodeId(0)
    }

    const { data, status, isPreviousData } = useQuery(["episodes", page], getEpisodes, {
        keepPreviousData: false //seamlessly change the data without any lag in UI
    });

    const { data: charactersData, status: charactersStatus } = useQuery(["characters", episodeId], getCharacters, {
        enabled: !!episodeId
    });



    if (status === "loading") {
        return <h1>Loading...</h1>;
    }
    if (status === "error") {
        return <h1>Error :(</h1>;
    }
    console.log("Data => ", isPreviousData, page, data && data.info && data.info.pages, page === data && data.info && data.info.pages)
    return (
        <div className="cascading_wrapper">
            <div style={{ width: '50%' }}>
                {
                    data && data.results && data.results.map((item, id) => (
                        <div key={id}>
                            <div style={{ display: 'flex' }}>
                                <span key={item.id}>{item.episode} - {item.name} <em>{item.airDate}</em></span>
                                <button onClick={() => setepisodeId(item.id)}>Show Characters</button>
                            </div>
                        </div>
                    ))
                }
                <button disabled={isPreviousData || page <= 1} onClick={() => setPage((pre) => pre - 1)}>Previous</button>
                <button disabled={isPreviousData || page == 3} onClick={() => setPage((pre) => pre + 1)}>Next</button>
            </div>
            {
                episodeId != 0 ?

                    <div style={{ width: '50%', display: 'flex', flexWrap: 'wrap', height: 'max-content' }}>
                        {/* {
                    charactersStatus == "loading" ? <h1>Loading......</h1> :
                    characters && characters.map((data, id) =>
                        <div key={id} style={{ border: '1px solid grey', margin: '2px', width: '100px', height: '120px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>

                            <span>{data.name}</span>
                            <img width='40' height='40' src={data.image} />
                        </div>
                    )
                } */}
                        <React.Suspense fallback={`loading`}>
                            {characters && <DynamicLazyComponent characters={characters} />}
                        </React.Suspense>
                    </div> : 'null'
            }
        </div>
    )
}



export default Cascading
