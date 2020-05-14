import React from 'react'

export default function Header({logo}) {
    console.log(logo)
    return (
        <div>
            <header className="header">
                <div className="logo">
                    <img src={logo} alt="logo"/>
                    <h1>NASA's APOD!</h1>
                </div>
                
                <div className="buttons">
                    <button>Get Random APOD</button>
                    <button onClick={event =>  window.open("https://api.nasa.gov/#apod", "_blank")}>Learn More About NASA's API</button>
                </div>
            </header>
        </div>
    )
}
