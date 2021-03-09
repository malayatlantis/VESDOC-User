import React, { Component } from 'react'
import {Link} from 'react-router-dom'
export default class MobileMenu extends Component {
    render() {
        return (
            <div className="MobileMenu">
                <a id="home" className="menu-item" href="/">Home</a>
                <a id="about" className="menu-item" href="/about">About</a>
                <a id="contact" className="menu-item" href="/contact">Contact</a>     
                <Link to="/CategoryMobile">Genres</Link>
            </div>
        )
    }
}
