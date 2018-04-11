import React from 'react';
import { withScriptjs, withGoogleMap, GoogleMap, Marker } from 'react-google-maps';
import { compose, withProps } from 'recompose';

const UsersMap = compose(
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

export default UsersMap;
