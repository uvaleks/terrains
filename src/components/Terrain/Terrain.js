import React from 'react'
import './terrain.scss'

// import { Helmet } from "react-helmet"

// import {
//     MODE,
//     MODE_RELEASE,
//     DEDUG_ITEM_PRICE,
// } from '../../components/DebugPanel/DebugPanel';

import orientation_lib from '../../orientation.js'


import terrain_desert from './desert_blurred.png'
import terrain_seaside from './seaside_blurred.png'

import {
    create_part_image,
    create_part_markers,
    create_canvas_copy,
    create_puzzle_container_context,
} from './create_objects';

import { touch_mixin } from './touch_mixin'

const FLAG_OFFSET_Y = 30
const FLAG_OFFSET_X = -25

class Terrain extends React.Component {

    set_clean_state(state) {
        if (this.is_clear === state)
            return 
        this.is_clear = state

        if (!state) {

            const MAX_TIMEOUT = 500

            this.props.items
                .forEach(item => {
                    let timeout = Math.random() * MAX_TIMEOUT
                    let markers = [item.marker, item.marker2, item.marker3]
                    markers.filter(marker => marker !== undefined).forEach(marker => marker.show(timeout))
                })
        } else {
            this.props.items
                .flatMap(item => [item.marker, item.marker2, item.marker3])
                .filter(marker => marker !== undefined)
                .forEach(marker => marker.hide())
        }
    }

    async load_puzzle() {
        this.PUZZLE_SCALE_INIT = (() => {
            
            let container_rect = this.puzzle_container_container_ref.current.getBoundingClientRect()

            if (this.props.orientation === orientation_lib.orientations.portrait) 
                return (window.innerHeight - 70) / this.props.image_cache.fona.height
            else 
                return Math.floor(container_rect.width * 1.00) / this.props.image_cache.fona.width 
        })()

        this.PUZZLE_SCALE = this.PUZZLE_SCALE_INIT
        this.FONA_SCREEN_SIZE = {width: this.props.image_cache.fona.width, height: this.props.image_cache.fona.height}
        this.FONA_SCREEN_POS = {x: 0, y: 0}
        this.FONA_ON_LOWER_EDGE = true
        this.FONA_SCREEN_SIZE_update = () => { 
            this.FONA_SCREEN_SIZE.width = this.props.image_cache.fona.width * this.PUZZLE_SCALE
            this.FONA_SCREEN_SIZE.height = this.props.image_cache.fona.height * this.PUZZLE_SCALE
        }
        this.FONA_SCREEN_SIZE_update()

        this.props.image_cache.full_map = create_canvas_copy(this.props.image_cache.fona)

        this.props.items.forEach((part) => {
            create_part_image(part, this.props.image_cache)
            create_part_markers(part, this.images_container_ref.current, this.props.image_cache, this.PUZZLE_SCALE)
        })

        let puzzle_container_context = create_puzzle_container_context(this.puzzle_container_ref.current, this.FONA_SCREEN_SIZE, this.props.image_cache.fona)  

        if (this.props.orientation === orientation_lib.orientations.portrait)
        {
            this.canvas_holder_ref.current.style.height = (window.innerHeight) + 'px'
            this.canvas_holder_ref.current.style.width = (window.innerWidth) + 'px'
            // this.canvas_holder_ref.current.scroll(Math.max(Math.floor((this.FONA_SCREEN_SIZE.width - window.innerWidth) / 2), 0), 0)
        }
        // else {
        //     this.canvas_holder_ref.current.style.height = Math.floor((window.innerWidth) / 1280 * 882)+'px'
        //     this.canvas_holder_ref.current.style.width = (window.innerWidth)+'px'
        // }

        if (true) { 
            puzzle_container_context.drawImage(this.props.image_cache.full_map, 0, 0)
            this.set_clean_state(true)
        }

        this.props.items
            .flatMap(item => [item.marker, item.marker2, item.marker3])
            .filter(marker => marker !== undefined)
            .forEach(marker => {
                marker.image.onmousemove = () => {
                    this.on_mouse_move(marker.image.PUZZLE_part)
                }
            })

        this.is_custom_scaling = false
        this.is_custom_moving = false
        this.first_touch_pos = {
            x0: 0, 
            y0: 0, 
            x1: 0, 
            y1: 0, 
            screen_offset_x: 0, 
            screen_offset_y: 0, 
            screen_x: 0, 
            screen_y: 0, 
            len: 0, 
            center_x: 0, 
            center_y: 0,
            scale: 0,
        }
    }

    puzzle_container_onmousemove(ev) {

        this.set_clean_state(false)

        const cursor_pos = {
            x: ev.pageX,
            y: ev.pageY - 70,
        }

        // let ctx = this.puzzle_container_ref.current.getContext("2d")
        // ctx.fillStyle = "#FF0000"
        // ctx.fillRect(this.FONA_SCREEN_POS.x + cursor_pos.x / this.PUZZLE_SCALE - 3, this.FONA_SCREEN_POS.y + cursor_pos.y / this.PUZZLE_SCALE - 3, 6, 6)
        // ctx.fillStyle = "#FFFF00"
        // var parts = this.props.items.filter(part => part.nft.is_ino).forEach(part => {
        //     ctx.fillRect((part.position.x + part.flag_offset.x + FLAG_OFFSET_X) - 30, (part.position.y + part.flag_offset.y + FLAG_OFFSET_Y) - 30, 60, 60)
        // })

        const FLAG_POINT_RANGE = 30
        var parts = this.props.items.filter(part => part.nft.is_ino).filter(part => 
            Math.pow(cursor_pos.x - (this.FONA_SCREEN_POS.x + (part.position.x + part.flag_offset.x + FLAG_OFFSET_X) * this.PUZZLE_SCALE), 2) + 
            Math.pow(cursor_pos.y - (this.FONA_SCREEN_POS.y + (part.position.y + part.flag_offset.y + FLAG_OFFSET_Y) * this.PUZZLE_SCALE), 2)
            < Math.pow(FLAG_POINT_RANGE, 2)
        )

        const TO_HINT_FIELD = 15
        if (parts.length === 0)
            parts = this.props.items.filter(part => !part.nft.is_ino).filter(part => 
                (this.FONA_SCREEN_POS.x + part.position.x * this.PUZZLE_SCALE <= cursor_pos.x) && 
                (cursor_pos.x <= this.FONA_SCREEN_POS.x + part.position.x * this.PUZZLE_SCALE + part.size.width * this.PUZZLE_SCALE) &&
                (this.FONA_SCREEN_POS.y + part.position.y * this.PUZZLE_SCALE <= cursor_pos.y) && 
                (cursor_pos.y <= this.FONA_SCREEN_POS.y + part.position.y * this.PUZZLE_SCALE + part.size.height * this.PUZZLE_SCALE + TO_HINT_FIELD)
            )

        this.on_mouse_move(parts.length !== 0 ? parts[0] : null)
    }

    on_mouse_move(part) {

        if (part != null) {
            this.hint_show(part)

            this.puzzle_container_ref.current.style.cursor = 'context-menu'

            this.props.items
                .filter(item => item !== part)
                .flatMap(item => [item.marker, item.marker2, item.marker3])
                .filter(marker => marker !== undefined)
                .forEach(marker => marker.unselect())

            let markers = [part.marker, part.marker2, part.marker3]
            markers.filter(marker => marker !== undefined).forEach(marker => marker.select())
        } else {
            this.hint_hide()

            this.props.items
                .flatMap(item => [item.marker, item.marker2, item.marker3])
                .filter(marker => marker !== undefined)
                .forEach(marker => marker.unselect())

            this.puzzle_container_ref.current.style.cursor = 'default' 
        }
    }

    puzzle_container_onmouseleave(ev) { 

        let rect = this.puzzle_container_ref.current.getBoundingClientRect()
        if ((0 <= ev.pageX) && (ev.pageX <= rect.width) && (0 <= ev.pageY - 70) && (ev.pageY - 70 <= rect.height))
            return

        this.set_clean_state(true)

        this.props.items
            .flatMap(item => [item.marker, item.marker2, item.marker3])
            .filter(marker => marker !== undefined)
            .forEach(marker => marker.hide())

        this.hint_hide()

        this.puzzle_container_ref.current.style.cursor = 'default' 
    }

    hint_hide() {
        this.prev_hovered_part_name = null  
        this.props.set_selected_item(null)
    }

    hint_show(part) {
        if (this.prev_hovered_part_name === part.name)
            return
        this.prev_hovered_part_name = part.name
            
        // if (MODE === MODE_RELEASE) {
            part.price = part.nft.price
        // } else {
        //     part.price = DEDUG_ITEM_PRICE
        // }

        this.hint_update_position(part.name)
                    
        this.props.set_selected_item(part.name)
    }

    hint_update_position(part_name) {
        let get_offset = (el) => {
            var rect = el.getBoundingClientRect(),
            scrollLeft = window.pageXOffset || document.documentElement.scrollLeft,
            scrollTop = window.pageYOffset || document.documentElement.scrollTop;
            return { top: Math.floor(rect.top + scrollTop), left: Math.floor(rect.left + scrollLeft) }
        }

        let offset = get_offset(this.puzzle_container_ref.current)

        let part = this.props.items.filter(item => item.name === part_name)[0]

        let hint_aim_position = (() => {
            if (!part.nft.is_ino)
                return {
                    x: offset.left + (part.position.x + part.size.width / 2) * this.PUZZLE_SCALE,
                    y: offset.top + (part.position.y + part.size.height) * this.PUZZLE_SCALE,
                }
            else 
                return {
                    x: offset.left + (part.position.x +part.flag_offset.x + FLAG_OFFSET_X) * this.PUZZLE_SCALE,
                    y: offset.top + (part.position.y + part.flag_offset.y + FLAG_OFFSET_Y) * this.PUZZLE_SCALE,
                }
        }) ()

        this.props.set_hint_aim_position(hint_aim_position)
    }

    constructor(props) {
        super(props)

        this.state = {
            width: 100,
            map_on_the_edge: true,
        }

        this.prev_hovered_part_name = null
        this.is_clear = false

        this.puzzle_container_ref = React.createRef()
        this.puzzle_container_container_ref = React.createRef()
        this.images_container_ref = React.createRef()
        this.canvas_holder_ref = React.createRef()

        // react dont support real mixin. 
        this.puzzle_container_ontouchstart = touch_mixin.puzzle_container_ontouchstart
        this.puzzle_container_ontouchend = touch_mixin.puzzle_container_ontouchend
        this.puzzle_container_ontouchmove = touch_mixin.puzzle_container_ontouchmove
    }

    async update_FONA_ON_LOWER_EDGE () {
        this.setState ({
            map_on_the_edge: this.FONA_ON_LOWER_EDGE
        })
    }

    componentWillUnmount() {
        window.removeEventListener('scroll', (ev) => { this.handleScroll(this, ev) })
    }

    handleScroll(this_, ev) {
        const r = ev.target.body.getBoundingClientRect()
        if (-r.top > window.innerHeight / 3)
            this_.hint_hide()
    }

    async componentDidMount() {

        window.addEventListener('scroll', (ev) => { this.handleScroll(this, ev) })

        await this.load_puzzle()
        this.setState({
            width: this.puzzle_container_ref.current.style.width.toString().replace('px', '')
        }) 
        this.props.do_terrain_scroll.actor = (val) => {
            const terrain_width = this.state.width
            const first_screen_width = (this.props.orientation === orientation_lib.orientations.portrait) ? window.innerWidth : terrain_width
            const offset = (val > 0 ? +first_screen_width : 0) + (val > 1 ? +terrain_width : 0)
            this.puzzle_container_container_ref.current.scrollTo({
                left: offset,
                top: 0,
                behavior:(this.props.orientation === orientation_lib.orientations.portrait) ? 'auto' : 'smooth'
            })
        }

        this.puzzle_container_container_ref.current.scrollTo({
            left: 0,
            top: 0,
            behavior: 'auto'
        })
    }

    render() {
        return <>
        <div 
            id="nft_puzzle_container" 
                ref={this.puzzle_container_container_ref}     
                style={ this.props.orientation === orientation_lib.orientations.landscape ?
                    {overflowX: 'hidden', overflowY: 'none', whiteSpace:'nowrap', display: 'inline-block', minWidth: 100 + '%', lineHeight: 0} :
                    {overflowX: 'none', overflowY: 'none', whiteSpace:'nowrap', display: 'inline-block', touchAction: this.state.map_on_the_edge ? 'auto' : 'none' }
                } 
                className="nft_puzzle_container"
                >
            <div 
                className="canvas_holder" 
                ref={this.canvas_holder_ref}
                style={{display: 'inline-block', overflowX: 'hidden', overflowY: 'hidden'}} 
                onMouseLeave={(ev) => this.puzzle_container_onmouseleave(ev)}
                onMouseMove={(ev) => this.puzzle_container_onmousemove(ev)}
                >
                <div ref={this.images_container_ref} id="images_container"></div>
                <canvas 
                    className="arctic_canvas" 
                    ref={this.puzzle_container_ref} id="fona-container"
                    onTouchStart={(ev) => this.puzzle_container_ontouchstart(ev)}
                    onTouchEnd={(ev) => this.puzzle_container_ontouchend(ev)}
                    onTouchMove={(ev) => this.puzzle_container_ontouchmove(ev)}
                    ></canvas>
            </div>
            <div style={{ display:"inline-block", width: this.state.width+'px', height: Math.floor(this.state.width / 1280 * 882)+'px', overflowY: 'hidden'}} className="desert_blurred" id="terrain_desert">
                <div className="coming_soon_div"><p>Coming</p><p>Soon</p></div>
                <img style={{width: 100+'%', verticalAlign: 'unset'}} src={terrain_desert} alt="terrain_desert" />
            </div>
            <div style={{ display:"inline-block", width: this.state.width+'px', height: Math.floor(this.state.width / 1280 * 882)+'px', overflowY: 'hidden'}} className="seaside_blurred" id="terrain_seaside">
                <div className="coming_soon_div"><p>Coming<br />Soon</p></div>
                <img style={{width: 100+'%', verticalAlign: 'unset'}} src={terrain_seaside} alt="terrain_desert" />
            </div>
        </div>
        {/* <Helmet><meta name="viewport" content="width=device-width, height=device-height, initial-scale=1.0, maximum-scale=1.0, user-scalable=0, shrink-to-fit=no" /></Helmet> */}
        </> 
    }
}

export default Terrain