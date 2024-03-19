
let add_DOMImage_on_canvas = (x, y, image_name, show_animation_name, select_animation_name, images_container, image_cache, PUZZLE_SCALE) => {

    let image_container = images_container.appendChild(document.createElement('div'))
    image_container.classList.add('image_container')

    let curr = image_container.appendChild(Object.assign(document.createElement('img'),
    {
        src: image_cache[image_name].src,
        width: image_cache[image_name].width * PUZZLE_SCALE,
        height: image_cache[image_name].height * PUZZLE_SCALE,
    }))

    Object.assign(curr.style,
    {
        left: x * PUZZLE_SCALE + 'px',
        top: y * PUZZLE_SCALE + 'px',
        position: 'relative',

        visibility: 'hidden', 
        display: 'block',

        zIndex: 1,
    })        

    let update_position = (PUZZLE_SCALE, PUZZLE_POS) => {
        curr.width = image_cache[image_name].width * PUZZLE_SCALE
        curr.height = image_cache[image_name].height * PUZZLE_SCALE
        curr.style.left = PUZZLE_POS.x + x * PUZZLE_SCALE + 'px'
        curr.style.top =  PUZZLE_POS.y + y * PUZZLE_SCALE + 'px'
    }

    const ANIMATION_STATES_HIDED = 'hided'
    const ANIMATION_STATES_SHOWING = 'showing'
    const ANIMATION_STATES_SELECTED = 'selected'

    var animation_state = ANIMATION_STATES_HIDED
    var showingTimerId = -1

    let set_animation_state = (new_state, timeout) => {

        if (animation_state === new_state) {
            return
        } else {
            // console.log('state ' + animation_state + ' => ' + new_state + ' ' + image_name + ' ' + x + ' ' + Math.random())
            //if (curr.classList.contains(show_animation_name))
            curr.classList.remove(show_animation_name)
            //if (curr.classList.contains(select_animation_name))
            curr.classList.remove(select_animation_name)

            if ((showingTimerId !== -1) && (new_state !== ANIMATION_STATES_SHOWING))
                clearTimeout(showingTimerId)
            
            if (new_state === ANIMATION_STATES_HIDED) {
                curr.style.visibility = 'hidden'
                animation_state = ANIMATION_STATES_HIDED
            } else if (new_state === ANIMATION_STATES_SHOWING) {
                if (animation_state === ANIMATION_STATES_HIDED) {

                    if (show_animation_name !== undefined)
                        showingTimerId = setTimeout(() => { 
                            curr.style.visibility = 'visible'
                            curr.classList.add(show_animation_name) 
                            showingTimerId = -1
                        }, timeout)
                }
                animation_state = ANIMATION_STATES_SHOWING
            } else if (new_state === ANIMATION_STATES_SELECTED) {
                curr.style.visibility = 'visible'
                if (select_animation_name !== undefined)
                    curr.classList.add(select_animation_name)
                animation_state = ANIMATION_STATES_SELECTED
            }
        }
    }

    return {
        image: curr, 
        animation_state: animation_state,
        show: (timeout) => set_animation_state(ANIMATION_STATES_SHOWING, timeout), 
        hide: () => set_animation_state(ANIMATION_STATES_HIDED), 
        select: () => set_animation_state(ANIMATION_STATES_SELECTED),
        unselect: () => set_animation_state(ANIMATION_STATES_SHOWING), 
        update_position: (PUZZLE_SCALE, PUZZLE_POS) => update_position(PUZZLE_SCALE, PUZZLE_POS),
    }
}

export {
    add_DOMImage_on_canvas,
}