import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Grid } from 'semantic-ui-react';
import { compose, withProps } from 'recompose';
import { withScriptjs, withGoogleMap, GoogleMap, Marker } from 'react-google-maps';

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
			{props.markers.markers.length === 0
				? null
				: props.markers.markers.map(marker => (
						<Marker key={marker.id} label={marker.label} position={marker.position} />
				  ))}
		</GoogleMap>
	);
});

class PageUsersList extends Component {
	state = { markers: [] };

	onUserClick = id => {
		let curentUser = this.props.state.filter(user => user.id === id)[0].markers;
		this.setState({ markers: curentUser });
	};

	render() {
		const usersList = this.props.state;

		return (
			<Grid columns="equal">
				<Grid.Row>
					<Grid.Column width={14}>
						<Map markers={this.state} />
					</Grid.Column>
					<Grid.Column color="black">
						<h3 className="center">Users list:</h3>
						{usersList.length > 0 ? (
							<ul>
								{usersList.map(user => (
									<li key={user.id} onClick={() => this.onUserClick(user.id)}>
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

export default connect(mapStateToProps)(PageUsersList);
