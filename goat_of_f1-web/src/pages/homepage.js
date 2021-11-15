import React, { Component } from 'react'
import Header from '../component/header'
import Driver from '../component/driver'

class Homepage extends Component {
    constructor(props) {
        super(props)
    }
    render() {
        return (
            <div>
                <Header/>
                This is the home page test
                <Driver/>
            </div>
        )
    }
}

export default Homepage