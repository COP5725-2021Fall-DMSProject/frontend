import React, { useState} from "react";
import Header from '../component/header'
import Bottom from '../component/bottom'
import { Card, CardMedia, CardContent, Typography} from '@mui/material'
import settings from '../settings'
import { Carousel, Row } from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from 'react-router-dom';

function Homepage() {
    const [CarouselIdx, setCarouseIdx] = useState(0);
      
    const handleSelect = (selectedIndex, e) => {
        setCarouseIdx(selectedIndex);
    };

    function ControlledCarousel() {
        return (
          <Carousel activeIndex={CarouselIdx} onSelect={handleSelect}>
            <Carousel.Item>
                <div class="d-flex justify-content-center">
                    <div style={{
                        paddingTop: 20,
                        paddingRight: 20,
                        borderTop: 'solid 10px ' + settings.Colors.mainColor,
                        borderRight: 'solid 10px ' + settings.Colors.mainColor,
                        borderTopRightRadius: 25
                    }}>
                        <Link to={'/c1page-next-hamilton'} style={{ textDecoration: 'none' }}>
                            <Card sx={{ maxWidth: 800, backgroundColor:'#38383f'}}>
                                <CardMedia
                                    component="img"
                                    height="400"
                                    image="./home_nextHamliton.png"
                                    alt="home_nextHamilton"
                                />
                                <CardContent>
                                    <Typography 
                                        gutterBottom variant="h5" component="div"
                                        sx={{ color: settings.Colors.subColor, fontFamily: settings.Font.secondary }}
                                    >
                                        Who's the next Lewis Hamilton?
                                    </Typography>
                                    <Typography sx={{ color: settings.Colors.subColor, fontFamily: settings.Font.major, fontSize: 16 }} variant="body2" color="text.secondary">
                                        Lewis holds the Most Drivers’ World Championships (7 Championships). 
                                        This page is goint to show uou - who's will possibly the next Hamilton.
                                    </Typography>
                                </CardContent>
                            </Card>
                        </Link>
                    </div>
                </div>
            </Carousel.Item>
            <Carousel.Item>
                <div class="d-flex justify-content-center">
                    <div style={{
                        paddingTop: 20,
                        paddingRight: 20,
                        borderTop: 'solid 10px ' + settings.Colors.mainColor,
                        borderRight: 'solid 10px ' + settings.Colors.mainColor,
                        borderTopRightRadius: 25
                    }}>
                        <Link to={'/c2page-investable-constructor'} style={{ textDecoration: 'none' }}>
                            <Card sx={{ maxWidth: 800, backgroundColor:'#38383f'}}>
                                <CardMedia
                                    component="img"
                                    height="400"
                                    image="./home_investableTeam.jpg"
                                    alt="home_investableTeam"
                                />
                                <CardContent>
                                    <Typography 
                                        gutterBottom variant="h5" component="div"
                                        sx={{ color: settings.Colors.subColor, fontFamily: settings.Font.secondary }}
                                    >
                                        Which Constructor (team) is Investable?
                                    </Typography>
                                    <Typography sx={{ color: settings.Colors.subColor, fontFamily: settings.Font.major, fontSize: 16 }} variant="body2" color="text.secondary">
                                        F1 racing is rising to be extremely popular around the world. 
                                        This page provides precious insight overview through the teams. 
                                    </Typography>
                                </CardContent>
                            </Card>
                        </Link>
                    </div>
                </div>
            </Carousel.Item>
            <Carousel.Item>
                <div class="d-flex justify-content-center">
                    <div style={{
                        paddingTop: 20,
                        paddingRight: 20,
                        borderTop: 'solid 10px ' + settings.Colors.mainColor,
                        borderRight: 'solid 10px ' + settings.Colors.mainColor,
                        borderTopRightRadius: 25
                    }}>
                        <Link to={'/c3page-lapwise-positions'} style={{ textDecoration: 'none' }}>
                            <Card sx={{ maxWidth: 800, backgroundColor:'#38383f'}}>
                                <CardMedia
                                    component="img"
                                    height="400"
                                    image="./home_defence.jpeg"
                                    alt="home_defence"
                                />
                                <CardContent>
                                    <Typography 
                                        gutterBottom variant="h5" component="div"
                                        sx={{ color: settings.Colors.subColor, fontFamily: settings.Font.secondary }}
                                    >
                                        Which driver is good at defending?
                                    </Typography>
                                    <Typography sx={{ color: settings.Colors.subColor, fontFamily: settings.Font.major, fontSize: 16 }} variant="body2" color="text.secondary">
                                        Drivers try to defend their positions by consistently blocking other drivers. 
                                        This page provides insights on such drivers on a lapwsie scale. 
                                    </Typography>
                                </CardContent>
                            </Card>
                        </Link>
                    </div>
                </div>
            </Carousel.Item>
            <Carousel.Item>
                <div class="d-flex justify-content-center">
                    <div style={{
                        paddingTop: 20,
                        paddingRight: 20,
                        borderTop: 'solid 10px ' + settings.Colors.mainColor,
                        borderRight: 'solid 10px ' + settings.Colors.mainColor,
                        borderTopRightRadius: 25
                    }}>
                        <Link to={'/c4page-driver-types'} style={{ textDecoration: 'none' }}>
                            <Card sx={{ maxWidth: 800, backgroundColor:'#38383f'}}>
                                <CardMedia
                                    component="img"
                                    height="400"
                                    image="./home_crash.jpeg"
                                    alt="home_crash"
                                />
                                <CardContent>
                                    <Typography 
                                        gutterBottom variant="h5" component="div"
                                        sx={{ color: settings.Colors.subColor, fontFamily: settings.Font.secondary }}
                                    >
                                        Risky Driver? 
                                    </Typography>
                                    <Typography sx={{ color: settings.Colors.subColor, fontFamily: settings.Font.major, fontSize: 16 }} variant="body2" color="text.secondary">
                                        Drivers tend to face difficulties on the track such as crashes. 
                                        How their response to such events defines what kind of a driver they are. 
                                    </Typography>
                                </CardContent>
                            </Card>
                        </Link>
                    </div>
                </div>
            </Carousel.Item>
            <Carousel.Item>
                <div class="d-flex justify-content-center">
                    <div style={{
                        paddingTop: 20,
                        paddingRight: 20,
                        borderTop: 'solid 10px ' + settings.Colors.mainColor,
                        borderRight: 'solid 10px ' + settings.Colors.mainColor,
                        borderTopRightRadius: 25
                    }}>
                        <Link to={'/c5page-spoilers'} style={{ textDecoration: 'none' }}>
                            <Card sx={{ maxWidth: 800, backgroundColor:'#38383f'}}>
                                <CardMedia
                                    component="img"
                                    height="400"
                                    image="./spoilers.jpeg"
                                    alt="home_spoiler"
                                />
                                <CardContent>
                                    <Typography 
                                        gutterBottom variant="h5" component="div"
                                        sx={{ color: settings.Colors.subColor, fontFamily: settings.Font.secondary }}
                                    >
                                        Who's a Spoiler? 
                                    </Typography>
                                    <Typography sx={{ color: settings.Colors.subColor, fontFamily: settings.Font.major, fontSize: 16 }} variant="body2" color="text.secondary">
                                        Not all drivers finish in a better position. 
                                        Sometimes even the qualifying position doesn't help in deciding the driver's final position. 
                                    </Typography>
                                </CardContent>
                            </Card>
                        </Link>
                    </div>
                </div>
            </Carousel.Item>
          </Carousel>
        );
    }

    return (
        <div>
            <Header/>
            <div style={{
                display: 'flex',
                flexDirection: 'column',
                marginTop: 75,
                backgroundColor:'#000',
                height: 750
            }}>
                <div 
                    className= "page-title"
                    style={{
                        width: '100%',
                        height: 100,
                        fontSize: 40,
                        color: settings.Colors['subColor']
                    }}
                >
                    <div style={{
                        marginLeft: 100,
                        marginTop: 30, 
                        display: 'flex',
                        flexDirection: 'row'
                        // justifyContent: 'center'
                    }}>
                        <img 
                            style={{
                                width: 100, 
                                height: 80, 
                                padding: 15,
                                borderTop: 'solid 2px #38383f',
                                borderRight: 'solid 2px #38383f',
                                borderTopRightRadius: 10
                            }} 
                            src="./racemap.png" 
                            alt="racemap" 
                            usemap="#racemap"
                        />
                        <div style={{
                            display: 'flex',
                            alignItems: 'center',
                            marginLeft: 25
                        }}>
                            GROUP 14 -GOAT of F1 RACING-
                        </div>
                    </div>
                </div>
                <div style={{marginTop: 50}}>
                    {ControlledCarousel()}
                </div>
            </div>
            
            <div style={{
                display: 'flex',
                flexDirection: 'column',
                marginTop: 50,
                backgroundColor:'#000',
                height: 1250
            }}>
                <div 
                    className= "page-title"
                    style={{
                        width: '100%',
                        height: 100,
                        fontSize: 40,
                        color: settings.Colors['subColor']
                    }}
                >
                    <div style={{
                        marginLeft: 100,
                        marginTop: 30, 
                        display: 'flex',
                        flexDirection: 'row'
                    }}>
                        <img 
                            style={{
                                width: 100, 
                                height: 80, 
                                padding: 15,
                                borderTop: 'solid 2px #38383f',
                                borderRight: 'solid 2px #38383f',
                                borderTopRightRadius: 10
                            }} 
                            src="./racemap.png" 
                            alt="racemap" 
                            usemap="#racemap"
                        />
                        <div style={{
                            display: 'flex',
                            alignItems: 'center',
                            marginLeft: 25
                        }}>
                            PROJECT INTORDUCTION
                        </div>
                    </div>
                </div>
                <div style={{display: 'flex', flexDirection: 'row'}}>
                    <div>
                        <div className="text-block-title">
                            Application Description   
                        </div>
                        <div className="text-block">
                            Formula 1 racing database management system contains all the details of the races, drivers, circuits, constructors, and several other details related to the same year-wise ranging over a decade from 2007 to 2017. 
                            The application is built on top of the database and provides interesting insights into several user tweakable controls to get intuition on a particular key point indicator. These tweakable controls in themselves are complex queries running on the database that take parameters and give the user results based on the same. 
                        </div>
                    </div>
                    <div>
                        <div className="text-block-title">
                            Descriptions of F1 racing  
                        </div>
                        <div className="text-block">
                            Formula 1 (also known as F1) is the highest class of international auto racing for single-seater formula racing cars.
                            There will be around 30 Grands Prix in 30 different race routes over multiple countries and with 10 attending constructors (Team).
                            Each constructor will have 2 drivers racing for them in each game. The results of each race are evaluated using a points system to determine two annual World Championships: one for drivers, the other for constructors.
                        </div>
                    </div>
                </div>
                <div style={{display: 'flex', flexDirection: 'row'}}>
                    <div>
                        <div className="text-block-title">
                            Basic intro of F1 racing   
                        </div>
                        <div className="text-block">
                            1. [ GRAND PRIX RACE ]
                            <div className="text-sub-desp">
                                About 23 GRAND PRIX per year
                            </div>
                        </div>
                        <div className="text-block">
                            2. [ CONSTRUCTORS ]
                            <div className="text-sub-desp">
                                10 constructors (teams) each year
                            </div>
                        </div>
                        <div className="text-block">
                            3. [ DRIVERS ]
                            <div className="text-sub-desp">
                                2 drivers for each constructors
                            </div>
                        </div>
                        <div className="text-block">
                            4. [ LAPS ]
                            <div className="text-sub-desp">
                                Around 50 to 70 laps each race
                            </div> 
                        </div>
                        <div className="text-block">
                            5. [ POINTS Reward ]
                            <div className="text-sub-desp">
                               1th get's 25 points to 10 gets 1 point
                            </div>
                        </div>
                        <div className="text-block">
                            6. [ Qualifying ]
                            <div className="text-sub-desp">
                               Pregame to deside starting position in GRAND PRIX
                            </div>
                        </div> 
                    </div>
                    <div>
                        <div className="text-block-title">
                            Important Attributes in Database   
                        </div>
                        <div className="text-block">
                            1. RaceId - Unique Grand prix Race 
                        </div>
                        <div className="text-block">
                            2. ConstructorId - Unique id for Counstructors
                        </div>
                        <div className="text-block">
                            3. DriverId - Unique id for Drivers
                        </div>
                        <div className="text-block">
                            4. LapId - Unique id for Laps in race
                        </div>
                    </div>
                </div>
            </div>

            <div style={{
                display: 'flex',
                flexDirection: 'column',
                marginTop: 70,
                backgroundColor:'#000',
                height: 750
            }}>
                <div 
                    className= "page-title"
                    style={{
                        width: '100%',
                        height: 100,
                        fontSize: 40,
                        color: settings.Colors['subColor']
                    }}
                >
                    <div style={{
                        marginLeft: 100,
                        marginTop: 30, 
                        display: 'flex',
                        flexDirection: 'row'
                    }}>
                        <img 
                            style={{
                                width: 100, 
                                height: 80, 
                                padding: 15,
                                borderTop: 'solid 2px #38383f',
                                borderRight: 'solid 2px #38383f',
                                borderTopRightRadius: 10
                            }} 
                            src="./racemap.png" 
                            alt="racemap" 
                            usemap="#racemap"
                        />
                        <div style={{
                            display: 'flex',
                            alignItems: 'center',
                            marginLeft: 25
                        }}>
                            PROJECT MEMBERS & PROJECT RESPONSIBILITY
                        </div>
                    </div>
                </div>
                <div style={{display: 'flex', flexDirection: 'row'}}>
                    <div>
                        <div className="text-block-title">
                            Yi-Ming Chang  
                        </div>
                        <div className="text-block">
                            [ PROJECT MANAGER ]
                            <div className="text-sub-desp">
                                Pivot project features, adjust UI and integrate API. 
                                Design the project queries and organize the schedule. 
                            </div>
                        </div>
                        <div className="text-block">
                            <a href="https://www.linkedin.com/in/yiming-chang"> 
                                [ CONTACT with LINKEDIN ]
                            </a>
                        </div>
                    </div>
                    <div>
                        <div className="text-block-title">
                            Anmol Patil  
                        </div>
                        <div className="text-block">
                            [ WEB ENGINEER ]
                            <div className="text-sub-desp">
                                Build ReactJS Components and integrate RESTful API with React Hook.
                                Efficiently collaborate with Backend Engineer. 
                            </div>
                        </div>
                        <div className="text-block">
                            <a href="https://www.linkedin.com/in/anmol-patil"> 
                                [ CONTACT with LINKEDIN ]
                            </a>
                        </div>
                    </div>
                </div>
                <div style={{display: 'flex', flexDirection: 'row'}}>
                    <div>
                        <div className="text-block-title">
                            Chien-Chia Huang  
                        </div>
                        <div className="text-block">
                            [ DATABASE ENGINEER ]
                            <div className="text-sub-desp">
                                Manage Oracle Database. Design extremely complex Queries. 
                                Collaborate with Backend to deliver the result. 
                            </div>
                        </div>
                        <div className="text-block">
                            <a href="https://www.linkedin.com/in/chienchiahuang"> 
                                [ CONTACT with LINKEDIN ]
                            </a>
                        </div>
                    </div>
                    <div>
                        <div className="text-block-title">
                            Hung-You Chou  
                        </div>
                        <div className="text-block">
                            [ BACKEND ENGINEER ]
                            <div className="text-sub-desp">
                               Constrsuct Python Server. Design RESTful API.
                               Efficiently collaborate both Fronend and Database to deliver the data.
                            </div>
                        </div>
                        <div className="text-block">
                            <a href="https://www.linkedin.com/in/hung-you-chou-039811160"> 
                                [ CONTACT with LINKEDIN ]
                            </a>
                        </div>
                    </div>
                </div>
            </div>
            
            <Bottom/>
        </div>
    )
}

export default Homepage