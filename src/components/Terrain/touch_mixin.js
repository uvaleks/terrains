const POINT_OFFSET_Y = 70
const POINT_OFFSET_X = 0

const event_to_fingers = (ev) => {
    var fingers = []
    if (ev.touches.length === 1) {
        fingers = [{
            x: ev.touches[0].clientX,
            y: ev.touches[0].clientY,
        }, {
            x: ev.touches[0].clientX,
            y: ev.touches[0].clientY,
        }]
    } else if (ev.touches.length === 2) {
        fingers = [{
            x: ev.touches[0].clientX,
            y: ev.touches[0].clientY,
        }, {
            x: ev.touches[1].clientX,
            y: ev.touches[1].clientY,
        }]  
    }

    return fingers
}

let touch_mixin = {

puzzle_container_ontouchstart(ev) {
    this.hint_hide()

    this.props.items
        .flatMap(item => [item.marker, item.marker2, item.marker3])
        .filter(marker => marker !== undefined)
        .forEach(marker => marker.unselect())

    this.puzzle_container_ref.current.style.cursor = 'default' 

    if (ev.touches.length === 1)
        this.is_custom_moving = true
    else if (ev.touches.length === 2)
        this.is_custom_scaling = true
    
    if (!this.is_custom_moving && !this.is_custom_scaling)
        return

    const fingers = event_to_fingers(ev)
    // ev.preventDefault()

    let curr_pos = {}

    let container_rect = this.canvas_holder_ref.current.getBoundingClientRect()

    Object.assign(curr_pos, {
        x0: fingers[0].x - POINT_OFFSET_X - container_rect.left,
        y0: fingers[0].y - POINT_OFFSET_Y - container_rect.top, 
        x1: fingers[1].x - POINT_OFFSET_X - container_rect.left,
        y1: fingers[1].y - POINT_OFFSET_Y - container_rect.top,  
        screen_offset_x: -this.FONA_SCREEN_POS.x,
        screen_offset_y: -this.FONA_SCREEN_POS.y,
    })

    Object.assign(curr_pos, {
        screen_x: (curr_pos.x0 + curr_pos.x1) / 2,
        screen_y: (curr_pos.y0 + curr_pos.y1) / 2,
        len: Math.sqrt(
            Math.pow(curr_pos.x1 - curr_pos.x0, 2) + 
            Math.pow(curr_pos.y1 - curr_pos.y0, 2)),
        scale: this.PUZZLE_SCALE,
    })

    Object.assign(curr_pos, {
        center_x: (curr_pos.screen_x + curr_pos.screen_offset_x) / this.PUZZLE_SCALE,
        center_y: (curr_pos.screen_y + curr_pos.screen_offset_y) / this.PUZZLE_SCALE,   
    })

    Object.assign(this.first_touch_pos, curr_pos)
},

puzzle_container_ontouchend(ev) {

    if ((ev.touches.length !== 1) && (ev.touches.length !== 2))
        return

    // ev.preventDefault()

    this.is_custom_scaling = false
    this.is_custom_moving = false
    Object.assign(this.first_touch_pos, {
        x0: 0, 
        y0: 0, 
        x1: 0, 
        y1: 0, 
        screen_offset_x: 0, 
        screen_offset_y: 0, 
        screen_x: 0, 
        screen_y: 0, 
        len: 0, 
        center_x: 0, 
        center_y: 0,
        scale: 0,
    })
},

puzzle_container_ontouchmove(ev) {

    if (!((ev.touches.length === 1) && this.is_custom_moving) && 
        !((ev.touches.length === 2) && this.is_custom_scaling))
        return

    const fingers = event_to_fingers(ev)

    // ev.preventDefault()

    let curr_pos = {}

    let container_rect = this.canvas_holder_ref.current.getBoundingClientRect()

    Object.assign(curr_pos, {
        x0: fingers[0].x - POINT_OFFSET_X - container_rect.left,
        y0: fingers[0].y - POINT_OFFSET_Y - container_rect.top, 
        x1: fingers[1].x - POINT_OFFSET_X - container_rect.left,
        y1: fingers[1].y - POINT_OFFSET_Y - container_rect.top, 
    })

    Object.assign(curr_pos, {
        screen_x: (curr_pos.x0 + curr_pos.x1) / 2,
        screen_y: (curr_pos.y0 + curr_pos.y1) / 2,
        len: Math.sqrt(
            Math.pow(curr_pos.x1 - curr_pos.x0, 2) + 
            Math.pow(curr_pos.y1 - curr_pos.y0, 2)),
    })

    if (this.is_custom_scaling) {
        let delta = curr_pos.len / this.first_touch_pos.len
        this.PUZZLE_SCALE = Math.max(this.PUZZLE_SCALE_INIT, this.first_touch_pos.scale * delta)
        this.PUZZLE_SCALE = Math.min(this.PUZZLE_SCALE, 2)

        this.FONA_SCREEN_SIZE_update()

        this.puzzle_container_ref.current.style.width = this.FONA_SCREEN_SIZE.width + 'px'
        this.puzzle_container_ref.current.style.height = this.FONA_SCREEN_SIZE.height + 'px'
    }

    Object.assign(curr_pos, {
        center_x: this.first_touch_pos.center_x,
        center_y: this.first_touch_pos.center_y, 
        scale: this.PUZZLE_SCALE,
    })

    Object.assign(curr_pos, {
        screen_offset_x: Math.floor(this.first_touch_pos.center_x * this.PUZZLE_SCALE - curr_pos.screen_x),
        screen_offset_y: Math.floor(this.first_touch_pos.center_y * this.PUZZLE_SCALE - curr_pos.screen_y),                
    })

    this.FONA_SCREEN_POS.x = Math.min(0,  -curr_pos.screen_offset_x)
    this.FONA_SCREEN_POS.y = Math.min(0,  -curr_pos.screen_offset_y)    
    this.FONA_SCREEN_POS.x = Math.max(-(this.FONA_SCREEN_SIZE.width - (-POINT_OFFSET_X + container_rect.width)), this.FONA_SCREEN_POS.x)
    this.FONA_SCREEN_POS.y = Math.max(-(this.FONA_SCREEN_SIZE.height - (-POINT_OFFSET_Y + container_rect.height)), this.FONA_SCREEN_POS.y)

    this.FONA_ON_LOWER_EDGE = Math.abs (this.FONA_SCREEN_POS.y - (-(this.FONA_SCREEN_SIZE.height - (-POINT_OFFSET_Y + container_rect.height)))) < 10

    this.puzzle_container_ref.current.style.left = this.FONA_SCREEN_POS.x + 'px'
    this.puzzle_container_ref.current.style.top = this.FONA_SCREEN_POS.y + 'px'

    this.props.items
        .flatMap(item => [item.marker, item.marker2, item.marker3])
        .filter(marker => marker !== undefined)
        .forEach(marker => marker.update_position(this.PUZZLE_SCALE, this.FONA_SCREEN_POS))

    this.update_FONA_ON_LOWER_EDGE ()
}

}

export {
    touch_mixin
}