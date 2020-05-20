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

                <div className="input-group mb-3">
                    <div className="input-group-prepend">
                        <span className="input-group-text">BorderColor: </span>
                    </div>
                    <input 
                    className="form-control" 
                        type="color"
                        defaultValue={logo.borderColor}
                        onChange={event => {
                            logo.borderColor = event.target.value;
                            changeLogoCallback(logo);
                        }}
                    />
                    <div className="input-group-append">
                        <span className="input-group-text">{logo.borderColor}</span>
                    </div>
                </div>

                <div className="input-group mb-3">
                    <div className="input-group-prepend">
                        <span className="input-group-text">BorderRadius: </span>
                    </div>
                    <input 
                    className="form-control" 
                        type="range"
                        min = "0"
                        max = "150"
                        defaultValue={logo.borderRadius}
                        onChange={event => {
                            logo.borderRadius = event.target.value;
                            changeLogoCallback(logo);
                        }}
                    />
                    <div className="input-group-append">
                        <span className="input-group-text">{logo.borderRadius}</span>
                    </div>
                </div>

                <div className="input-group mb-3">
                    <div className="input-group-prepend">
                        <span className="input-group-text">BorderWidth: </span>
                    </div>
                    <input 
                    className="form-control" 
                        type="range"
                        min = "0"
                        max = "150"
                        defaultValue={logo.borderWidth}
                        onChange={event => {
                            logo.borderWidth = event.target.value;
                            changeLogoCallback(logo);
                        }}
                    />
                    <div className="input-group-append">
                        <span className="input-group-text">{logo.borderWidth}</span>
                    </div>
                </div>

                <div className="input-group mb-3">
                    <div className="input-group-prepend">
                        <span className="input-group-text">LogoWidth: </span>
                    </div>
                    <input 
                    className="form-control" 
                        type="range"
                        min = "100"
                        max = "1500"
                        defaultValue={logo.width}
                        onChange={event => {
                            logo.width = event.target.value;
                            changeLogoCallback(logo);
                        }}
                    />
                    <div className="input-group-append">
                        <span className="input-group-text">{logo.width}</span>
                    </div>
                </div>

                <div className="input-group mb-3">
                    <div className="input-group-prepend">
                        <span className="input-group-text">LogoHeight: </span>
                    </div>
                    <input 
                    className="form-control" 
                        type="range"
                        min = "100"
                        max = "1500"
                        defaultValue={logo.height}
                        onChange={event => {
                            logo.height = event.target.value;
                            changeLogoCallback(logo);
                        }}
                    />
                    <div className="input-group-append">
                        <span className="input-group-text">{logo.height}</span>
                    </div>
                </div>

                <div className="input-group mb-3">
                    <div className="input-group-prepend">
                        <span className="input-group-text">Padding: </span>
                    </div>
                    <input 
                    className="form-control" 
                        type="range"
                        min = "0"
                        max = "100"
                        defaultValue={logo.padding}
                        onChange={event => {
                            logo.padding = event.target.value;
                            changeLogoCallback(logo);
                        }}
                    />
                    <div className="input-group-append">
                        <span className="input-group-text">{logo.padding}</span>
                    </div>
                </div>

                <div className="input-group mb-3">
                    <div className="input-group-prepend">
                        <span className="input-group-text">Margins: </span>
                    </div>
                    <input 
                    className="form-control" 
                        type="range"
                        min = "0"
                        max = "100"
                        defaultValue={logo.margins}
                        onChange={event => {
                            logo.margins = event.target.value;
                            changeLogoCallback(logo);
                        }}
                    />
                    <div className="input-group-append">
                        <span className="input-group-text">{logo.margins}</span>
                    </div>
                </div>

            </div>
        </div>
    )
}

export default EditLogoPanel