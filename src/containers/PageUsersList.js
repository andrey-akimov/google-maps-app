import React, { Component } from 'react';
import { compose, withProps } from 'recompose';
import {
	withScriptjs,
	withGoogleMap,
	GoogleMap,
	Marker
} from 'react-google-maps';
import { connect } from 'react-redux';

const MapWithMarkers = compose(
	withProps({
		googleMapURL:
			'https://maps.googleapis.com/maps/api/js?key=AIzaSyBoq27kZ_DpT-WyKHrMn4WNvvTc-weMvc4&v=3.exp&libraries=geometry,drawing,places',
		loadingElement: <div style={{ height: `100%` }} />,
		containerElement: <div style={{ height: `100vh` }} />,
		mapElement: <div style={{ height: `100%` }} />
	}),
	withScriptjs,
	withGoogleMap
)(props => (
	<GoogleMap defaultZoom={10} defaultCenter={{ lat: 46.469, lng: 30.74 }}>
		<Marker
			onDrag={() => console.log(111)}
			label={'ololoshada a asdhfa s'}
			defaultDraggable
			position={{ lat: 46.469, lng: 30.74 }}
		/>
	</GoogleMap>
));

class PageUsersList extends Component {
	render() {
		console.log(this.props.state);
		return <MapWithMarkers />;
	}
}

const mapStateToProps = state => ({
	state: state
});

export default connect(mapStateToProps)(PageUsersList);
