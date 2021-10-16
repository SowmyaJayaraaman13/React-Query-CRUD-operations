import React from 'react'

function Characters({ characters }) {
    return (
        <div style={{display: 'flex', flexWrap: 'wrap', height: 'max-content' }}>
            {
                characters && characters.map((data, id) =>
                    <div key={id} style={{ border: '1px solid grey', margin: '2px', width: '100px', height: '120px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>

                        <span>{data.name}</span>
                        <img width='40' height='40' src={data.image} />
                    </div>
                )
            }
        </div>
    )
}

export default Characters
