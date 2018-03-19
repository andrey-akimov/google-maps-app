import React from 'react';
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
	console.log('props>>>', props.markers.markers.length === 0);
	return (
		<GoogleMap defaultZoom={10} defaultCenter={{ lat: 46.469, lng: 30.74 }}>
			{props.markers.markers.length === 0
				? null
				: props.markers.markers.map(marker => (
						<Marker
							key={marker.id}
							onDrag={() => console.log(111)}
							label={marker.label}
							position={marker.location}
						/>
				  ))}
		</GoogleMap>
	);
});

export default Map;
