import React from 'react';

const LogoDisplay = (props) => {
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
            <div>
                <div onClick={() => { props.selectLogoObjectCallback(null); }} className="content" style={styles.container}>
                    {props.logo.images.map((image) => {
                        if (image.deleted)// if the logoObj is flagged as deleted dont render it.
                            return null;
                        let style = {
                            position: "absolute",
                            left: image.x + "px",
                            top: image.y + "px",
                            width: image.width + "px",
                            height: image.height + "px",
                            zIndex: image.z,
                        }
                        return <img
                            onClick={(event) => { 
                                props.selectLogoObjectCallback(image);
                                event.stopPropagation();
                            }}
                            className="draggable"
                            onDrag={(event) => {
                                //console.log(event.buttons);
                                
                                    if (event.clientX !== 0) {
                                        //console.log(event.clientX, event.target);
                                        
                                        image.x = image.x + (event.clientX - image.preX);
                                        image.y = image.y + (event.clientY - image.preY);
                                        image.preX = event.clientX;
                                        image.preY = event.clientY;
                                        //console.log(event.clientY);
                                        props.changeLogoObjectCallback(image);
                                    }
                            }}
                            onMouseDown={(event => {
                                console.log(event.clientX, event.target);
                                image.preX = event.clientX;
                                image.preY = event.clientY;
                                props.changeLogoObjectCallback(image);
                                props.selectLogoObjectCallback(image);
                            })}

                            draggable
                            alt="" key={image.idx} src={image.url} style={style} />
                    })}
                    {props.logo.texts.map((text) => {
                        if (text.deleted) // if the logoObj is flagged as deleted dont render it.
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
                        return <div
                            onClick={(event) => { 
                                props.selectLogoObjectCallback(text);
                                event.stopPropagation();
                            }}
                            className="draggable"
                            //onMouseMove
                            onDrag={(event) => {
                                if (event.clientX !== 0) {
                                    //console.log(event.clientX, event.target);
                                    text.x = text.x + (event.clientX - text.preX);
                                    text.y = text.y + (event.clientY - text.preY);
                                    text.preX = event.clientX;
                                    text.preY = event.clientY;
                                    props.changeLogoObjectCallback(text);
                                }
                            }}
                            onMouseDown={(event => {
                                //console.log(event.clientX, event.target);
                                text.preX = event.clientX;
                                text.preY = event.clientY;
                                props.changeLogoObjectCallback(text);
                                props.selectLogoObjectCallback(text);
                            })}
                            draggable
                            key={text.idx}
                            style={style} >
                            {text.text}</div>
                    })}
                </div>

            </div>

        </div>

    )
}

export default LogoDisplay;