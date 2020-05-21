import React from 'react'
import Button from 'react-bootstrap/Button'


const EditTextPanel = ({ textObj, deleteCallback, changeTextCallBack }) => {
    return (
        <div className='card'>
            <div className='card-header'>
                <div className = "row">
                    <div className = "col-6 align-middle">
                        Edit Text
                    </div>
                    <div className = "col-6 text-right">
                        <Button variant="danger" onClick={() => deleteCallback(textObj)}>Delete</Button>
                    </div>
                </div>
                
                
            </div>
            <div className='card-body'>
                <ul className="list-group list-group-horizontal" style = {{marginBottom: "20px"}}>
                    <li className="list-group-item flex-fill">{"x: " + textObj.x}</li>
                    <li className="list-group-item flex-fill">{"y: " + textObj.y}</li>
                    <li className="list-group-item flex-fill">{"z: " + textObj.z}</li>
                </ul>


                <div className="input-group mb-3">
                    <div className="input-group-prepend">
                        <span className="input-group-text">FontSize: </span>
                    </div>
                    <input
                        className="form-control"
                        type="range"
                        defaultValue={textObj.fontSize}
                        min="1"
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

                <div className="input-group mb-3">
                    <div className="input-group-prepend">
                        <span className="input-group-text">Color: </span>
                    </div>
                    <input
                        className="form-control"
                        type="color"
                        defaultValue={textObj.color}
                        onChange={event => {
                            textObj.color = event.target.value;
                            changeTextCallBack(textObj);
                        }}
                    />
                    <div className="input-group-append">
                        <span className="input-group-text">{textObj.color}</span>
                    </div>
                </div>

            </div>
        </div>
    )
}

export default EditTextPanel