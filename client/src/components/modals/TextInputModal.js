import React, {Component} from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';


class TextInputModal extends Component
{
    constructor(props)
    {
        super(props);
        this.textInput = React.createRef();
    }

    render()
    {
        return (
            <Modal show = {this.props.show} onHide = {this.props.closeCallback}>
                <Modal.Header>
                    {this.props.header? this.props.header : "Text Input"}
                </Modal.Header>
                <Modal.Body>
                    <input ref = {this.textInput} defaultValue = {this.props.defaultValue}/>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant = "secondary" onClick = {this.props.closeCallback}>
                        Close
                    </Button>
                    <Button variant = "primary" onClick = {() => {
                        this.props.saveCallback(this.textInput.current.value);
                        this.props.closeCallback();
                    }}>
                        Save Changes
                    </Button>
                </Modal.Footer>
            </Modal>
        )
    }
}
// const TextInputModal = (props) => //show prop and closeCallback
// {
//     // const [show, setShow] = useSate(false);

//     // const handleClose = () => setShow(false);
//     // const handleShow = () => setShow(true);
//     let textInput;

    
// }

export default TextInputModal;