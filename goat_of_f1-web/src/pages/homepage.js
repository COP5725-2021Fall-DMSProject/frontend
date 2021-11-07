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
                <Driver/>
                This is the home page test
            </div>
        )
    }
}

export default Homepage