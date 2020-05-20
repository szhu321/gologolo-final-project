import React from 'react'
import Button from 'react-bootstrap/Button'


const EditTextPanel = ({textObj, deleteCallback, changeTextCallBack}) => {
    return (
        <div className='card'>
            <div className='card-header'>
                Edit Text
                <Button variant = "danger" onClick = {() => deleteCallback(textObj)}>Delete</Button>
            </div>
            <div className='card-body'>


                <div className="input-group mb-3">
                    <div className="input-group-prepend">
                        <span className="input-group-text">FontSize: </span>
                    </div>
                    <input 
                    className="form-control" 
                        type="range"
                        defaultValue={textObj.fontSize}
                        min="10"
                        max="150"
                        onChange={event => {
                            textObj.fontSize = event.target.value;
                            changeTextCallBack(textObj);
                        }}
                    />
                    <div className="input-group-append">
                        <span className="input-group-text">{textObj.fontSize}</span>
                    </div>
                </div>


            </div>
        </div>
    )
}

export default EditTextPanel