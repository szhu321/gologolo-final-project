import React from 'react';
import LogoCard from './cards/LogoCard';
import gql from 'graphql-tag';
import { useQuery, useMutation } from '@apollo/react-hooks';


const GET_LOGOS = gql
    `query {
        logos{
          _id
          name
          lastUpdate
        }
    }`

const UPDATE_LOGO_NAME = gql`
    mutation UpdateLogoName($id: ID!, $name: String!,) {
        updateLogo(id: $id, name: $name,) {
            name
        }
    }`

const CREATE_NEW_LOGO = gql`
    mutation CreateNewLogo($name: String!, $creatorId: ID!) {
        addLogo(
            name: $name,
            creatorId: $creatorId,
            backgroundColor: "#2DD523",
            borderColor: "#AC4DD8",
            borderRadius: 5,
            borderWidth: 12,
            padding: 10,
            margins: 0,
            width:200,
            height:100) {
                name
            }
    }`

const DELETE_LOGO = gql`
    mutation DeleteLogo($id: ID!) {
        deleteLogo(id: $id) {
            name
        }
    }`

const HomeScreen = () => {
    const { loading, error, data, refetch } = useQuery(GET_LOGOS);
    const [changeLogoNameMutation] = useMutation(UPDATE_LOGO_NAME);
    const [createNewLogo] = useMutation(CREATE_NEW_LOGO);
    const [deleteLogo] = useMutation(DELETE_LOGO);

    if (loading) return 'Loading...';
    if (error) return `Error! ${error.message}`;

    return (
        <div className="container">
            <div className="row">
                <div className="col-3">
                    <button onClick = {() => {
                        createNewLogo({variables: {
                            name: "Gologolo",
                            creatorId: "5ec179d0c589c304384d9ff3"
                        }}).then(logo => {
                            refetch();
                        });
                    }}>Create New Logo</button>
                </div>
                <div className="col-9">
                    Recent Projects:
                    <div>
                        {data.logos.map(logo => {
                            return <LogoCard
                                key={logo._id}
                                logo={logo}
                                logoNameChangeCallback={(logoId, newName) => {
                                    changeLogoNameMutation({variables: {id: logoId, name: newName}}).then(() => {
                                        refetch(); //get new logo data.
                                    });
                                    
                                }}
                                deleteLogoCallback={(logoId) => {
                                    deleteLogo({variables: {id: logoId}}).then(() => {
                                        refetch(); //requery data after delete.
                                    });
                                }} />
                        })}
                    </div>
                </div>
            </div>
        </div>
    )
}


export default HomeScreen