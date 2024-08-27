<script setup>
import { onMounted, ref } from 'vue';
import axios from 'axios';
import { useRoute } from 'vue-router';

const map = ref(null);
const userAddress = ref('');
const destination = ref('');
const route = useRoute();

const loadMap = () => {
  const apiKey = import.meta.env.VITE_APP_GOOGLE_MAPS_API_KEY;
  if (!apiKey) {
    console.error('Google Maps API-Schlüssel fehlt');
    return;
  }

  if (!document.querySelector(`script[src*="maps.googleapis.com/maps/api/js?key=${apiKey}"]`)) {
    const script = document.createElement('script');
    script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&callback=initMap`;
    script.async = true;
    script.defer = true;
    script.setAttribute('loading', 'async');
    window.initMap = initMap;
    document.head.appendChild(script);
  } else {
    initMap();
  }
};

const initMap = () => {
  const geocoder = new google.maps.Geocoder();
  const directionsRenderer = new google.maps.DirectionsRenderer();
  const directionsService = new google.maps.DirectionsService();
  const mapInstance = new google.maps.Map(document.getElementById("map"), {
    zoom: 7,
    center: { lat: 47.3769, lng: 8.5417 }, // Zürich Koordinaten
    disableDefaultUI: true,
  });

  directionsRenderer.setMap(mapInstance);
  directionsRenderer.setPanel(document.getElementById("sidebar"));

  const control = document.getElementById("floating-panel");
  mapInstance.controls[google.maps.ControlPosition.TOP_CENTER].push(control);

  const onChangeHandler = () => {
    calculateAndDisplayRoute(directionsService, directionsRenderer);
  };

  document.getElementById("start").addEventListener("change", onChangeHandler);
  document.getElementById("end").addEventListener("change", onChangeHandler);
  document.getElementById("mode").addEventListener("change", onChangeHandler);

  // Hinzufügen der Standort-Schaltfläche
  const locationButton = document.createElement("button");
  locationButton.textContent = "Ihr Standort";
  locationButton.classList.add("custom-map-control-button");
  mapInstance.controls[google.maps.ControlPosition.TOP_CENTER].push(locationButton);
  locationButton.addEventListener("click", () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const pos = {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          };

          console.log('Aktuelle Position:', pos);

          geocodeLatLng(geocoder, pos, mapInstance);
        },
        (error) => {
          console.error('Fehler beim Abrufen des aktuellen Standorts:', error);
          handleLocationError(true, mapInstance.getCenter());
        }
      );
    } else {
      handleLocationError(false, mapInstance.getCenter());
    }
  });
};

const geocodeLatLng = async (geocoder, latlng, mapInstance) => {
  try {
    const response = await geocoder.geocode({ location: latlng });
    if (response.results[0]) {
      console.log('Geocoding-Ergebnisse:', response.results);
      userAddress.value = response.results[0].formatted_address;
      document.getElementById("start").value = userAddress.value;

      const infoWindow = new google.maps.InfoWindow({
        position: latlng,
        content: response.results[0].formatted_address,
      });
      infoWindow.open(mapInstance);
      mapInstance.setCenter(latlng);
    } else {
      console.error("Keine Ergebnisse gefunden");
    }
  } catch (e) {
    window.alert(`Geocoder failed due to: ${e}`);
  }
};

const handleLocationError = (browserHasGeolocation, pos) => {
  const infoWindow = new google.maps.InfoWindow({
    position: pos,
    content: browserHasGeolocation
      ? "Error: The Geolocation service failed."
      : "Error: Your browser doesn't support geolocation.",
  });
  infoWindow.open(map.value);
};

const calculateAndDisplayRoute = (directionsService, directionsRenderer) => {
  const start = document.getElementById("start").value;
  const end = document.getElementById("end").value;
  const selectedMode = document.getElementById("mode").value;

  directionsService
    .route({
      origin: start,
      destination: end,
      travelMode: google.maps.TravelMode[selectedMode],
    })
    .then((response) => {
      directionsRenderer.setDirections(response);
    })
    .catch((e) =>
      window.alert("Directions request failed due to " + e)
    );
};

const fetchBlogAddress = async () => {
  try {
    const response = await axios.get(`/api/blog/${route.params.id}`);
    const blog = response.data;
    destination.value = `${blog.address}, ${blog.zip} ${blog.city}`;
    console.log('Abgerufene Adresse:', destination.value);
  } catch (error) {
    console.error('Fehler beim Abrufen der Blogadresse:', error);
  }
};

onMounted(() => {
  loadMap();
  fetchBlogAddress();
});
</script>

<template>
  <div>
    <div id="floating-panel">
      <strong>Start:</strong>
      <input id="start" v-model="userAddress" placeholder="Geben Sie Ihre Adresse ein" />
      <br />
      <strong>Ende:</strong>
      <input id="end" v-model="destination" placeholder="Zieladresse" />
      <br />
      <strong>Modus:</strong>
      <select id="mode">
        <option value="DRIVING">Fahren</option>
        <option value="WALKING">Gehen</option>
        <option value="BICYCLING">Fahrradfahren</option>
        <option value="TRANSIT">Öffentliche Verkehrsmittel</option>
      </select>
    </div>
    <div id="map" class="map"></div>
    <div id="sidebar"></div>
  </div>
</template>

<style scoped>
.map {
  width: 100%;
  height: 400px;
}
#floating-panel {
  position: absolute;
  top: 10px;
  left: 25%;
  z-index: 5;
  background-color: #fff;
  padding: 5px;
  border: 1px solid #999;
  text-align: center;
  font-family: "Roboto", "sans-serif";
  line-height: 30px;
  padding-left: 10px;
}
.custom-map-control-button {
  background-color: #fff;
  border: 0;
  border-radius: 2px;
  box-shadow: 0 1px 4px rgba(0,0,0,0.3);
  margin: 10px;
  padding: 0 0.5em;
  font: 400 18px Roboto, Arial, sans-serif;
  overflow: hidden;
  height: 40px;
  cursor: pointer;
}
.custom-map-control-button:hover {
  background: #ebebeb;
}
</style>