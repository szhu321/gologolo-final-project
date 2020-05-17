import React from 'react'

const LogoCard = ({logo}) => {
    const {_id, name, lastUpdate} = logo;
    return (
        <div className="card">
            <div className="card-body">
                <div className="container">
                    <div className="row align-items-center">
                        <div className="col-6">
                            {name}
                                <button>Rename</button>
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