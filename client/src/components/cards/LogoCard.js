import React from 'react'

const LogoCard = (props) => {
    return (
        <div className="card">
            <div className="card-body">
                <div className="container">
                    <div className="row align-items-center">
                        <div className="col-6">
                            My Logo
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