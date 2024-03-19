

import { add_DOMImage_on_canvas } from './animated_markers';

let create_part_image = (part, image_cache) => {
    let curr_canvas_context = Object.assign(document.createElement('canvas'), {
        width: part.size.width,
        height: part.size.height,
    }).getContext('2d')
    curr_canvas_context.fillStyle = 'rgba(255,0,255,0)'
    curr_canvas_context.fillRect(0, 0, part.size.width, part.size.height)
    curr_canvas_context.drawImage(image_cache[part.name], 0, 0)   

    part.image = curr_canvas_context
}

let create_part_markers = (part, images_container, image_cache, PUZZLE_SCALE) => {
    if (!part.nft.is_ino)
    {
        image_cache.full_map.getContext('2d').drawImage(part.image.canvas, part.position.x, part.position.y)

        part.marker = add_DOMImage_on_canvas(
            part.position.x + part.redpoint_offset.x - Math.floor(image_cache.red_point.width / 2), 
            part.position.y + part.redpoint_offset.y - Math.floor(image_cache.red_point.height / 2),
            'red_point',
            'red-point-grow-animation', 'red-point-pulse-animation',
            images_container, image_cache, PUZZLE_SCALE)
        part.marker.image.PUZZLE_part = part
    }
    else
    {
        if (part.is_on_water)
        {
            part.marker3 = add_DOMImage_on_canvas(
                part.position.x + part.flag_offset.x + 10 - Math.floor(image_cache.flag.width / 1), 
                part.position.y + part.flag_offset.y + 60 - Math.floor(image_cache.flag.height / 1),
                'ice',
                'ice-grow-animation', 'ice-float-animation',
                images_container, image_cache, PUZZLE_SCALE)
            part.marker3.image.PUZZLE_part = part
        }

        part.marker2 = add_DOMImage_on_canvas(
            part.position.x + part.flag_offset.x + 26 - Math.floor(image_cache.flag.width / 1),  
            part.position.y + part.flag_offset.y + 90 - Math.floor(image_cache.flag.height / 1),
            'flag_shadow',
            'grow-animation', 'flag-shadow-select-animation',
            images_container, image_cache, PUZZLE_SCALE)
        part.marker2.image.PUZZLE_part = part

        part.marker = add_DOMImage_on_canvas(
            part.position.x + part.flag_offset.x - 8 - Math.floor(image_cache.flag.width / 2),  
            part.position.y + part.flag_offset.y + 2 - Math.floor(image_cache.flag.height / 2),
            'flag',
            'fall-animation', 'flag-select-animation',
            images_container, image_cache, PUZZLE_SCALE)
        part.marker.image.PUZZLE_part = part
    }
}

let create_canvas_copy = (source) => {
    let curr_canvas_context = Object.assign(document.createElement('canvas'), {
        width: source.width,
        height: source.height,
    }).getContext('2d')

    curr_canvas_context.drawImage(source, 0, 0)   
    
    return curr_canvas_context.canvas
} 

let create_puzzle_container_context = (canvas, size, original_image_size) => {

    // var PIXEL_RATIO = (function () {
    //     var ctx = canvas.getContext('2d'),
    //         dpr = window.devicePixelRatio || 1,
    //         bsr = ctx.webkitBackingStorePixelRatio ||
    //             ctx.mozBackingStorePixelRatio ||
    //             ctx.msBackingStorePixelRatio ||
    //             ctx.oBackingStorePixelRatio ||
    //             ctx.backingStorePixelRatio || 1;

    //     return dpr / bsr;
    // })()

    // if (orientation_is_portait) {
    //     PIXEL_RATIO = 1
    // }

    canvas.width = original_image_size.width //* PIXEL_RATIO
    canvas.height = original_image_size.height //* PIXEL_RATIO
    canvas.style.width = Math.floor(size.width) + "px"
    canvas.style.height = Math.floor(size.height) + "px"
    let context = canvas.getContext('2d')
    // context.scale(PIXEL_RATIO, PIXEL_RATIO)

    return context
}

export {
    create_part_image,
    create_part_markers,
    create_canvas_copy,
    create_puzzle_container_context,
}