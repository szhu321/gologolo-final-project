import React from 'react'
//import EditableText from '../widgets/EditableText';
import { Link } from 'react-router-dom';
import TextInputModal from '../modals/TextInputModal';
import { BsPencilSquare} from 'react-icons/bs';
import Button from 'react-bootstrap/Button';

const LogoCard = ({ logo, logoNameChangeCallback, deleteLogoCallback }) => {
    const { _id, name } = logo;
    const [showModal, setShowModal] = React.useState(false);

    return (
        <div className="card">
            <div className="card-body">
                <div className="container">
                    <div className="row align-items-center">
                        <div className="col-6">

                            {/* <EditableText 
                            text = {name}
                            textChangeCallback = {(newText) => {
                                logoNameChangeCallback(_id, newText);
                            }}/> */}
                            {name}
                            <TextInputModal
                                show = {showModal}
                                defaultValue={name}
                                saveCallback={(newText) => {
                                    logoNameChangeCallback(_id, newText);
                                }}
                                closeCallback={() => {
                                    setShowModal(false);
                                }}
                                placeHolder={"Name"}
                                inputLabel={"Logo Name: "}
                                header={"Rename Logo"}
                                />

                        </div>
                        <div className="col-6 text-right">
                            <Link className="btn btn-secondary" to={`/edit/${_id}`}>Edit</Link>
                                <Button variant = "secondary" onClick={() => {
                                    setShowModal(true);
                                }} >
                                    Rename:
                                    <BsPencilSquare color='blue' />
                                </Button>
                            <button className="btn btn-danger" onClick={() => {
                                deleteLogoCallback(_id, name); //delete logo.
                            }}>Delete</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default LogoCard 