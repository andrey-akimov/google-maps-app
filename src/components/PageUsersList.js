import React from "react";
import { compose, withProps } from "recompose";
import {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  Marker
} from "react-google-maps";

const PageUsersList = compose(
  withProps({
    googleMapURL:
      "https://maps.googleapis.com/maps/api/js?key=AIzaSyBoq27kZ_DpT-WyKHrMn4WNvvTc-weMvc4&v=3.exp&libraries=geometry,drawing,places",
    loadingElement: <div style={{ height: `100%` }} />,
    containerElement: <div style={{ height: `90vh` }} />,
    mapElement: <div style={{ height: `100%` }} />
  }),
  withScriptjs,
  withGoogleMap
)(props => (
  <GoogleMap defaultZoom={10} defaultCenter={{ lat: 46.469, lng: 30.740 }}>
    {props.isMarkerShown && (
      <Marker position={{ lat: 46.469, lng: 30.740 }} />
    )}
  </GoogleMap>
));

export default PageUsersList;