import React from 'react';
import { NavLink } from 'react-router-dom';

const Menu = props => {
	return (
		<nav className="menu">
			<ul>
				<NavLink exact to="/">
					Main
				</NavLink>
				{props.isAuthenticated ? (
					<NavLink to="/map">Map</NavLink>
				) : (
					<NavLink to="/authentication">Authentication</NavLink>
				)}
				<NavLink to="/about">About</NavLink>
			</ul>
		</nav>
	);
};

export default Menu;
