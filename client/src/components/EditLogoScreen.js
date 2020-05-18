import React from 'react';
import EditImagePanel from './edit/EditImagePanel';
import EditTextPanel from './edit/EditTextPanel';
import {useQuery} from '@apollo/react-hooks';
import gql from 'graphql-tag';
import LogoDisplay from './edit/LogoDisplay';
import LogoObjectPanel from './edit/LogoObjectPanel';

const GET_LOGO = gql`
    query GetLogo($id: ID!) {
        logo(id: $id) {
          _id
            name
          backgroundColor
          borderColor
          borderRadius
          borderWidth
          padding
          margins
          width
          height
          texts {
            _id
            x
            y
            z
            type
            text
            color
            fontSize
          }
          images {
            _id
            x
            y
            z
            type
            url
            width
            height
          }
        }
      }`



const EditLogoScreen = (props) => {
    const { loading, error, data } = useQuery(GET_LOGO, {variables: {id: props.match.params.id}});

    if (loading) return 'Loading...';
    if (error) return `Error! ${error.message}`;

    console.log(data);
    return (
        <div>
            Editing: {data.logo.name}
            <div className='row'>
                <div className='col-3'>
                    <LogoObjectPanel logo = {data.logo}/>
                </div>
                <div className='col-6'>
                    <LogoDisplay logo = {data.logo}/>
                </div>
                <div className='col-3'>
                    <EditTextPanel />
                    <EditImagePanel />
                </div>
            </div>
        </div>
    )
}


export default EditLogoScreen