import React from 'react'
import { AppBar } from '@mui/material'
import settings from '../settings'
import { fontSize } from '@mui/system'

function Bottom() {
    return (
        <div
            style={{
                background: 'rgb(56, 56, 63)',
                height: 125,
                display: 'flex',
                justifyContent: 'center',
                fontSize: 20
            }}
        >
            <div className="text-block" style={{width: 800, marginTop: 15}}>
                All the image Copy Right belones to Official Formula One Digital Media.
                <div style={{marginTop: 3}}>
                    <a href='https://www.formula1.com/en/toolbar/legal-notices.html'>
                        This Project follows - Formula 1 Legal Notices
                    </a>
                </div>
                <div style={{marginTop: 5}}>
                    Guidelines for use of the Formula One Copyright for education purposes.
                </div>
            </div>    
        </div>
    )
}

export default Bottom