import React from 'react'

const EditLogoPanel = ({logo, changeLogoCallback}) => {
    return (
        <div className='card'>
            <div className='card-header'>
                Edit Logo
            </div>
            <div className='card-body'>
                
                <div className="input-group mb-3">
                    <div className="input-group-prepend">
                        <span className="input-group-text">BackgroundColor: </span>
                    </div>
                    <input 
                    className="form-control" 
                        type="color"
                        defaultValue={logo.backgroundColor}
                        onChange={event => {
                            logo.backgroundColor = event.target.value;
                            changeLogoCallback(logo);
                        }}
                    />
                    <div className="input-group-append">
                        <span className="input-group-text">{logo.backgroundColor}</span>
                    </div>
                </div>

            </div>
        </div>
    )
}

export default EditLogoPanel