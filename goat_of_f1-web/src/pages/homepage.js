import React, { Component } from 'react'
import Header from '../component/header'

class Homepage extends Component {
    constructor(props) {
        super(props)
    }
    render() {
        return (
            <div>
                <Header/>
                This is the home page test
            </div>
        )
    }
}

export default Homepage