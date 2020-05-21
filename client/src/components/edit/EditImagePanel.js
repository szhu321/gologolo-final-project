import React from 'react'
import Button from 'react-bootstrap/Button'

const EditImagePanel = ({ imgObj,
    deleteCallback,
    changeObjHeightCallback,
    changeObjWidthCallback }) => {



    return (
        <div className='card'>
            <div className="row">
                <div className="col-6 align-middle">
                    Edit Image
                    </div>
                <div className="col-6 text-right">
                    <Button variant="danger" onClick={() => deleteCallback(imgObj)}>Delete</Button>
                </div>
            </div>
            <div className='card-body'>

                <div className="input-group mb-3">
                    <div className="input-group-prepend">
                        <span className="input-group-text">Width: </span>
                    </div>
                    <input
                        className="form-control"
                        type="range"
                        defaultValue={imgObj.width}
                        min="100"
                        max="1000"
                        onChange={event => {
                            imgObj.width = event.target.value;
                            changeObjWidthCallback(imgObj);
                        }}
                    />
                    <div className="input-group-append">
                        <span className="input-group-text">{imgObj.width}</span>
                    </div>
                </div>

                <div className="input-group mb-3">
                    <div className="input-group-prepend">
                        <span className="input-group-text">Height: </span>
                    </div>
                    <input
                        className="form-control"
                        defaultValue={imgObj.height}
                        type="range"
                        min="100"
                        max="1000"
                        onChange={event => {
                            //console.log("Event", event);
                            imgObj.height = event.target.value;
                            changeObjHeightCallback(imgObj);
                        }}
                    />
                    <div className="input-group-append">
                        <span className="input-group-text">{imgObj.height}</span>
                    </div>
                </div>


            </div>
        </div>
    )
}

export default EditImagePanel