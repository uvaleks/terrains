import React from 'react'
import './footer.scss'

class Footer extends React.Component {
    render() {
        return <footer>
            <span className="copyright" style={{ paddingTop: 15 + 'px' }}>Copyright © 2021–2022</span>
            <span className="copyright" style={{ paddingBottom: 25 + 'px' }}>Eugene Makarov ✕ Aleksey Uvarov</span>
        </footer>
    }
}

export default Footer