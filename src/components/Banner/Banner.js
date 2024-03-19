import React from 'react'
import './banner.scss'

class Banner extends React.Component {
    render() {
        return <div className="banner"><span>{ this.props.title }</span></div>
    }
}

export default Banner