import React from 'react'

export default function PhotoUrl({hdurl}) {
    return (
        <div className="photoUrl">
            <h3><a href={hdurl}>Link to photo</a></h3>
        </div>
    )
}
