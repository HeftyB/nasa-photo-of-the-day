import React from 'react'

export default function PhotoUrl({hdurl}) {
    return (
        <div className="photoUrl">
            <h3>Link to photo: <a href={hdurl}>{hdurl}</a></h3>
        </div>
    )
}
