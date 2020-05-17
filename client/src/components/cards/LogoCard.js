import React from 'react'
import EditableText from '../widgets/EditableText';

const LogoCard = ({logo, logoNameChangeCallback}) => {
    const {_id, name} = logo;
    
    return (
        <div className="card">
            <div className="card-body">
                <div className="container">
                    <div className="row align-items-center">
                        <div className="col-6">
                            <EditableText 
                            text = {name}
                            textChangeCallback = {(newText) => {
                                logoNameChangeCallback(_id, newText);
                            }}/>
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