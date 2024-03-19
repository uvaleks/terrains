import React from 'react'

const orientations = {
    portrait: 'portrait',
    landscape: 'landscape'
}

const TESTING_VALUE = orientations.landscape
const OrientationsContext = React.createContext({
    orientation: TESTING_VALUE
})

function isPortait() {
    return (window.innerHeight > window.innerWidth) && (window.innerWidth < 767)
}

function isLandscape() {
    return !isPortait()
}

function get() {
    return isPortait() ? orientations.portrait : orientations.landscape
}

const API = {
    OrientationsContext,
    orientations,
    isPortait,
    isLandscape,
    get,
}

export default API
