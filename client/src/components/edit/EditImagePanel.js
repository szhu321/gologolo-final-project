import React from 'react'
import Button from 'react-bootstrap/Button'

const EditImagePanel = ({imgObj, 
    deleteCallback,
    changeObjHeightCallback,
    changeObjWidthCallback}) => {



    return (
        <div className = 'card'>
            <div className = 'card-header'>
                Edit Image
                <Button variant = "danger" onClick = {() => deleteCallback(imgObj)}>Delete</Button>
            </div>
            <div className = 'card-body'>
                <label>
                    Width: {imgObj.width}
                    <input 
                    type = "range" 
                    defaultValue = {imgObj.width} 
                    min = "100" 
                    max = "1000"
                    onChange = {event => {
                        imgObj.width = event.target.value;
                        changeObjWidthCallback(imgObj);
                    }}
                    />
                </label>
                <label>
                    Height: {imgObj.height}
                    <input 
                    defaultValue = {imgObj.height}
                    type = "range" 
                    min = "100" 
                    max = "1000"
                    onChange = {event => {
                        //console.log("Event", event);
                        imgObj.height = event.target.value;
                        changeObjHeightCallback(imgObj);
                    }}
                    />
                </label>
            </div>
        </div>
    )
}

export default EditImagePanel