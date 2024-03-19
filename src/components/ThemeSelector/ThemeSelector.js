import React from 'react'
import './theme-selector.scss'

import themes from '../../themes.js'

class ThemeSelector extends React.Component {

    constructor(props) {
        super(props)

        this.state = {
            theme: themes.themes.light,
            use_system_theme: true
        }
    }

    componentDidMount() {
        
        let stored_theme = themes.load_theme()
        this.setState((state) => ({
            theme: stored_theme.theme,
            use_system_theme: stored_theme.use_system_theme
        }))

        this.context.setter_(stored_theme.theme)

        document.addEventListener(themes.CHANGE_SYSTEM_THEME_EVENT_ID, () => {
            if (!this.state.use_system_theme)
                return

            this.set_system_theme_state(true)
        })
    }

    set_dart_theme_state(theme_state_is_dark) {
        let theme = theme_state_is_dark ? themes.themes.dark : themes.themes.light

        this.setState((state) => ({
            theme: theme,
            use_system_theme: false
        }))

        this.context.setter_(theme)

        themes.save_theme({
            theme: theme,
            use_system_theme: false
        })
    }

    set_system_theme_state(theme_state_is_system) {
        this.setState((state) => ({
            theme: themes.get_SYSTEM_THEME(),
            use_system_theme: theme_state_is_system
        }))

        this.context.setter_(themes.get_SYSTEM_THEME())

        themes.save_theme({ 
            theme: themes.get_SYSTEM_THEME(),
            use_system_theme: theme_state_is_system
        })
    }

    static contextType = themes.ThemeContext;
    render() {
        return (
            <div className="switch-container">
                <span className="switch-text">Dark Mode</span>
                    <input type="checkbox" className="switch-checkbox"
                            id={`switch-new-1`}
                            checked={ this.state.theme === themes.themes.dark } 
                            onChange={(ev) => this.set_dart_theme_state(ev.target.checked)} />
                    <label
                        className="switch-label"
                        htmlFor={`switch-new-1`}
                        >
                        <span className={`switch-button`} />
                </label>
                <div style={{ width: '13px' }}></div>
                <span className="switch-text">Auto</span><input type="checkbox" className="switch-checkbox"
                            id={`switch-new-2`}
                            checked={ this.state.use_system_theme } 
                            onChange={(ev) => this.set_system_theme_state(ev.target.checked)} />
                    <label
                        className="switch-label"
                        htmlFor={`switch-new-2`}
                    >
                        <span className={`switch-button`} />
                    </label>
            </div>)
    }
}

export default ThemeSelector