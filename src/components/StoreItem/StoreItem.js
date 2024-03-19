import React from 'react'
import './store-item.scss'

import themes from '../../themes.js'

import { ActionButton, ACTIONS_BUY, ACTIONS_OFFER } from '../ActionButton/ActionButton.js'
import nftlogo from './logo300.png'
import orientation from '../../orientation.js'

class StoreItem extends React.Component {

    crop_address(address) {
        return address.substring(0, 6) + '...' + address.substring(address.length - 4)
    }

    on_mouse_move(ev, theme) {

        if (orientation.isPortait ())

        return

        const bodyRect = document.body.getBoundingClientRect()
        const rect = this.card.current.getBoundingClientRect()
        const shine_rect = this.obj_shine.current.getBoundingClientRect()

        let shine_pos = {
            x: ev.pageX - (rect.left - bodyRect.left) - 20,
            y: ev.pageY - (rect.top - bodyRect.top) - 20,
        }
        Object.assign(shine_pos, {
            nx: shine_pos.x / shine_rect.width,
            ny: shine_pos.y / shine_rect.height,
        })
        Object.assign(shine_pos, {
            ncx: shine_pos.nx - 0.5,
            ncy: shine_pos.ny - 0.5,
        })

        let pos = {
            x: ev.pageX - (rect.left - bodyRect.left),
            y: ev.pageY - (rect.top - bodyRect.top),
        }
        Object.assign(pos, {
            nx: pos.x / rect.width,
            ny: pos.y / rect.height,
        })
        Object.assign(pos, {
            ncx: pos.nx - 0.5,
            ncy: pos.ny - 0.5,
        })
        
        pos.angle = (Math.atan2(pos.ncy, pos.ncx) / Math.PI * 180 + 360) % 360

        this.set_animation(pos, shine_pos, theme)
    }

    on_mouse_out(ev, theme) {
        // let pos = {
        //     ncx: 0,
        //     ncy: 0,
        //     nx: 0.5,
        //     ny: 0.5,
        //     angle: 90,
        // }


    //     this.set_animation(pos, pos, theme)

        this.card.current.style.transform = null
        this.shine.current.style.background = null
        this.obj_shine.current.style.background = null

    }

    

    set_animation(pos, shine_pos, theme) {
        const OFFSET_POWER = 10
        //this.obj.current.style.transform = 'translateX(' + (-pos.ncx * OFFSET_POWER) + 'px) translateY(' + (-pos.ncy * OFFSET_POWER) + 'px)'
        //this.obj_shine.current.style.transform = 'translateX(' + (-shine_pos.ncx * OFFSET_POWER) + 'px) translateY(' + (-shine_pos.ncy * OFFSET_POWER) + 'px)'

        //this.card.current.style.transform = 'translateX(' + (pos.ncx * OFFSET_POWER) + 'px) translateY(' + (pos.ncy * OFFSET_POWER) + 'px)'
        //this.card.current.style.transform = 'translateY(' + -pos.ncx * OFFSET_POWER + 'px) rotateX(' + (-pos.ncy * OFFSET_POWER) + 'deg) rotateY(' + (pos.ncx * (OFFSET_POWER * 2)) + 'deg)'
        
        this.card.current.style.transform =  'perspective(1000px) rotateX(' + (pos.ncy * (OFFSET_POWER * 2)) + 'deg) rotateY(' + (-pos.ncx * (OFFSET_POWER * 4)) + 'deg) translateX(' + (pos.ncx * OFFSET_POWER) + 'px) translateY(' + (pos.ncy * OFFSET_POWER) + 'px)'

        

        const themed_shine = theme.theme === themes.themes.light ? '0.5) 0px, rgba(255,255,255,0) 250px)' : '0.1) 0px, rgba(255,255,255,0) 200px)'
        const themed_obj_shine = theme.theme === themes.themes.light ? '0.75) 100px, rgba(0,0,0,0) 150px)' : '0.5) 75px, rgba(0,0,0,0) 175px)'

        //this.shine.current.style.background = 'linear-gradient(' + (pos.angle - 90) + 'deg, rgba(255,255,255,' + themed_shine + ') 0%, rgba(255,255,255,0) 50%)'
        this.shine.current.style.background = 'radial-gradient(circle at ' + (pos.nx * 100) + '% ' + (pos.ny * 100) + '%, rgba(255,255,255,' + themed_shine
        this.obj_shine.current.style.background = 'radial-gradient(at ' + (shine_pos.nx * 100) + '% ' + (shine_pos.ny * 100) + '%, rgba(0,0,0,' + themed_obj_shine
        //this.obj_shine.current.style.background = 'linear-gradient(' + (pos.angle - 90) + 'deg, rgba(255,255,255,' + themed_obj_shine

    }

    constructor(props) {
        super(props)
        this.card = React.createRef()
        this.obj = React.createRef()
        this.obj_shine = React.createRef()
        this.shine = React.createRef()
    }

    render() {


        return (
            <themes.ThemeContext.Consumer>{theme => 
                <div className="nft_store_card" ref={this.card} onMouseMove={ (ev) => this.on_mouse_move(ev, theme) } onMouseLeave={ (ev) => this.on_mouse_out(ev, theme) }>    
                    <div className={"nft_store_card_backside " + (this.props.is_turned ? "turned" : "unturned")}>
                        <img src={nftlogo} alt="logo"/>
                    </div>
                    
                    <div className={"nft_store_card_frontside " + (!this.props.is_turned ? "turned" : "unturned")} onClick={ () => window.open(this.props.store_link) } >
                    
                    {/* <a className="nft_store_card_link" href={ this.props.store_link } target="_blank" rel="noreferrer"> */}
                    <div className="shine" ref={this.shine}></div>
                        
                        <div className="nft_store_card_body">
                            <div className="nft_store_card_header">
                                <div className="nft_store_card_diamond">{ this.props.no }</div>
                                <div className="nft_store_card_name">{ this.props.name }</div>
                            </div>
                            <div className="nft_store_card_pic_block">
                                <img className="nft_store_card_pic_fona" src={ this.props.image.replace('__THEME__', theme.theme) } alt={ this.props.name } />
                                <div className="nft_store_card_pic_obj"></div>
                                <img className="nft_store_card_pic_obj" ref={this.obj} src={ this.props.image_obj } alt={ this.props.name } />
                                <img className="nft_store_card_pic_obj_shine" style={{ WebkitMaskImage: 'url(' + this.props.image_obj + ')' }} src="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7" ref={this.obj_shine} alt="" />
                            </div>
                            <div className="nft_store_card_info">
                                <div className="nft_store_card_text_block">
                                    
                                    
                                    {/* <div className="nft_store_card_series">No { this.props.no }</div> */}
                                    <div className="hint_store_card_owner_all">
                                        <div className="hint_store_card_owned_by">Owned by</div>
                                        <a href={ "https://testnets.opensea.io/" + this.props.owner } target="_blank" rel="noreferrer" title="To OpenSea profile"> 
                                            <div className={ /*this.props.owner_info.name === null*/ true ? 'hint_store_card_label_null' : 'hint_store_card_label' } style={{ backgroundImage: /*this.props.owner_info.name === null*/ true ? null : 'url(' + this.props.owner_info.avatar + ')' }}></div>
                                            {/* <span className="hint_store_card_owner">{ this.props.is_ino ? 'Author' : this.crop_address(this.props.owner) }</span> */}
                                            <span className="hint_store_card_owner">{ this.props.owner_info.name ?? this.crop_address(this.props.owner) }</span>
                                        </a>    
                                    </div>
                                    <div className="nft_store_card_collection">{ this.props.collection }</div>
                                    <div className="nft_store_card_series">Series { this.props.series }</div>
                                    <div className="nft_store_card_price_block">
                                    <ActionButton action={ this.props.action } price={ this.props.price } store_link="#" />
                                    </div>
                                </div>
                                
                            </div>
                        </div>
                    {/* </a> */}
                    </div>
                </div>
            }</themes.ThemeContext.Consumer>
        )
    }
}

export {
    StoreItem,
    ACTIONS_BUY,
    ACTIONS_OFFER
} 