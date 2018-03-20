import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withScriptjs, withGoogleMap, GoogleMap, Marker } from 'react-google-maps';
import { compose, withProps } from 'recompose';
import { addLocation } from '../actions';

class Map extends Component {
	state = {
		id: Date.now(),
		login: 'user' + Date.now(),
		markers: []
	};

	onClickHandler = e => {
		let { lat, lng } = e.latLng;
		this.setState({
			...this.state,
			markers: [
				...this.state.markers,
				{
					position: { lat: lat(), lng: lng() },
					id: Date.now(),
					label: Date.now().toString()
				}
			]
		});
	};

	componentWillUpdate(nextProps, nextState) {
		let geocoder = new window.google.maps.Geocoder();
		if (nextState.markers.length > 0) {
			var lastLocation = nextState.markers[nextState.markers.length - 1].position;
		} else {
			return false;
		}
		geocoder.geocode({ location: lastLocation }, function(results, status) {
			if (status === 'OK') {
				nextProps.addLocation(
					results[0].address_components[1] !== undefined
						? results[0].address_components[1].short_name
						: results[0].address_components[0].short_name
				);
			} else {
				console.log('Geocode was not successful for the following reason: ' + status);
			}
		});
	}

	render() {
		return (
			<GoogleMap
				onClick={this.onClickHandler}
				defaultZoom={10}
				defaultCenter={{ lat: 46.469, lng: 30.74 }}
			>
				{this.state.markers.map(marker => (
					<Marker key={marker.id} label={marker.label} position={marker.position} />
				))}
			</GoogleMap>
		);
	}
}

const MapWithGeocode = compose(
	withProps({
		googleMapURL:
			'https://maps.googleapis.com/maps/api/js?key=AIzaSyBoq27kZ_DpT-WyKHrMn4WNvvTc-weMvc4&v=3.exp&libraries=geometry,drawing,places',
		loadingElement: <div style={{ height: '100%' }} />,
		containerElement: <div style={{ height: '100vh' }} />,
		mapElement: <div style={{ height: '100%' }} />
	}),
	withScriptjs,
	withGoogleMap
)(Map);

const mapDispatchToProps = dispatch => ({
	addLocation: () => dispatch(addLocation())
});

export default connect(null, mapDispatchToProps)(MapWithGeocode);
