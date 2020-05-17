import React, {Component} from 'react'
import { BsPencilSquare, BsFillXCircleFill, BsCheck} from 'react-icons/bs'

class EditableText extends Component
{
    constructor(props) // props text and textChangeCallback(newText).
    {
        super(props);
        this.state = {
            editing: false,
        };
        this.textInput = React.createRef();
    }

    cancelOnclick = () =>
    {
        this.setState({
            editing: false,
        });
    }

    editOnClick = () =>
    {
        this.setState({
            editing: true,
        });
    }

    confirmOnclick = () => //call callback function to update text.
    {
        let newText = this.textInput.current.value;
        if(newText !== this.props.text)
            this.props.textChangeCallback(newText);
        this.setState({
            editing: false,
        });
    }

    render()
    {
        if(this.state.editing)
        {
            return (
                <div>
                    <button onClick = {this.cancelOnclick}>
                        <BsFillXCircleFill color = 'red' />
                    </button>
                    <button onClick = {this.confirmOnclick} > 
                        <BsCheck color = 'green' />
                    </button>
                    <input ref = {this.textInput} type = "text" defaultValue = {this.props.text} />
                </div>
            )
        }
        else
        {
            return (
                <div>
                    <button onClick = {this.editOnClick} >
                        Edit:
                        <BsPencilSquare color='blue' />
                    </button>
                    {this.props.text}
                </div>
            )
        }
    }
}

export default EditableText;