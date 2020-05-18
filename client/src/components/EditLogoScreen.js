import React from 'react';
import EditImagePanel from './edit/EditImagePanel';
import EditTextPanel from './edit/EditTextPanel';
import {useQuery} from '@apollo/react-hooks';
import gql from 'graphql-tag';

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
            text
            color
            fontSize
          }
          images {
            _id
            x
            y
            url
            width
            height
          }
        }
      }`



const EditLogoScreen = (props) => {
    const { loading, error, data, refetch } = useQuery(GET_LOGO, {variables: {id: props.match.params.id}});

    if (loading) return 'Loading...';
    if (error) return `Error! ${error.message}`;

    console.log(data);
    return (
        <div>
            EditLogoScreen
            <div className='row'>
                <div className='col-3'>
                    <EditImagePanel />
                </div>
                <div className='col-6'>

                </div>
                <div className='col-3'>
                    <EditTextPanel />
                </div>
            </div>
        </div>
    )
}


export default EditLogoScreen