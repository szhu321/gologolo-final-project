import React from 'react'

const EditImagePanel = () => {
    return (
        <div className = 'card'>
            <div class = 'card-header'>
                Edit Image
            </div>
            <div class = 'card-body'>
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