import React from 'react'
import './main-menu.scss'
import ThemeSelector from '../ThemeSelector/ThemeSelector'

import { PAGE_ABOUT_SECTION } from '../../pages/About/About'
import { PAGE_STORE_SECTION } from '../../pages/Store/Store'
import { PAGE_PUZZLE_SECTION } from '../../pages/Home/Home'

class MainMenu extends React.Component {

    render() {
        return ( 
            <div className="header-nav-container">
            <nav className="header-nav">
                <input className="radio-point" type="radio" id="arctic" name="terrain" defaultChecked onClick={(ev) => { this.props.set_some_value(0); this.props.navi.smoothScroll(PAGE_PUZZLE_SECTION, this.props.navi) }}/>
                <label htmlFor="arctic" className="terrain-switch">Arctic</label>
                <input className="radio-point" type="radio" id="desert" name="terrain" onClick={(ev) => { this.props.set_some_value(1); this.props.navi.smoothScroll(PAGE_PUZZLE_SECTION, this.props.navi) }}/>
                <label htmlFor="desert" className="terrain-switch">Desert</label>
                <input className="radio-point" type="radio" id="seaside" name="terrain" onClick={(ev) => { this.props.set_some_value(2); this.props.navi.smoothScroll(PAGE_PUZZLE_SECTION, this.props.navi) }}/>
                <label htmlFor="seaside" className="terrain-switch">Seaside</label>
                <ul className="header-ul">
                    <li className="header-li"><a onClick={(ev) => {this.props.navi.smoothScroll(PAGE_ABOUT_SECTION, this.props.navi); ev.preventDefault()}} href="/about"><h4 className="header-link-text">Overview</h4></a></li>
                    <li className="header-li"><a onClick={(ev) => {this.props.navi.smoothScroll(PAGE_STORE_SECTION, this.props.navi); ev.preventDefault()}} href="/store"><h4 className="header-link-text">Collection</h4></a></li>
                    <ThemeSelector />
                </ul>
                
            </nav>
            
            </div>
            )
    }
}

export { 
    MainMenu
}