import React, {Component} from 'react'
import {Link} from 'react-router-dom'

class NavBar extends Component 
{
    render()
    {
        return(
            <nav className = "navbar navbar-expand-lg navbar-light bg-light">
                <div>
                    <Link className = "navbar-brand" to='/'>Gologolo</Link>
                </div>
            </nav>
        )
    }
}

export default NavBar