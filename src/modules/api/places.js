const apiKey = process.env.PLACES_API;
const proxyurl = 'https://cors-anywhere.herokuapp.com/';
const placesAutocompleteUri = input => `https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${input}&types=(cities)&key=${apiKey}`;
const placesDetailsUri = placeId => `https://maps.googleapis.com/maps/api/place/details/json?place_id=${placeId}&fields=geometry&key=${apiKey}`;

const fetchPlacesApi = async input => {
  const response = await fetch(proxyurl + input);
  const data = await response.json();
  return data;
};

const fetchPlaceAutocomplete = input => fetchPlacesApi(placesAutocompleteUri(input));

const fetchPlaceDetails = input => fetchPlacesApi(placesDetailsUri(input));

export const getPlaceAutocomplete = async input => {
  const predictionsList = [];
  const { status, predictions } = await fetchPlaceAutocomplete(input);
  if (status === 'OK') {
    predictions.forEach(prediction => {
      const { description, place_id: placeID } = prediction;
      predictionsList.push({ description, placeID });
    });
    return { predictionsList };
  }
  return { status };
};

export const getPlaceDetails = async placeID => {
  const { status, result } = await fetchPlaceDetails(placeID);
  if (status === 'OK') {
    const { geometry: { location: { lat, lng: lon } } } = result;
    return { lat, lon };
  }
  return { status };
};
