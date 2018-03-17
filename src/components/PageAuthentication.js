import React from 'react';
import Login from './Login';
import Registration from './Registration';

const PageAuthentication = () => {
    return (
        <div>
            <h1>PageAuthentication</h1>
            <Login/>
            <Registration/>
        </div>
    );
};

export default PageAuthentication;