import React from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';


const TextInputModal = (props) => //show prop and closeCallback
{
    // const [show, setShow] = useSate(false);

    // const handleClose = () => setShow(false);
    // const handleShow = () => setShow(true);
    let textInput = React.createRef();

    return (
        <Modal show = {props.show} onHide = {props.closeCallback}>
            <Modal.Header>
                TextInput
            </Modal.Header>
            <Modal.Body>
                <input ref = {textInput} defaultValue = {props.defaultValue}/>
            </Modal.Body>
            <Modal.Footer>
                <Button variant = "secondary" onClick = {props.closeCallback}>
                    Close
                </Button>
                <Button variant = "primary" onClick = {() => {
                    props.saveCallback(textInput.current.value);
                    props.closeCallback();
                }}>
                    Save Changes
                </Button>
            </Modal.Footer>
        </Modal>
    )
}

export default TextInputModal;