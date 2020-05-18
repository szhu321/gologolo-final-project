import React from 'react';
import ListGroup from 'react-bootstrap/ListGroup';
import Button from 'react-bootstrap/Button';


const LogoObjectPanel = ({ logo }) => //class that orders logo object in z-index.
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
        <div className='card'>
            <div className='card-header'>
                <Button variant = "secondary" block>Add Text</Button>
                <Button variant = "secondary" block>Add Image</Button>
            </div>
            <div className='card-body'>
                <ListGroup as="ul">
                    {sortedLogos.map((logoObj => {
                        return (
                            <ListGroup.Item key={logoObj._id} as="li">
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