import React from 'react'
import './puzzle-hint.scss'

import { ActionButton }  from '../ActionButton/ActionButton.js'

import orientation from '../../orientation.js'

import themes from '../../themes.js'


class PuzzleHint extends React.Component {

    constructor(props) {

        super(props)

        this.window_innerHeight_range = [window.innerHeight, window.innerHeight]

        this.last_aim_position = {
            x: 0,
            y: 0,
        }
    }

    crop_address(address) {
        return address.substring(0, 6) + '...' + address.substring(address.length - 4)
    }


    render() {

        let width = (() => {
            let founded = document.getElementsByClassName('hint')
            if (founded.length !== 0)
                return founded[0].getBoundingClientRect().width
            else 
                return 400
        })()

        let position = {
            x: this.props.aim_position.x + Math.floor(width / 2 * -1),
            y: this.props.aim_position.y + 10,
        }

        let hint_style = orientation.isLandscape() ? (() => {
            return { 
                left: position.x + 'px', 
                top: (this.props.is_visible) ? ((this.props.aim_position.y + 20) + 'px') : ((this.props.aim_position.y + 60) + 'px'),
            }
        })() : (() => {

            let MIN_TEXT_HH = 140
            let IMAGE_PADDING_HH = 10
            let curr_image_height = 100

            let height = Math.max(MIN_TEXT_HH, curr_image_height + IMAGE_PADDING_HH * 2)

            if (window.innerHeight < this.window_innerHeight_range[0])
                this.window_innerHeight_range[0] = window.innerHeight
            if (window.innerHeight > this.window_innerHeight_range[1])
                this.window_innerHeight_range[1] = window.innerHeight

            let curr_window_innerHeight = window.innerHeight < this.window_innerHeight_range[1] ? 
                    this.window_innerHeight_range[0] : this.window_innerHeight_range[1]           

            return {
                left: 12 + 'px',
                right: 12 + 'px',

                top: (this.props.is_visible) ? ((curr_window_innerHeight - height - 50) + 'px') : ((curr_window_innerHeight - height) + 'px'),
                
                position: 'fixed',
            }
        })()

        Object.assign(hint_style, this.props.is_visible ? {
            opacity: '1',
            pointerEvents: 'auto',
        } : {
            opacity: '0',
            pointerEvents: 'none',
        })

        return (
            <themes.ThemeContext.Consumer>{ theme => (
                <div className="hint" style={ hint_style }>
                    <div className="hint_image_conainer">
                        <img className="hint_image_fona" alt="thumbnail" src={ this.props.image.replace('__THEME__', theme.theme) } ></img>
                        <img className="hint_image_obj" alt="thumbnail" src={ this.props.image_obj }></img>
                    </div>
                    <div className="hint_info_conainer">
                        <span className="hint_nft_name">{ this.props.name }</span>
                        <div className="hint_nft_owner_all">
                            <div className={ /*this.props.owner_info.name === null*/ true ? 'hint_nft_owner_label_null' : 'hint_nft_owner_label' } style={{ backgroundImage: /*this.props.owner_info.name === null*/ true ? null : 'url(' + this.props.owner_info.avatar + ')' }} ></div>
                            <a href={ "https://testnets.opensea.io/" + this.props.owner } target="_blank" rel="noreferrer" title="To OpenSea profile">
                                <span className="hint_nft_owner">{ this.props.owner_info.name ?? this.crop_address(this.props.owner) }</span>
                            </a> 
                        </div>
                        <br/>
                        <div className="hint_button_wrapper">
                            <ActionButton 
                                    action={ this.props.action } 
                                    price={ this.props.price } 
                                    store_link={ this.props.store_link } />
                        </div>
                    </div>
                </div>)} 
            </themes.ThemeContext.Consumer>
        )
    }
}

export default PuzzleHint