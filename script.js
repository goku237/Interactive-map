const map = L.map('map').setView([20.5937, 78.9629], 4); // Centered on India

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: '&copy; OpenStreetMap contributors'
}).addTo(map);

let marker;

function searchLocation() {
  const query = document.getElementById('searchBox').value;

  fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(query)}`)
    .then(response => response.json())
    .then(data => {
      if (data.length > 0) {
        const lat = data[0].lat;
        const lon = data[0].lon;

        if (marker) {
          map.removeLayer(marker);
        }

        marker = L.marker([lat, lon]).addTo(map)
          .bindPopup(`<b>${query}</b>`).openPopup();

        map.setView([lat, lon], 13);
      } else {
        alert("Location not found!");
      }
    })
    .catch(error => {
      console.error("Error fetching location:", error);
    });
}
