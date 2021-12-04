import React, { useEffect } from 'react'
import { AppBar, Toolbar, Button } from '@mui/material'
import settings from '../settings'
import { Link } from 'react-router-dom'

function Header() {
    const [scrollState, setScrollState] = React.useState({ scrollTo: "" });
    React.useEffect(() => {
        if (scrollState.scrollTo == "Query") {
          window.scrollTo(0, 0);
        }
        else if (scrollState.scrollTo == "Introduction") {
            window.scrollTo(0, 800);
        }
        else if (scrollState.scrollTo == "AboutUs") {
            window.scrollTo(0, 2120);
        }
    }, [scrollState.scrollTo]);

    function handleQueryClick() {
        setScrollState({ scrollTo: "Query" });
    }

    function handleIntroClick() {
        setScrollState({ scrollTo: "Introduction" });
    }

    function handleAboutUsClick() {
        setScrollState({ scrollTo: "AboutUs" });
    }

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
                                fontFamily: settings.Font.major,
                                fontSize: settings.HeaderText.fontSize,
                                color: settings.Colors.subColor
                            }}
                            component={Link}
                            to="/" 
                        >
                            Home 
                        </Button>
                        <Button 
                            style={{
                                fontFamily: settings.Font.major,
                                fontSize: settings.HeaderText.fontSize,
                                color: settings.Colors.subColor
                            }}
                            onClick={handleIntroClick}                           
                        >
                            Introduction 
                        </Button>
                        <Button 
                            style={{
                                fontFamily: settings.Font.major,
                                fontSize: settings.HeaderText.fontSize,
                                color: settings.Colors.subColor
                            }}
                            onClick={handleQueryClick} 
                        >
                            F1 Query 
                        </Button>
                        <Button 
                            style={{
                                fontFamily: settings.Font.major,
                                fontSize: settings.HeaderText.fontSize,
                                color: settings.Colors.subColor
                            }}
                            onClick={handleAboutUsClick}
                        >
                            About Us 
                        </Button>
                    </div>
                </Toolbar>
            </AppBar>
        </React.Fragment>
    )
}

export default Header