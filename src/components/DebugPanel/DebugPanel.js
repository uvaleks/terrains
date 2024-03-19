import React from 'react'
import './debug-panel.scss'

const DEBUG_MODE_KEY = 'MODE'
const MODE_DEBUG = 'DEBUG'
const MODE_RELEASE = 'RELEASE'
const MODE = (() => {
    if (window.location.href.indexOf('SETRELEASE') !== -1)
        return MODE_RELEASE
    else if (window.location.href.indexOf('SETDEBUG') !== -1)
        return MODE_DEBUG

    return localStorage.getItem(DEBUG_MODE_KEY) === MODE_DEBUG ? MODE_DEBUG : MODE_RELEASE
})()
localStorage.setItem(DEBUG_MODE_KEY, MODE)

const DEBUG_CACHE_KEY = 'DEBUG_CACHE'

const DEDUG_ITEM_PRICE = 0.666
const DEBUG_OWNER = '0xDEADBEAFDEADBEAFDEADBEAFDEADBEAF'

let get_DEBUG_DATA = (collection_assets_info_init_data) =>
{
    let raw_data = localStorage.getItem(DEBUG_CACHE_KEY)

    var data = ((raw_data === null) || (raw_data === 'undefined') || (raw_data === undefined)) ? collection_assets_info_init_data : JSON.parse(raw_data)

    if (window.location.href.indexOf('RESETDEBUGCACHE') !== -1)
    {
        data = collection_assets_info_init_data
        alert('Info: cache updated!')
    }

    localStorage.setItem(DEBUG_CACHE_KEY, JSON.stringify(data))

    return data
}

class DebugPanel extends React.Component {

    saveAndReload_action() {
        this.props.items.forEach(item => {
            item.asset = undefined
            item.image = undefined
            item.marker = undefined
            item.marker2 = undefined
            item.marker3 = undefined
            item.owner = undefined
            item.was_buyed = undefined
            item.DEBUG_uncollapsed = undefined
        })

        let raw_data = JSON.stringify(this.props.items)
        localStorage.setItem(DEBUG_CACHE_KEY, raw_data)

        document.location.reload()
    }

    render_field(item, field) {
        
        let value_getter = () => field.cache_subname === null ? item[field.cache_name] : item[field.cache_name][field.cache_subname]
        let value_setter = (val) => { if (field.cache_subname === null) item[field.cache_name] = val; else item[field.cache_name][field.cache_subname] = val }

        if ((field.type === 'text') || (field.type === 'number')) {

            return <label>{ field.name }&nbsp;
                <input 
                        type={ field.type } 
                        value={ value_getter() } 
                        onChange={ (el) => { value_setter(field.type === 'number' ? (el.target.value - 0) : el.target.value); this.forceUpdate() }} />
            </label>
        } else if (field.type === 'boolean') {

            return <label>{ field.name }&nbsp;
                <input 
                        type="checkbox" 
                        checked={ value_getter() } 
                        onChange={ (el) => { value_setter(el.target.checked); this.forceUpdate() } } />
            </label>
        }   

        return <h1>TYPE NOT FOUND</h1>
    }

    render() {

        const fields = [
            { name: 'was_buyed', cache_name: 'DEBUG_was_buyed', cache_subname: null, type: 'boolean'},
            { name: 'is_on_sale', cache_name: 'DEBUG_is_on_sale', cache_subname: null, type: 'boolean'},
        ]

        return <div id="debug-container">
            { this.props.items.map(item => 
                <div className="part_debug_container" 
                        key={ item.name }
                        style={{ height: item.DEBUG_uncollapsed ? '' : (20 + 'px') }}>
                    <span
                        onClick={ () => { item.DEBUG_uncollapsed = ! !!item.DEBUG_uncollapsed; this.forceUpdate() } }>[≡] { item.name }</span>   

                    { fields.map(field => (
                        <div key={ field.name } className="part_field_debug_container">
                            { this.render_field(item, field) }
                        </div>
                    ))}

                    <button onClick={ () => this.saveAndReload_action() } >Save &amp; Reload</button>
                </div>) }
        </div> 
    }
}

export {
    DebugPanel,
    MODE,
    MODE_DEBUG,
    MODE_RELEASE,
    get_DEBUG_DATA,
    DEDUG_ITEM_PRICE,
    DEBUG_OWNER,
}