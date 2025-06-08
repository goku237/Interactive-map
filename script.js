const map = L.map('map').setView([20.5937, 78.9629], 5); // Centered on India

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '© OpenStreetMap contributors'
}).addTo(map);

const locations = [
    { name: "Taj Mahal", coords: [27.1751, 78.0421], description: "A beautiful white marble mausoleum in Agra." },
    { name: "India Gate", coords: [28.6129, 77.2295], description: "A war memorial in New Delhi." },
    { name: "Charminar", coords: [17.3616, 78.4747], description: "A historic mosque in Hyderabad." },
    { name: "Gateway of India", coords: [18.9218, 72.8346], description: "An arch-monument in Mumbai." },
    { name: "Mysore Palace", coords: [12.3051, 76.6551], description: "A historical palace in Mysore." }
];

const markers = [];

locations.forEach(loc => {
    const marker = L.marker(loc.coords).addTo(map)
        .bindPopup(`<strong>${loc.name}</strong><br>${loc.description}`);
    markers.push({ ...loc, marker });
});

document.getElementById('search').addEventListener('input', function (e) {
    const query = e.target.value.toLowerCase();
    const match = markers.find(loc => loc.name.toLowerCase().includes(query));
    if (match) {
        map.setView(match.coords, 10);
        match.marker.openPopup();
    }
});
