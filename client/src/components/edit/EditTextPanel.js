import React from 'react'
import Button from 'react-bootstrap/Button'


const EditTextPanel = ({textObj, deleteCallback}) => {
    return (
        <div className='card'>
            <div className='card-header'>
                Edit Text
                <Button variant = "danger" onClick = {() => deleteCallback(textObj)}>Delete</Button>
            </div>
            <div className='card-body'>
                Width: <input />
                Height: <input />
            </div>
        </div>
    )
}

export default EditTextPanel