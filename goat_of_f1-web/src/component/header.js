import React, { Component } from 'react'
import { AppBar, Toolbar } from '@mui/material';

class Header extends Component {
    constructor(props) {
        super(props)
    }
    render() {
        return (
            <React.Fragment>
                <AppBar position="fixed">
                <Toolbar>TEST BAR</Toolbar>
                </AppBar>
                <Toolbar />
            </React.Fragment>
        )
    }
}

export default Header