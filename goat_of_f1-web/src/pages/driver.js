import React, { Component } from 'react'
import Header from '../component/header'
import Driver from '../component/driver'

class DriverPage extends Component {
    constructor(props) {
        super(props)
    }
    render() {
        return (
            <div>
                <Header/>
                <Driver/>
            </div>
        )
    }
}

export default DriverPage