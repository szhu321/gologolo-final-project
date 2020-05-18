import React, { Component } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';


class TextInputModal extends Component {
    constructor(props) {
        super(props);
        this.textInput = React.createRef();
    }

    render() {
        return (
            <Modal show={this.props.show} onHide={this.props.closeCallback}>
                <Modal.Header>
                    {this.props.header ? this.props.header : "Text Input"}
                </Modal.Header>
                <Modal.Body>
                    {/* <label>
                        {this.props.inputLabel ? this.props.inputLabel + ": " : "Input: "}
                        <input ref={this.textInput} defaultValue={this.props.defaultValue} />
                    </label> */}
                    <div className="input-group mb-3">
                        <div className="input-group-prepend">
                            <span className="input-group-text">
                                {this.props.inputLabel ? this.props.inputLabel : "Input: "}
                            </span>
                        </div>
                        <input type="text" 
                        ref={this.textInput}
                        defaultValue={this.props.defaultValue?this.props.defaultValue:""}
                        className="form-control" 
                        placeholder= {this.props.placeholder? this.props.placeholder: ""}
                        />
                    </div>
                </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={this.props.closeCallback}>
                            Close
                    </Button>
                        <Button variant="primary" onClick={() => {
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