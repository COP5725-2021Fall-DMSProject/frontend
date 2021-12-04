import React, { useState, useEffect} from "react";
import Header from '../component/header'
import { Card, CardMedia, CardContent, Typography, CardActionArea} from '@mui/material'
import settings from '../settings'
import { Carousel } from 'react-bootstrap'
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
                <div style={{}}>
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
                                Group 14 - Goat of F1 Racing
                            </div>
                        </div>
                    </div>
                    {ControlledCarousel()}
                </div>
            </div>
        </div>
    )
}

export default Homepage