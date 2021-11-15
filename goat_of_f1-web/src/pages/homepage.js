import React, { Component } from 'react'
import Header from '../component/header'
import { Card, CardMedia, CardContent, Typography, CardActions, Button} from '@mui/material'
import settings from '../settings'

class Homepage extends Component {
    constructor(props) {
        super(props)
    }

    creatingCarouselCard = () => {
        return (
            <Card sx={{ maxWidth: 600, backgroundColor:'#38383f'}}>
                <CardMedia
                    component="img"
                    height="200"
                    image="./home_nextHamliton.jpg"
                    alt="home_nextHamilton"
                />
                <CardContent>
                    <Typography 
                        gutterBottom variant="h5" component="div"
                        sx={{ color: settings.Colors.subColor, fontFamily: settings.Font.secondary }}
                    >
                        Who's the next Hamilton?
                    </Typography>
                    <Typography sx={{ color: settings.Colors.subColor, fontFamily: settings.Font.major }} variant="body2" color="text.secondary">
                        Hamilton is the Most Drivers’ World Championships (7 Championships). 
                        This query we want to show who's will possibly the next Hamilton.
                    </Typography>
                </CardContent>
                <CardActions>
                    <Button size="small">Enter</Button>
                </CardActions>
            </Card>
        )
    }

    render() {
        return (
            <div>
                <Header/>
                <div style={{
                    display: 'flex',
                    flexDirection: 'column',
                    marginTop: 80,
                    backgroundColor:'#000',
                    height: 600
                }}>
                    <div style={{
                        marginLeft: 50 
                    }}>
                        <div style={{
                            width: '100%',
                            height: 100,
                            fontFamily: 'Audiowide',
                            fontSize: 40,
                            color: settings.Colors['subColor']
                        }}>
                            <div style={{
                                marginTop: 30, 
                                display: 'flex',
                                flexDirection: 'row'
                            }}>
                                <img 
                                    style={{
                                        width: 50, 
                                        height: 37.5, 
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
                        {this.creatingCarouselCard()}
                    </div>
                </div>
            </div>
        )
    }
}

export default Homepage