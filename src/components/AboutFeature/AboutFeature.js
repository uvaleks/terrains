import React from 'react'
import './AboutFeature.scss'

class AboutFeature extends React.Component {
    render() {
        return <div className="AboutFeature--wrapper">
                    <div className="AboutFeature--image--wrapper"><img className="AboutFeature--image" src={ this.props.image } alt={ this.props.imagealt } /></div>
                    <div className="AboutFeature--title--wrapper">
                        <span className="AboutFeature--title">{ this.props.title }</span>
                    </div>
                    
                    <span className="AboutFeature--description">{ this.props.children }</span>
            </div>
    }
}

export default AboutFeature