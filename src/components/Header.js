import React from 'react';
import {Link} from 'react-router-dom';

const Header = () => {
    return (
        <nav className="header">
            <ul>
                <Link to="/">Main</Link>
                <Link to="/about">About</Link>
                <Link to="/authentication">Authentication</Link>
                <Link to="/profile">Profile</Link>
            </ul>
        </nav>
    );
};

export default Header;