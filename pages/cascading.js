import React, { useState } from 'react'
import { useQuery } from 'react-query'

function Cascading() {
    // function casc (){
    //     const { data, status } = useQuery("episodes", getEpisodes);
    // }
    const [characterId, setcharacterId] = useState(0)
    const [characters, setCharacters] = useState([])

    const getEpisodes = async () => {
        const res = await fetch('https://rickandmortyapi.com/api/episode')
        return res.json()
    }
    const getCharacters = async ({ queryKey }) => {
        const filtered_characters = data.results.filter(item => item.id == queryKey[1])
        const characters_detail = await Promise.all(filtered_characters[0].characters.map(async url => {
            const resp = await fetch(url);
            return resp.json();
        }));
        setCharacters(characters_detail)

        setcharacterId(0)
    }

    const { data, status } = useQuery("episodes", getEpisodes, {

    });

    const { data: charactersData } = useQuery(["characters", characterId], getCharacters, {
        enabled: !!characterId
    });

    if (status === "loading") {
        return <h1>Loading...</h1>;
    }
    if (status === "error") {
        return <h1>Error :(</h1>;
    }
    return (
        <div className="cascading_wrapper">
            <div style={{ width: '50%' }}>
                {
                    data && data.results && data.results.map((item, id) => (
                        <div key={id}>
                            <div>
                                <h3 key={item.id}>{item.episode} - {item.name} <em>{item.airDate}</em></h3>
                                <button onClick={() => setcharacterId(item.id)}>Show Characters</button>
                            </div>
                        </div>
                    ))
                }
            </div>
            <div style={{ width: '50%', display: 'flex', flexWrap: 'wrap', height: 'max-content' }}>
                {

                    characters && characters.map((data, id) =>
                        <div key={id} style={{ border: '1px solid grey', margin: '5px', width: '100px', height: '150px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>

                            <p>{data.name}</p>
                            <img width='50' height='50' src={data.image} />
                        </div>
                    )
                }
            </div>
        </div>
    )
}



export default Cascading
