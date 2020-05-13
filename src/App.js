import React, { useState, useEffect } from "react";
import axios from 'axios' 
import "./App.css";
import Header from "./components/Header.jsx";
import MainImg from "./components/MainImg.jsx";
import Title from "./components/Title.jsx";
import Date from "./components/Date.jsx";
import Explanation from "./components/Explanation.jsx";
import PhotoUrl from "./components/PhotoUrl.jsx";

function App() {

  const [nasaData, setnasaData] = useState({});

  useEffect(() => {
    axios.get("https://api.nasa.gov/planetary/apod?api_key=DEMO_KEY")
    .then( data => {
      console.log(data);
      setnasaData(data.data);
      debugger
    })
    .catch( error => {
      console.log(error);
      debugger
    })
  }, [])

  const { date, explanation, title, hdurl} = nasaData;

  console.log(hdurl);
  
  return (
    <div className="App">
      
    <Header/>

    <div className="body">

      <MainImg hdurl={hdurl}/>
      <Title title ={title}/>
      <Date date={date}/>
      <Explanation explanation={explanation}/>
      <PhotoUrl hdurl={hdurl}/>

    </div>
    

    </div>
  );
}

export default App;
