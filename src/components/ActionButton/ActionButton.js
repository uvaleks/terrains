import React from 'react'
import './action-button.scss'

const ACTIONS_BUY = 'buy'
const ACTIONS_OFFER = 'offer'

class ActionButton extends React.Component {
    render() {
        return (
            <button title="To OpenSea asset"
                    className={ 'hint_nft_action_button action_' + this.props.action }
                    onClick={ () => window.open(this.props.store_link, '_blank') }>
                { this.props.action === ACTIONS_BUY ? this.props.price : 'OFFER' }</button>
        )
    }
}

export {
    ActionButton,
    ACTIONS_BUY,
    ACTIONS_OFFER
} 