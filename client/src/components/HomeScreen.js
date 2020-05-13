import React, { Component } from 'react';
import LogoCard from './cards/LogoCard';

class HomeScreen extends Component {
    render() {

        return (
            <div className="container">
                <div className="row">
                    <div className="col-3">
                        <button>Create New Logo</button>
                    </div>
                    <div className="col-9">
                        Recent Projects:
                        <div>
                            <LogoCard />
                            <LogoCard />
                            
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
export default HomeScreen