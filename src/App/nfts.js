import crypto_utils from '../crypto_utils.js'

import opensea_cahce from './opensea_cache.json'
import opensea_orders_cahce from './opensea_orders_cache.json'

let nfts = []

const load_nfts = async (on_update) => {

    const API_NETWWORK = process.env.REACT_APP_API_NETWORK
    let crypto_state = crypto_utils.get_crypto_state(API_NETWWORK)

    let collection_slug = 'arctic-terrain-collection'
    let collection = await crypto_state.retrievingAssetsByCollection(collection_slug)
    //if (collection === undefined)
        collection = opensea_cahce

    collection.assets.forEach(asset => {

        let nft = {
            name: asset.name,
            asset_collection: asset.collection.name,
            asset_contract_address: asset.asset_contract.address,
            asset_token_id: asset.token_id,
            order_created_date: null,
            is_ino: asset.last_sale === null,
            is_offered: false,
            price: 0.0,
            owner: 'Undefined',
            link: asset.permalink,
            series: asset.traits.filter(item=>item.trait_type==="Series")[0].value,
            no: asset.traits.filter(item=>item.trait_type==="No")[0].value,
        }

            if (asset.last_sale !== null) {
                nft.owner = asset.last_sale.transaction.from_account.address
                nft.owner_info = {
                    name: asset.last_sale.transaction.from_account.user.username,
                    avatar: asset.last_sale.transaction.from_account.profile_img_url,
                }   
            } else {
                nft.owner = asset.creator.address
                nft.owner_info = {
                    name: asset.creator.user.username,
                    avatar: asset.creator.profile_img_url,
                }
            }

        nfts.push(nft)
    })

    setTimeout(async () => {
        let orders = await crypto_state.retrievingAssetOrders(
            nfts[0].asset_contract_address,
            nfts.map(item => item.asset_token_id))
    
        //if (orders === undefined)
        orders = opensea_orders_cahce
    
        if (orders.count !== 0) {
            orders.orders.forEach(order => {
                let order_close_date = Date(order.order_close_date)
                if (order_close_date > Date())
                    return
    
                let order_created_date = Date(order.created_date)
    
                let founded_nfts = nfts.filter(item => item.name === order.asset.name)
                if (founded_nfts.length !== 0) {
                    let nft = founded_nfts[0]
    
                    if ((nft.order_created_date === null) || (nft.order_created_date < order_created_date)) {
                        nft.order_created_date = order_created_date
                        nft.price = order.current_price / crypto_state.WEI_PER_ETH
                        nft.is_offered = true
                        nft.owner = order.maker.address
                    }
                }
            })
        }

        if (on_update !== undefined)
            on_update(nfts)
    }, 1500)

    return nfts
}

const API = {
    // nfts,
    load_nfts,
}

export default API