import React from 'react';
import ListGroup from 'react-bootstrap/ListGroup';
import Button from 'react-bootstrap/Button';


const LogoObjectPanel = ({
    texts,
    images,
    updateLogoImageCallback, 
    updateLogoTextCallback, 
    addTextCallback, 
    addImageCallback, 
    selectedLogoObject,
    moveUpOnclickCallback,
    moveDownOnclickCallback,
    selectLogoObjectCallback,}) => //class that orders logo object in z-index.
{
    let sortedLogosObjs = [];
    texts.forEach(text => {
        sortedLogosObjs.push(text);
    });
    images.forEach(image => {
        sortedLogosObjs.push(image);
    });
    sortedLogosObjs.sort((logoObj1, logoObj2) => {
        return logoObj1.z - logoObj2.z;
    });
    sortedLogosObjs.reverse();
    //console.log("sortedLogosObjs:", sortedLogosObjs);
    //console.log("SelectedLogo: ", selectedLogoObject);

    return (
        <div className='card' style = {{height: "95%"}}>
            <div className='card-header'>
                <Button variant = "secondary" onClick = {addTextCallback} block>Add Text</Button>
                <Button variant = "secondary" onClick = {addImageCallback} block>Add Image</Button>
            </div>
            <div className='card-body'>
                <div>
                    <Button onClick = {() => {moveUpOnclickCallback(selectedLogoObject)}} style = {{width: "50%"}}>^</Button>
                    <Button onClick = {() => {moveDownOnclickCallback(selectedLogoObject)}} style = {{width: "50%"}}>v</Button>
                </div>
                <ListGroup as="ul">
                    {sortedLogosObjs.map((logoObj => {
                        if(logoObj.deleted)
                            return null;
                        let active;
                        if(selectedLogoObject)
                            active = selectedLogoObject.z === logoObj.z;
                        
                        let uniqueKey;
                        if(logoObj.type === "text")
                            uniqueKey = logoObj.idx;
                        else
                            uniqueKey = texts.length + logoObj.idx;
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