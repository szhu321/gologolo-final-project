import React from 'react'
import EditableText from '../widgets/EditableText';
import {Link} from 'react-router-dom';

const LogoCard = ({logo, logoNameChangeCallback, deleteLogoCallback}) => {
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
                            <Link className = "btn" to = {`/edit/${_id}`}>Edit</Link>
                            <Link className = "btn" to = {`/view/${_id}`}>View</Link>
                            <button onClick = {() => {
                                deleteLogoCallback(_id); //delete logo.
                            }}>Delete</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default LogoCard 