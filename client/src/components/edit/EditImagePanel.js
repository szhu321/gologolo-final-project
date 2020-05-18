import React from 'react'

const EditImagePanel = () => {
    return (
        <div className = 'card'>
            <div className = 'card-header'>
                Edit Image
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