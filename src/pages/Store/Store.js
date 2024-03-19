import React from 'react'
import './store.scss'

import { StoreItem, ACTIONS_BUY, ACTIONS_OFFER }  from '../../components/StoreItem/StoreItem.js'

const PAGE_STORE_SECTION = 'store-section'

const IMAGES_PATH = process.env.PUBLIC_URL + '/images'

class Store extends React.Component {



    render() {

        return (
            <section id={ PAGE_STORE_SECTION } className="store-section">
                <div className="section-title">Collection Cards</div>
                <div className="nft_store_container">
                    {this.props.items.map((selected_item_item, index) => (
                        <StoreItem 
                            key={index} 
                            collection={ selected_item_item.nft.asset_collection } 
                            name={ selected_item_item.title } 
                            image={ IMAGES_PATH + '/' + selected_item_item.name + '-__THEME__.png' } 
                            image_obj={ IMAGES_PATH + '/' + selected_item_item.name + '-obj.png' } 
                            owner={ selected_item_item.nft.owner } 
                            is_ino={ selected_item_item.nft.is_ino }
                            action={ selected_item_item.nft.is_offered ? ACTIONS_BUY : ACTIONS_OFFER } 
                            price={ selected_item_item.nft.price } 
                            store_link={ selected_item_item.nft.link } 
                            is_turned= { !selected_item_item.nft.is_ino }
                            series= { selected_item_item.nft.series }
                            no= { selected_item_item.nft.no }
                            owner_info = { selected_item_item.nft.owner_info }
                        /> 
                    ))}
                </div>
            </section>
        )
    }
}

export { Store, PAGE_STORE_SECTION }
