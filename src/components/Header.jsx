import React from 'react'

export default function Header({logo}) {

    return (
        <div>
            <header className="header">
                <div className="logo">
                    <img src={logo} alt="logo"/>
                    <h1>NASA's APOD!</h1>
                </div>
            </header>
        </div>
    )
}
