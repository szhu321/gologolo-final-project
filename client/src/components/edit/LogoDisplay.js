import React from 'react';

const LogoDisplay = (props) =>
{
    let styles = {
        container: {
            backgroundColor: props.logo.backgroundColor,
            borderColor: props.logo.borderColor,
            borderRadius: props.logo.borderRadius + "px",
            borderWidth: props.logo.borderWidth + "px",
            borderStyle: "solid",
            position: "absolute",
            padding: props.logo.padding + "px",
            margin: props.logo.margins + "px",
            width: props.logo.width + "px",
            height: props.logo.height + "px",
        }
    }
    return (
        <div>
            <div className = "content" style = {styles.container}>
                {props.logo.images.map((image) => {
                    if(image.deleted)// if the logoObj is flagged as deleted dont render it.
                        return null;
                    let style = {
                        position: "absolute",
                        left: image.x + "px",
                        top: image.y + "px",
                        width: image.width + "px",
                        height: image.height + "px",
                        zIndex: image.z,  
                    }
                    return <img alt = "" key = {image.idx} src = {image.url} style = {style}/>
                })}
                {props.logo.texts.map((text) => {
                    if(text.deleted) // if the logoObj is flagged as deleted dont render it.
                        return null;
                    let style = {
                        position: "absolute",
                        left: text.x + "px",
                        top: text.y + "px",
                        fontSize: text.fontSize + "px",
                        color: text.color,
                        userSelect: "none",
                        zIndex: text.z,
                    }
                    return <div key = {text.idx} 
                            style = {style} >
                            {text.text}</div>
                })}
            </div>
        </div>
    )
}

export default LogoDisplay;