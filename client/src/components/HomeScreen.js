import React from 'react';
import LogoCard from './cards/LogoCard';
import gql from 'graphql-tag';
import { useQuery } from '@apollo/react-hooks';


const GET_LOGOS = gql
    `query {
        logos{
          _id
          name
          lastUpdate
        }
    }`

const HomeScreen = () => 
{
    const { loading, error, data } = useQuery(GET_LOGOS);
    if (loading) return 'Loading...';
    if (error) return `Error! ${error.message}`;

    return (
        <div className="container">
            <div className="row">
                <div className="col-3">
                    <button>Create New Logo</button>
                </div>
                <div className="col-9">
                    Recent Projects:
                    <div>
                        {data.logos.map(logo => {
                            return <LogoCard key = {logo._id} logo = {logo}/>
                        })}
                    </div>
                </div>
            </div>
        </div>
    )
}


export default HomeScreen