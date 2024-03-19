const IMAGES_PATH = process.env.PUBLIC_URL + '/images' 
const METADATA_FILE_NAME = 'image_meta.json'

var items = []

let load_items = async () => {

    items = await (async () => {

        let collection_assets_info_init_data = await (async () => {
            let loader = await fetch(IMAGES_PATH + '/' + METADATA_FILE_NAME, {method: 'GET', mode: 'no-cors'})
            let result = await loader.json()
        
            return result
        })()    

        // if (MODE === MODE_RELEASE)
            return collection_assets_info_init_data
        // else 
        //     return get_DEBUG_DATA(collection_assets_info_init_data)
    }) ()

    return items
}

const link_nfts = (items, nfts) => {

    nfts.forEach(nft => {
        let info_blocks = items.filter(item => item.name === nft.name)
        if (info_blocks.length === 0) {
            console.error('Asset [' + nft.name + '] info not found.')
            return
        }

        info_blocks[0].nft = nft
    })
}

const API = {
    // items,
    load_items,
    link_nfts,
}

export default API