const getCurrentLocation = handleLocation => {
  const getLocation = (lat, lon) => ({ lat, lon });
  const success = position => {
    const location = getLocation(position.coords.latitude, position.coords.longitude);
    handleLocation(location);
  };
  const error = e => {
    let status = 'Current Location not avaliable';
    switch (e.code) {
      case e.PERMISSION_DENIED:
        status = 'You denied the request for Geolocation. 😞';
        break;
      case e.POSITION_UNAVAILABLE:
        status = 'Location information is unavailable.';
        break;
      case e.TIMEOUT:
        status = 'The request to get user location timed out.';
        break;
      case e.UNKNOWN_ERROR:
        status = 'An unknown error occurred.';
        break;
      default:
        break;
    }
    const message = { status };
    handleLocation(message);
  };
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(success, error);
  }
};

export default getCurrentLocation;
