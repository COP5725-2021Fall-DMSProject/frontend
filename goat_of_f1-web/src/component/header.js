import React, { Component } from 'react'
import { AppBar, Toolbar, Button } from '@mui/material'
import settings from '../settings'
import { height } from '@mui/system'
import { Link } from 'react-router-dom'

class Header extends Component {
    constructor(props) {
        super(props)
    }
    render() {
        return (
            <React.Fragment>
                <AppBar position="fixed" 
                    style={{
                        background: settings.Colors['mainColor'],
                        height: 71,
                        display: 'flex',
                        justifyContent: 'center'
                    }}
                >
                        
                    <Toolbar variant="dense">
                        <img 
                            src="./f1_logo.svg" alt="Formula 1"
                            style={{
                                width: 130,
                                height: 32.5
                            }}
                        />
                        <div style={{position: 'absolute', right: 150}}>
                            <Button 
                                style={{
                                    fontFamily: 'Titillium Web',
                                    fontSize: settings.HeaderText['fontSize'],
                                    color: settings.Colors['subColor']
                                }}
                                component={Link}
                                to="/" 
                            >
                                Home 
                            </Button>
                            <Button 
                                style={{
                                    fontFamily: 'Titillium Web',
                                    fontSize: settings.HeaderText['fontSize'],
                                    color: settings.Colors['subColor']
                                }}
                                component={Link}
                                to="/driver"                          
                            >
                                Driver 
                            </Button>
                            <Button 
                                style={{
                                    fontFamily: 'Titillium Web',
                                    fontSize: settings.HeaderText['fontSize'],
                                    color: settings.Colors['subColor']
                                }}
                            >
                                F1 Query 
                            </Button>
                            <Button 
                                style={{
                                    fontFamily: 'Titillium Web',
                                    fontSize: settings.HeaderText['fontSize'],
                                    color: settings.Colors['subColor']
                                }}
                            >
                                About Us 
                            </Button>
                        </div>
                    </Toolbar>
                </AppBar>
            </React.Fragment>
        )
    }
}

export default Header