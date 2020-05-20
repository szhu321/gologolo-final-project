import React from 'react'
import Button from 'react-bootstrap/Button'

const EditImagePanel = ({imgObj, deleteCallback}) => {
    return (
        <div className = 'card'>
            <div className = 'card-header'>
                Edit Image
                <Button variant = "danger" onClick = {() => deleteCallback(imgObj)}>Delete</Button>
            </div>
            <div className = 'card-body'>
                <label>
                    Width:
                    <input/>
                </label>
                <label>
                    Height:
                    <input/>
                </label>
            </div>
        </div>
    )
}

export default EditImagePanel