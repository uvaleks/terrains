const IMAGES_PATH = process.env.PUBLIC_URL + '/images' 

const preload_resources = async (srcs) => {
    let cache = []
    for (var i = 0; i < srcs.length; i++) {
        let img = new Image()
        img.src = srcs[i]
        cache.push([img.src, img])
    }
}

let load_resources = async (items) => {
    let image_srcs = { 
        flag: 'pin.png',
        flag_shadow: 'pin-shadow.png',
        ice: 'ice.png',
        red_point: 'red-circle.png',
        fona: 'fona-clear.png',
    }   
    Object.assign(image_srcs, Object.fromEntries(items.map(part => [part.name, part.src])))

    let image_cache = await (async (image_cache_srcs) =>
    {
        let loadImageAsync = (scr) => {
            return new Promise((resolve, reject) => {
                var img = new Image()
    
                img.onload = function() {
                    resolve(img)
                }
            
                img.src = scr
            })
        }

        let loaders = Object.entries(image_cache_srcs).map(async (image_info) => {
            let image = await loadImageAsync(IMAGES_PATH + '/' + image_info[1])
            return [image_info[0], image]
        })

        let data = await Promise.all(loaders)

        return Object.fromEntries(data)
    }) (image_srcs)

    preload_resources(items.map(item => IMAGES_PATH + '/' + item.name + '-light.png'))
    preload_resources(items.map(item => IMAGES_PATH + '/' + item.name + '-dark.png'))
    preload_resources(items.map(item => IMAGES_PATH + '/' + item.name + '-obj.png'))

    return image_cache
}

export {
    load_resources
}