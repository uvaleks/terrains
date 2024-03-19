import './App.scss'
import './nullstyle.scss'
import React from 'react'

import Header from '../components/Header/Header.js'
import Footer from '../components/Footer/Footer.js'

import { Home } from '../pages/Home/Home.js'
import { About } from '../pages/About/About.js'
import { Store } from '../pages/Store/Store.js'

import themes from '../themes.js'
import orientation from '../orientation.js'

import nft_lib from './nfts'
import items_lib from './items'

class App extends React.Component {

	constructor(props) {
		super(props);

		this.setTheme = (theme) => { 
			this.setState(state => ({
				theme: {
					theme: theme,
					setter_: state.theme.setter_
				}
		}))}

		this.state = {
			items: [],
			DEBUG_nfts: [],
			do_terrain_scroll: {
				actor: (val) => console.log(val),
			},
			theme: {
				theme: themes.get_SYSTEM_THEME(),
				setter_: this.setTheme
			},
			orientation: orientation.get(),
			navi: {
				smoothScroll: this.smoothScroll,
				hide_menu: null,
				setter_: (hide_menu, this_)=>{
					this.setState(state => ({
						navi: {
							smoothScroll: state.navi.smoothScroll,
							setter_: state.navi.setter_,
							hide_menu: hide_menu,
							this_: this_
						}}))
				},
				this_: null 
			}
		}

		this.set_some_value = this.set_some_value.bind(this)
	}

	async componentDidMount() {
		let updateSize = function(app) {
			let current_orientation = orientation.get()
			if (current_orientation !== app.state.orientation)
			{
				app.setState({orientation: current_orientation})
			}
		}
		window.addEventListener('resize', () => { updateSize(this) });

		const nfts = await nft_lib.load_nfts((nfts) => {
			items_lib.link_nfts(this.state.items, nfts)
			this.setState({
				items: this.state.items,
			})
		})
		let items = await items_lib.load_items()
		items_lib.link_nfts(items, nfts)
		
		this.setState({
			items: items,
			DEBUG_nfts: nfts,
		})
    }

	smoothScroll(section_id, navi) {
        let targetSection = document.getElementById(section_id)
        targetSection.scrollIntoView({ behavior: 'smooth' })
		navi.hide_menu(navi.this_)
    }

	set_some_value(val) {
		this.state.do_terrain_scroll.actor(val)
	}

	render() {
		if ((this.state.theme.theme === themes.themes.dark) || (this.state.theme.theme === themes.themes.light)) {
			if (!document.body.classList.contains(this.state.theme.theme)) {
				if (document.body.classList.contains(themes.themes.dark))
					document.body.classList.remove(themes.themes.dark)
				if (document.body.classList.contains(themes.themes.light))
					document.body.classList.remove(themes.themes.light)

				document.body.classList.add(this.state.theme.theme)
			}
		}

		const current_orientation = orientation.isPortait() ? 
				orientation.orientations.portrait : orientation.orientations.landscape

		return (
			<orientation.OrientationsContext.Provider value={ current_orientation }>
			<themes.ThemeContext.Provider value={ this.state.theme }>
				<div className={ 'app ' + this.state.theme.theme }>
					<Header navi={this.state.navi} set_some_value={this.set_some_value} />
					<main>
						<Home do_terrain_scroll={this.state.do_terrain_scroll} items={this.state.items} />
						<About/>
						<Store items={this.state.items} />
					</main>
					<br />
					<Footer />
				</div>
			</themes.ThemeContext.Provider>
			</orientation.OrientationsContext.Provider>
		)
	}
}

export default App