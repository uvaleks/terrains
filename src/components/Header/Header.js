import React from 'react'
import './header.scss'

import _ from 'lodash'
import { MainMenu } from '../../components/MainMenu/MainMenu'

import { PAGE_PUZZLE_SECTION } from '../../pages/Home/Home'

class Header extends React.Component {

    constructor(props) {
        super(props)

        this.state = {
            burger_is_showed: false,
            is_scrolling: false,
        }

        this.props.navi.setter_ (this.hideMenu, this)
    }

    headreBurgerClick() {
        this.setState((state) => ({
            burger_is_showed: !this.state.burger_is_showed,
        }))
    }

    hideMenu(this_) {
        this_.setState((state) => ({
            burger_is_showed: false,
        }))
    }

    componentDidMount() {
        window.addEventListener('scroll', () => { this.handleScroll(this) })
    }
    componentWillUnmount() {
        window.removeEventListener('scroll', () => { this.handleScroll(this) })
    }

    handleScroll(this_) {
        this_.setState({is_scrolling: true})
        this_.handleEndScroll(this_)
    }

    handleEndScroll = _.debounce((this_) => {
        this_.setState({is_scrolling: false})
    }, 500)

    render() {
        return (
            <header className={ this.state.is_scrolling ? 'scrolling' : '' }>
                <div className="notch-wrapper">
                <div className="logo-wrapper">
                    <div className="logo-div-wrapper"><a onClick={(ev) => {this.props.navi.smoothScroll(PAGE_PUZZLE_SECTION, this.props.navi); ev.preventDefault()}} href="/">
                    <div className="logo-div"></div></a></div>
                    <div className="logo-text-wrapper">
                    <a onClick={(ev) => {this.props.navi.smoothScroll(PAGE_PUZZLE_SECTION, this.props.navi); ev.preventDefault()}} href="/">
                    <div className="logo-text">terrains</div></a>
                    </div>
                </div>    
                <div
                    onClick={() => this.headreBurgerClick()} 
                    className={ "header-burger " + (this.state.burger_is_showed ? 'active' : '')}>
                    <span></span>
                </div>   
                <div className={ "whole-menu " + (this.state.burger_is_showed ? 'active' : '')}>
                    <MainMenu navi={this.props.navi} set_some_value={this.props.set_some_value}/>
                </div>
                </div>
            </header>
            )
    }
}

export default Header