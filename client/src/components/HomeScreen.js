import React from 'react';
import LogoCard from './cards/LogoCard';
import gql from 'graphql-tag';
import { useQuery, useMutation } from '@apollo/react-hooks';
import { Button } from 'react-bootstrap';
import TextInputModal from './modals/TextInputModal.js';
import ConfirmModal from './modals/ConfirmModal';
import {Redirect} from 'react-router-dom';
//import {BrowserRouter} from 'react-router-dom';

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
                _id
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
    const { loading, error, data, refetch } = useQuery(GET_LOGOS, {
        pollInterval: 500,
    });
    const [changeLogoNameMutation] = useMutation(UPDATE_LOGO_NAME);
    const [createNewLogo] = useMutation(CREATE_NEW_LOGO);
    const [deleteLogo] = useMutation(DELETE_LOGO);
    const [showModal, setShowModal] = React.useState(false);
    const [redirect, setRedirect] = React.useState(false);
    const [logoId, setLogoId] = React.useState("");

    const [confirmModalProps, setConfirmModalProps] = React.useState({
        show: false,
        header: "Deleting Logo",
        closeCallback: () => {
            console.log("Closing");
            setConfirmModalProps(prevProps => {
                let updatedValues = {show: false}
                return {...prevProps, ...updatedValues}
            });
        },
    });


    if (loading) return 'Loading...';
    if (error) return `Error! ${error.message}`;

    let newLogoModalProps = {
        show: showModal,
        saveCallback: (name) => {
            createNewLogo({
                variables: {
                    name: name,
                    creatorId: "5ec179d0c589c304384d9ff3"
                }
            }).then(logo => {
                refetch();
                setLogoId(logo.data.addLogo._id);
                setRedirect(true);
                //console.log(logo);
                return logo;
            });
        },
        closeCallback: () => {
            setShowModal(false);
        },
        placeHolder: "Name",
        inputLabel: "Logo Name: ",
        header: "Creating New Logo",
    }

    return (
        <div className="container">
            {redirect ?<Redirect push to = {`/edit/${logoId}`}/>:null}
            <div className="row">
                <div className="col-3">
                    <TextInputModal
                        {...newLogoModalProps}
                    />
                    <Button onClick={() => {
                        setShowModal(true);
                    }}>Create New Logo</Button>
                </div>
                <div className="col-9">
                    Recent Projects:
                    <div>
                        {data.logos.map(logo => {
                            return <LogoCard
                                key={logo._id}
                                logo={logo}
                                logoNameChangeCallback={(logoId, newName) => {
                                    changeLogoNameMutation({ variables: { id: logoId, name: newName } }).then(() => {
                                        refetch(); //get new logo data.
                                    });

                                }}
                                deleteLogoCallback={(logoId, logoName) => {
                                    
                                    setConfirmModalProps(prevProps => {
                                        let updatedValues = {
                                            show: true,
                                            bodyText: `Are you sure you want to delete ${logoName}?`,
                                            confirmCallback: () => {
                                                deleteLogo({ variables: { id: logoId } }).then(() => {
                                                    refetch(); //requery data after delete.
                                                })
                                            },
                                        }
                                        return {...prevProps, ...updatedValues};
                                    });
                                }} />
                        })}
                        <ConfirmModal {...confirmModalProps} />
                    </div>
                </div>
            </div>
        </div>
    )
}


export default HomeScreen