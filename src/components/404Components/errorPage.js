import React, { Component } from 'react'
import {Link} from 'react-router-dom'
import './error.css'
export default class errorPage extends Component {
    render() {
        return (
            <div className="mainErrorDiv">
                <div>
                   <center>
                       <span  className="T404Span">404</span><br/>
                       <span className="TitleSpan" style={{color:"white"}}>Content Not Found</span><br/><br/><Link className="catalog__more" to='/' style={{margin:0}}>Back to Home</Link>
                   </center>
                </div>
                
            </div>
        )
    }
}
