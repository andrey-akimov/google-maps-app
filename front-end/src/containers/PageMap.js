import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withScriptjs, withGoogleMap, GoogleMap, Marker } from 'react-google-maps';
import { Button, Modal, Input } from 'semantic-ui-react';
import { compose, withProps } from 'recompose';
import { addLocation } from '../actions';

class Map extends Component {
	state = {
		open: false,
		input: '',
		user: {
			id: Date.now(),
			login: 'user' + Date.now(),
			markers: []
		}
	};

	close = () => {
		this.state.user.markers[this.state.user.markers.length - 1].label = this.state.input;
		this.setState({ open: false });

		// this.setState({
		// 	...this.state,
		// 	user: {
		// 		...this.state.user,
		// 		markers: this.state.user.markers.map((marker, i, arr) => {
		// 			if (arr.length - 1 === i) {
		// 				return {
		// 					...marker,
		// 					label: this.state.input
		// 				};
		// 			} else {
		// 				return marker;
		// 			}
		// 		})
		// 	},
		// 	open: false
		// });
		// console.log(this.state);

		this.props.addLocation(this.state.user);
	};

	onChange = e => {
		this.setState({ input: e.target.value });
	};

	onClickHandler = e => {
		const { lat, lng } = e.latLng;
		const position = { lat: lat(), lng: lng() };

		let geocoder = new window.google.maps.Geocoder();
		geocoder.geocode({ location: position }, (results, status) => {
			if (status === 'OK') {
				const label =
					results[0].address_components[1] !== undefined
						? results[0].address_components[1].short_name
						: results[0].address_components[0].short_name;

				this.setState({
					...this.state,
					input: label,
					open: true,
					user: {
						...this.state.user,
						markers: [
							...this.state.user.markers,
							{
								position,
								id: Date.now(),
								label
							}
						]
					}
				});
			} else {
				console.log('Geocode was not successful for the following reason: ' + status);
			}
		});
	};

	render() {
		const { open } = this.state;
		const { markers } = this.state.user;
		return (
			<div>
				<Modal
					style={{ height: '100vh' }}
					dimmer={'blurring'}
					open={open}
					onClose={this.close}
					closeOnDimmerClick={false}
					onChange={this.onChange}
				>
					<Modal.Header>Save marker as</Modal.Header>
					<Modal.Content>
						<Modal.Description>
							<Input
								defaultValue={
									markers.length > 0 ? markers[markers.length - 1].label : null
								}
								placeholder="Add a name"
								style={{ width: '100%' }}
								ref={input => {
									this.textInput = input;
								}}
							/>
						</Modal.Description>
					</Modal.Content>
					<Modal.Actions>
						<Button positive content="Add" onClick={this.close} />
					</Modal.Actions>
				</Modal>

				<GoogleMap
					onClick={this.onClickHandler}
					defaultZoom={10}
					defaultCenter={{ lat: 46.469, lng: 30.74 }}
				>
					{this.state.user.markers.map(marker => (
						<Marker key={marker.id} label={marker.label} position={marker.position} />
					))}
				</GoogleMap>
			</div>
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
	addLocation: data => dispatch(addLocation(data))
});

export default connect(null, mapDispatchToProps)(MapWithGeocode);
