import React from 'react';
import { NavLink } from 'react-router-dom';
import { Popup } from 'semantic-ui-react';
import history from '../history';

const Menu = props => {
	const { isAuthenticated, login } = props;

	const printMapOrAuth = auth => {
		return auth ? (
			<NavLink to="/map">Map</NavLink>
		) : (
			<NavLink to="/authentication">Authentication</NavLink>
		);
	};

	const printLogout = auth => {
		return auth ? (
			<Popup
				trigger={
					<span
						onClick={() => {
							props.auth(false);
							localStorage.clear();
							history.push('/');
						}}
					>
						Wellcome, {login}
					</span>
				}
				content="Click to logout"
				position="bottom center"
			/>
		) : null;
	};

	return (
		<nav className="menu">
			<ul>
				<NavLink exact to="/">
					Main
				</NavLink>
				{printMapOrAuth(isAuthenticated)}
				<NavLink to="/about">About</NavLink>
				{printLogout(isAuthenticated)}
			</ul>
		</nav>
	);
};

export default Menu;
