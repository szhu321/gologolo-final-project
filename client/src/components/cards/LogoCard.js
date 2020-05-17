import React from 'react'
import {BsPencil} from 'react-icons/bs'

const LogoCard = ({logo}) => {
    const {_id, name, lastUpdate} = logo;
    return (
        <div className="card">
            <div className="card-body">
                <div className="container">
                    <div className="row align-items-center">
                        <div className="col-6">
                            <button>
                                <BsPencil color = 'blue'/>
                            </button>
                            {name}
                        </div>
                        <div className="col-6 text-right">
                            <button>Edit</button>
                            <button>View</button>
                            <button>Delete</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default LogoCard 