import React, { useState, useEffect } from "react";
import { 
  TabContent, 
  TabPane, 
  Nav, NavItem, 
  NavLink, Card, 
  Button, CardTitle, 
  CardText, 
  Row, 
  Col,
  Carousel,
  CarouselItem,
  CarouselControl,
  CarouselIndicators,
  CarouselCaption,
  ListGroup, 
  ListGroupItem } from 'reactstrap';
import classnames from 'classnames';
import axios from 'axios' 
import "./App.css";
import Header from "./components/Header.jsx";
import MainImg from "./components/MainImg.jsx";
import Title from "./components/Title.jsx";
import Date from "./components/Date.jsx";
import Explanation from "./components/Explanation.jsx";
import PhotoUrl from "./components/PhotoUrl.jsx";


function App() {

  const [nasaApodData, setnasaApodData] = useState({});
  const [nasaRoverData, setnasaRoverData] = useState([]);
  const [activeIndex, setActiveIndex] = useState(0);
  const [animating, setAnimating] = useState(false);
  const logo = "https://i.ibb.co/8dyR9M2/newLogo.png";

  useEffect(() => {
    axios.get("https://api.nasa.gov/planetary/apod?api_key=DEMO_KEY")
    .then( data => {
      setnasaApodData(data.data);
    })
    .catch( error => {
      console.log(error);
      debugger
    });

    axios.get("https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos?sol=999&api_key=DEMO_KEY")
    .then( data => {
      setnasaRoverData(data.data.photos);
    })
    .catch( error => {
      console.log(error);
      debugger
    })

  }, [])

  const { date, explanation, title, hdurl } = nasaApodData;
  const [activeTab, setActiveTab] = useState('1');

  const toggle = tab => {
    if(activeTab !== tab) setActiveTab(tab);
  }

  const next = () => {
    if (animating) return;
    const nextIndex = activeIndex === nasaRoverData.length - 1 ? 0 : activeIndex + 1;
    setActiveIndex(nextIndex);
  }

  const previous = () => {
    if (animating) return;
    const nextIndex = activeIndex === 0 ? nasaRoverData.length - 1 : activeIndex - 1;
    setActiveIndex(nextIndex);
  }

  const goToIndex = (newIndex) => {
    if (animating) return;
    setActiveIndex(newIndex);
  }

  const slides = nasaRoverData.map((item, index) => {
    return (
      <CarouselItem
        onExiting={() => setAnimating(true)}
        onExited={() => setAnimating(false)}
        key={index}
      >
        <img src={item.img_src} alt={item.id} />
        <ListGroup>

          <ListGroupItem>Sol: {item.sol}</ListGroupItem>
          <ListGroupItem>Earth Date: {item.earth_date}</ListGroupItem>  
          <ListGroupItem>Rover Status: {item.rover.status}</ListGroupItem>
          <ListGroupItem>Launch Date: {item.rover.launch_date}</ListGroupItem>
          <ListGroupItem>Landing Date: {item.rover.landing_date}</ListGroupItem>
          <ListGroupItem>Camera: {item.camera.full_name}</ListGroupItem>

        </ListGroup>

      </CarouselItem>
    );
  });

  return (

    <div className="App">

      <Header logo={logo}/>
      <Nav tabs>
        <NavItem>
          <NavLink
            className={classnames({ active: activeTab === '1' })}
            onClick={ (event) => { toggle('1'); } }>
            APOD
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink
            className={classnames({ active: activeTab === '2' })}
            onClick={ (event) => { toggle('2'); } }>
            CURIOSITY PHOTOS
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink
            className={classnames({ active: activeTab === '3' })}
            onClick={ (event) => { toggle('3'); } }>
            Another Rover
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink
            className={classnames({ active: activeTab === '4' })}
            onClick={ (event) => { 
              // toggle('4');
              window.open("https://api.nasa.gov/#apod", "_blank");
             }}>
            LEARN ABOUT NASA's API
          </NavLink>
        </NavItem>
      </Nav>
      <TabContent activeTab={activeTab}>
        <TabPane tabId="1">
          <div className="body">
            <Date date={date}/>
            <Title title ={title}/>
            <MainImg hdurl={hdurl}/>
            <Explanation explanation={explanation}/>
            <PhotoUrl hdurl={hdurl}/>
          </div>
        </TabPane>
        <TabPane tabId="2">
          <div className="body">
            <Carousel
              activeIndex={activeIndex}
              next={next}
              previous={previous}
              >
              <CarouselIndicators items={nasaRoverData} activeIndex={activeIndex} onClickHandler={goToIndex} />
              {slides}
              <CarouselControl direction="prev" directionText="Previous" onClickHandler={previous} />
              <CarouselControl direction="next" directionText="Next" onClickHandler={next} />
            </Carousel>
          </div>
        </TabPane>
        <TabPane tabId="3">
          <div className="body">
            <Row>
              <Col sm="6">
                <Card body>
                  <CardTitle>Going to put a 2nd Rover here</CardTitle>
                  <CardText>With supporting text below as a natural lead-in to additional content.</CardText>
                  <Button>Go somewhere</Button>
                </Card>
              </Col>
              <Col sm="6">
                <Card body>
                  <CardTitle>Going to put a 3rd Rover here</CardTitle>
                  <CardText>With supporting text below as a natural lead-in to additional content.</CardText>
                  <Button>Go somewhere</Button>
                </Card>
              </Col>
            </Row>
          </div>
        </TabPane>
        <TabPane tabId="4">
        </TabPane>
      </TabContent>
    </div>
  );
}

export default App;