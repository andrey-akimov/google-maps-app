import React from 'react';
import { NavLink } from 'react-router-dom';

const Menu = () => {
	return (
		<nav className="menu">
			<ul>
				<NavLink exact to="/">
					Main
				</NavLink>
				<NavLink to="/authentication">Authentication</NavLink>
				<NavLink to="/profile">Profile</NavLink>
				<NavLink to="/about">About</NavLink>
			</ul>
		</nav>
	);
};

export default Menu;
