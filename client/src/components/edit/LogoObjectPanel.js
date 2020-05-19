import React from 'react';
import ListGroup from 'react-bootstrap/ListGroup';
import Button from 'react-bootstrap/Button';


const LogoObjectPanel = ({ logo, 
    updateLogoImageCallback, 
    updateLogoTextCallback, 
    addTextCallback, 
    addImageCallback, 
    selectedLogoObject,
    selectLogoObjectCallback,}) => //class that orders logo object in z-index.
{
    let sortedLogos = [];
    logo.texts.forEach(text => {
        sortedLogos.push(text);
    });
    logo.images.forEach(image => {
        sortedLogos.push(image);
    });
    sortedLogos.sort((logoObj1, logoObj2) => {
        return logoObj1.z - logoObj2.z;
    });
    //console.log(sortedLogos);

    return (
        <div className='card' style = {{height: "95%"}}>
            <div className='card-header'>
                <Button variant = "secondary" onClick = {addTextCallback} block>Add Text</Button>
                <Button variant = "secondary" onClick = {addImageCallback} block>Add Image</Button>
            </div>
            <div className='card-body'>
                <ListGroup as="ul">
                    {sortedLogos.map((logoObj => {
                        let active;
                        if(selectedLogoObject)
                            active = selectedLogoObject._id === logoObj._id;
                        
                        let uniqueKey;
                        if(logoObj.type === "text")
                            uniqueKey = logoObj.idx;
                        else
                            uniqueKey = logo.texts.length + logoObj.idx;
                        return (
                            <ListGroup.Item action active = {active} onClick = {() => {selectLogoObjectCallback(logoObj)}} key={uniqueKey}>
                                {`${logoObj.z}: ${logoObj.text ? logoObj.text : logoObj.url}`}
                            </ListGroup.Item>
                        )
                    }))}
                </ListGroup>
            </div>
        </div>
    )
}

export default LogoObjectPanel;