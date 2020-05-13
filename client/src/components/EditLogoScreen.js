import React, {Component} from 'react';
import EditImagePanel from './edit/EditImagePanel';
import EditTextPanel from './edit/EditTextPanel';

class EditLogoScreen extends Component
{

    render()
    {
        return (
            <div className = 'container'>
                EditLogoScreen
                <div className = 'row'>
                    <div className = 'col-3'>
                        <EditImagePanel/>
                    </div>
                    <div className = 'col-6'>
                        
                    </div>
                    <div className = 'col-3'>
                        <EditTextPanel />
                    </div>
                </div>
            </div>
        )
    }
}

export default EditLogoScreen