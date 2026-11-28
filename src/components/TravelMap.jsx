
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'
import './TravelMap.css'

// Geographic coordinates for Wanderly destinations
const destinationCoordinates = {
  'Taj Mahal': [27.1751, 78.0421],
  Jaipur: [26.9124, 75.7873],
  Goa: [15.2993, 74.124],
  Munnar: [10.0889, 77.0595],
  Ladakh: [34.1526, 77.5771],
  Meghalaya: [25.467, 91.3662],
  Hampi: [15.335, 76.46],
  Varanasi: [25.3176, 82.9739]
}

const createMarkerIcon = (isSelected) =>
  L.divIcon({
    className: 'custom-map-marker',
    html: `<span class="marker-dot ${
      isSelected ? 'marker-selected' : ''
    }"></span>`,
    iconSize: [24, 24],
    iconAnchor: [12, 12]
  })

function TravelMap({ destinations, myTrip }) {
  return (
    <div className="travel-map-wrapper" id="travel-map">
      <div className="travel-map-heading">
        <span className="section-tag">✦ EXPLORE INDIA</span>
        <h2>Discover Destinations on the Map</h2>
        <p>
          Explore all our destinations and find the places
          you have added to your trip.
        </p>
      </div>

      <div className="travel-map-container">
        <MapContainer
          center={[22.5, 79]}
          zoom={4.5}
          scrollWheelZoom={false}
          className="travel-map"
          aria-label="Map showing Wanderly travel destinations across India"
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />

          {destinations.map((destination) => {
            const coordinates =
              destinationCoordinates[destination.name]

            if (!coordinates) return null

            const isSelected = myTrip.includes(destination.name)

            const markerIcon = createMarkerIcon(isSelected)

            return (
              <Marker
                key={destination.name}
                position={coordinates}
                icon={markerIcon}
              >
                <Popup>
                  <div className="map-popup">
                    <strong>{destination.name}</strong>
                    <p>{destination.country}</p>
                    <span>
                      {isSelected
                        ? '✓ Added to My Trip'
                        : 'Explore this destination'}
                    </span>
                  </div>
                </Popup>
              </Marker>
            )
          })}
        </MapContainer>
      </div>

      <div className="map-legend">
        <span>
          <i className="legend-dot"></i>
          All destinations
        </span>
        <span>
          <i className="legend-dot legend-selected"></i>
          Added to My Trip
        </span>
      </div>
    </div>
  )
}

export default TravelMap
