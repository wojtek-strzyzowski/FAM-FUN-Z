<template>
    <div ref="map" class="map">
      Karte wird geladen...
    </div>
  </template>
  
  <script setup>
  import { onMounted, ref } from 'vue';
  
  const map = ref(null);
  const address = 'Josefstrasse 219, Zürich, 8005';
  const destination = 'Bahnhofstrasse, Zürich, 8001'; // Beispielzieladresse
  
  const loadMap = () => {
    const apiKey = import.meta.env.VITE_APP_GOOGLE_MAPS_API_KEY;
    if (!apiKey) {
      console.error('Google Maps API-Schlüssel fehlt');
      return;
    }
  
    const script = document.createElement('script');
    script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&callback=initMap`;
    script.async = true;
    script.defer = true;
    window.initMap = initMap;
    document.head.appendChild(script);
  };
  
  const initMap = () => {
    const geocoder = new google.maps.Geocoder();
    geocoder.geocode({ address }, (results, status) => {
      if (status === 'OK') {
        const mapInstance = new google.maps.Map(map.value, {
          zoom: 15,
          center: results[0].geometry.location,
        });
        new google.maps.Marker({
          map: mapInstance,
          position: results[0].geometry.location,
        });
  
        // Routenplaner hinzufügen
        const directionsService = new google.maps.DirectionsService();
        const directionsRenderer = new google.maps.DirectionsRenderer();
        directionsRenderer.setMap(mapInstance);
  
        const request = {
          origin: results[0].geometry.location,
          destination: destination,
          travelMode: 'DRIVING',
        };
  
        directionsService.route(request, (result, status) => {
          if (status === 'OK') {
            directionsRenderer.setDirections(result);
          } else {
            console.error('Routenplanung war nicht erfolgreich aus folgendem Grund: ' + status);
          }
        });
      } else {
        console.error('Geocodierung war nicht erfolgreich aus folgendem Grund: ' + status);
      }
    });
  };
  
  onMounted(() => {
    loadMap();
  });
  </script>
  
  <style scoped>
  .map {
    width: 100%;
    height: 400px;
  }
  </style>