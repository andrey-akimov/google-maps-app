import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Grid } from 'semantic-ui-react';
import { compose, withProps } from 'recompose';
import { withScriptjs, withGoogleMap, GoogleMap, Marker } from 'react-google-maps';
import axios from 'axios';
import { getUsers } from '../actions';

const Map = compose(
	withProps({
		googleMapURL:
			'https://maps.googleapis.com/maps/api/js?key=AIzaSyBoq27kZ_DpT-WyKHrMn4WNvvTc-weMvc4&v=3.exp&libraries=geometry,drawing,places',
		loadingElement: <div style={{ height: `100%` }} />,
		containerElement: <div style={{ height: `100vh` }} />,
		mapElement: <div style={{ height: `100%` }} />
	}),
	withScriptjs,
	withGoogleMap
)(props => {
	return (
		<GoogleMap defaultZoom={10} defaultCenter={{ lat: 46.469, lng: 30.74 }}>
			{props.markers.length === 0
				? null
				: props.markers.map(marker => (
						<Marker key={marker._id} label={marker.label} position={marker.position} />
				  ))}
		</GoogleMap>
	);
});

class PageUsersList extends Component {
	state = { markers: [] };

	onUserClick = id => {
		let curentUser = this.props.state.filter(user => user._id === id)[0].markers;
		this.setState({ markers: curentUser });
	};

	componentDidMount() {
		this.props.getUsers();

		// axios
		// 	.get('http://localhost:8000/')
		// 	.then(res => {
		// 		console.log(res.data);
		// 	})
		// 	.catch(err => {
		// 		console.log('Request error');
		// 	});
	}

	render() {
		const usersList = this.props.state;
		console.log(usersList);
		return (
			<Grid columns="equal">
				<Grid.Row>
					<Grid.Column width={14}>
						<Map markers={this.state.markers} />
					</Grid.Column>
					<Grid.Column color="black">
						<h3 className="center">Users list:</h3>
						{usersList.length > 0 ? (
							<ul>
								{usersList.map(user => (
									<li key={user._id} onClick={() => this.onUserClick(user._id)}>
										{user.login}
									</li>
								))}
							</ul>
						) : (
							<p className="center">There are no users :(</p>
						)}
					</Grid.Column>
				</Grid.Row>
			</Grid>
		);
	}
}

const mapStateToProps = state => ({
	state: state
});

const mapDispatchToProps = dispatch => ({
	getUsers: () => {
		axios
			.get('http://localhost:8000/')
			.then(res => {
				dispatch({
					type: 'GET_USERS',
					payload: res.data
				});
			})
			.catch(err => {
				dispatch({
					type: 'GET_USERS_REJECTED',
					payload: 'Request error'
				});
			});
	}
});

export default connect(mapStateToProps, mapDispatchToProps)(PageUsersList);
