import React from 'react'
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

const ConfirmModal = ({show, bodyText, closeCallback, header, confirmCallback}) =>
{
    console.log(closeCallback);
    return(
        <Modal show={show} onHide={closeCallback}>
                <Modal.Header>
                    {header ? header : "Text Input"}
                </Modal.Header>
                <Modal.Body>
                    {bodyText? bodyText: ""}
                </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={closeCallback}>
                            Cancel
                    </Button>
                        <Button variant="primary" onClick={() => {
                            confirmCallback();
                            closeCallback();
                        }}>
                            Confirm
                    </Button>
                    </Modal.Footer>
            </Modal>
    )
}

export default ConfirmModal;