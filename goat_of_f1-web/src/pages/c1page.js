import React, { Component } from 'react'
import Header from '../component/header'
import PageC1 from '../component/pageC1'

class C1Page extends Component {
    constructor(props) {
        super(props)
    }
    render() {
        return (
            <div>
                <Header/>
                <PageC1/>
            </div>
        )
    }
}

export default C1Page