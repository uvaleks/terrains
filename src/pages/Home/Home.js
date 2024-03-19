import React from 'react'
import './home.scss'
import './loader.scss'

import { load_resources } from './load_resources'

import PuzzleHint from '../../components/PuzzleHint/PuzzleHint';
import { ACTIONS_BUY, ACTIONS_OFFER }  from '../../components/ActionButton/ActionButton'

import Terrain from '../../components/Terrain/Terrain';

// import {
//     DebugPanel,
//     MODE,
//     MODE_DEBUG,
// } from '../../components/DebugPanel/DebugPanel';

import orientation_lib from '../../orientation.js'

const PAGE_PUZZLE_SECTION = 'home-section'

const IMAGES_PATH = process.env.PUBLIC_URL + '/images' 

class Home extends React.Component {

    constructor(props) {
        super(props)

        this.state = {
            is_loaded: false,
            selected_item: null,
            hint_aim_position: { x: 0, y: 0 },
            hint_is_visible: false,
            selected_terrain: 'arctic',
        }

        this.image_cache = {}

        this.puzzle_container_ref = React.createRef()
        this.puzzle_container_container_ref = React.createRef()
        this.images_container_ref = React.createRef()

        this.my_div = React.createRef()
        this.set_selected_item = this.set_selected_item.bind(this)
        this.set_hint_aim_position = this.set_hint_aim_position.bind(this)

        this.last_selected_item_item = {
            title: "Mock",
            name: "ATC_test", 
            nft: {
                is_ino: false,
                owner: '0xDEADBEAFDEADBEAFDEADBEAFDEADBEAFDEADBEAF',
                is_offered: true,
                price: 0.777,
                link: "https://testnets.opensea.io",
                owner_info: {avatar: '#', name: null},
            }
        }
    }

    set_selected_item(item_id) {
        this.setState({
            selected_item: item_id,
            hint_is_visible: item_id !== null,
        })
    }
    set_hint_aim_position(hint_aim_position) {
        this.setState({hint_aim_position: hint_aim_position})
    }

    async componentDidUpdate() {
        if (this.props.items.length === 0)
            return

        if (this.image_cache.fona === undefined) {
            this.image_cache = await load_resources(this.props.items)
            this.setState({is_loaded: true})
        }
    }

    get_item_by_name(name) {
        let founded = this.props.items.filter(item => item.name === name)
        return founded.length > 0 ? founded[0] : null
    }

    calc_height (orientation) {
        if (orientation === orientation_lib.orientations.portrait) 
            return window.innerHeight - 70
        else 
            return Math.floor((window.innerWidth) / 1280 * 882)
    }

    render() {
        const selected_item_item = this.get_item_by_name(this.state.selected_item) ?? this.last_selected_item_item
        this.last_selected_item_item = selected_item_item

        return (
            <section id={ PAGE_PUZZLE_SECTION } >
                <orientation_lib.OrientationsContext.Consumer> 
                {orientation => ( <>
                {this.state.is_loaded ? (<Terrain 
                        orientation={ orientation }
                        items={ this.props.items }
                        image_cache={ this.image_cache }
                        set_selected_item={ this.set_selected_item }
                        set_hint_aim_position={ this.set_hint_aim_position }
                        do_terrain_scroll={this.props.do_terrain_scroll} 
                        />) : (<div style={{width: (window.innerWidth)+'px', height: this.calc_height(orientation)+'px'}}> 
                            <div className="hexdots-loader"></div>
                            <div className="hexdots-caption">Loading Terrain...</div>
                        </div>)}
                
                    <PuzzleHint 
                        is_visible={ this.state.hint_is_visible }
                        orientation={ orientation }
                        aim_position={ this.state.hint_aim_position }
                        name={ selected_item_item.title } 
                        image={ IMAGES_PATH + '/' + selected_item_item.name + '-__THEME__.png' }
                        image_obj={ IMAGES_PATH + '/' + selected_item_item.name + '-obj.png' }
                        //owner={ selected_item_item.nft.is_ino ? 'Author' : this.crop_address(selected_item_item.nft.owner) }
                        owner={ selected_item_item.nft.owner } 
                        is_ino={ selected_item_item.nft.is_ino } 
                        action={ selected_item_item.nft.is_offered ? ACTIONS_BUY : ACTIONS_OFFER } 
                        price={ selected_item_item.nft.price } 
                        store_link={ selected_item_item.nft.link } 
                        series= { selected_item_item.nft.series }
                        no= { selected_item_item.nft.no }
                        owner_info = { selected_item_item.nft.owner_info }
                    />
                </> )}
                </orientation_lib.OrientationsContext.Consumer>

                {/* { (MODE === MODE_DEBUG) && (<DebugPanel items={ this.props.items } />)} */}

            </section>
        )
    }
}

export { Home, PAGE_PUZZLE_SECTION }

