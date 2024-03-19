import React from 'react'

const themes = {
    light: 'light',
    dark: 'dark'
}

const TESTING_VALUE = themes.light
const ThemeContext = React.createContext({
    theme: TESTING_VALUE,
    setter_: () => {}
})

var get_SYSTEM_THEME = () => themes.light
const CHANGE_SYSTEM_THEME_EVENT_ID = 'change_system_theme';

(() => {
    if (!window.matchMedia)
        return

    let match_media_object = window.matchMedia('(prefers-color-scheme: dark)')

    get_SYSTEM_THEME = () => match_media_object.matches ? themes.dark : themes.light

    match_media_object.addEventListener('change', e => {
        const event = new Event(CHANGE_SYSTEM_THEME_EVENT_ID)
        document.dispatchEvent(event)
    })
})()

const DEBUG_THEME_STORAGE_NAME = 'DEBUG_THEME_STORAGE_NAME'
const load_theme = () => {
    
    let raw_data = localStorage.getItem(DEBUG_THEME_STORAGE_NAME)

    if (raw_data !== null) {
        let theme_config = JSON.parse(raw_data)

        if (theme_config.use_system_theme) 
            theme_config.theme = get_SYSTEM_THEME()

        return theme_config
    } else 
        return {
            theme: get_SYSTEM_THEME(),
            use_system_theme: true
        }
}
const save_theme = (theme) => {
    localStorage.setItem(DEBUG_THEME_STORAGE_NAME, JSON.stringify(theme))
}

const API = {
    ThemeContext,
    themes,
    get_SYSTEM_THEME,
    CHANGE_SYSTEM_THEME_EVENT_ID,
    load_theme,
    save_theme
}

export default API
