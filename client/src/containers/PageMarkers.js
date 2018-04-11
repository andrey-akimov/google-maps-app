import React, { Component } from 'react';
import { withScriptjs, withGoogleMap, GoogleMap, Marker } from 'react-google-maps';
import { Button, Modal, Input } from 'semantic-ui-react';
import { compose, withProps } from 'recompose';
import axios from 'axios';

class Map extends Component {
	state = {
		open: false,
		input: '',
		markers: []
	};

	closeHandler = () => {
		const lastMarker = this.state.markers[this.state.markers.length - 1];
		this.setState({ open: false });

		axios
			.post('/api/map', {
				token: localStorage.getItem('jwt'),
				marker: {
					position: {
						lat: lastMarker.position.lat,
						lng: lastMarker.position.lng
					},
					label: this.state.input
				}
			})
			.then(res => {
				if (res.data.res === 'ok') {
					this.setState({ markers: res.data.docs.markers });
				}
			})
			.catch(err => console.log(err));
	};

	onChangeHandler = e => {
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
					input: label,
					open: true,
					markers: [
						...this.state.markers,
						{
							position,
							_id: Date.now(),
							label
						}
					]
				});
			} else {
				console.log('Geocode was not successful for the following reason: ' + status);
			}
		});
	};

	// CDM
	componentDidMount() {
		axios
			.get('/api/map', {
				params: { token: localStorage.getItem('jwt') }
			})
			.then(res => {
				if (res.data.res === 'ok') {
					this.setState({ markers: res.data.docs.markers });
				}
			})
			.catch(err => console.log(err));
	}

	render() {
		const { open, markers } = this.state;
		return (
			<div>
				<Modal
					style={{ height: '100vh' }}
					dimmer={'blurring'}
					open={open}
					onClose={this.closeHandler}
					closeOnDimmerClick={false}
					onChange={this.onChangeHandler}
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
						<Button positive content="Add" onClick={this.closeHandler} />
					</Modal.Actions>
				</Modal>

				<GoogleMap
					onClick={this.onClickHandler}
					defaultZoom={10}
					defaultCenter={{ lat: 46.469, lng: 30.74 }}
				>
					{this.state.markers.map(marker => (
						<Marker key={marker._id} label={marker.label} position={marker.position} />
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

export default MapWithGeocode;
