<script setup>
import { onMounted, ref } from 'vue';
import axios from 'axios';
import { useRoute } from 'vue-router'; // Importiere useRoute, um auf die Routenparameter zuzugreifen

const map = ref(null);
const userAddress = ref('');
const destination = ref(''); // Zieladresse wird später gesetzt
const route = useRoute(); // Verwende useRoute, um auf die Routenparameter zuzugreifen

const loadMap = () => {
  const apiKey = import.meta.env.VITE_APP_GOOGLE_MAPS_API_KEY;
  if (!apiKey) {
    console.error('Google Maps API-Schlüssel fehlt');
    return;
  }

  // Überprüfen, ob das Skript bereits vorhanden ist
  if (!document.querySelector(`script[src*="maps.googleapis.com/maps/api/js?key=${apiKey}"]`)) {
    const script = document.createElement('script');
    script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&callback=initMap`;
    script.async = true;
    script.defer = true;
    window.initMap = initMap;
    document.head.appendChild(script);
  } else {
    // Wenn das Skript bereits vorhanden ist, direkt die Karte initialisieren
    initMap();
  }
};

const initMap = () => {
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
    const response = await axios.get(`/api/blog/${route.params.id}`); // Beispiel-API-Endpunkt
    const blog = response.data;
    destination.value = `${blog.address}, ${blog.zip} ${blog.city}`;
    console.log('Abgerufene Adresse:', destination.value); // Protokolliert die abgerufene Adresse
  } catch (error) {
    console.error('Fehler beim Abrufen der Blogadresse:', error);
  }
};

onMounted(() => {
  loadMap();
  fetchBlogAddress(); // Blogadresse beim Mounten abrufen
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
</style>