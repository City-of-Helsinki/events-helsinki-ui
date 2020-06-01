import "leaflet/dist/leaflet.css";

import React from "react";

import markerIconUrl from "../../../assets/images/png/map-marker.png";
import isClient from "../../../util/isClient";
import styles from "./map.module.scss";

// Import leaflet only on client because it breaks SSR
// eslint-disable-next-line @typescript-eslint/no-require-imports
const L = isClient ? require("leaflet") : null;
// eslint-disable-next-line @typescript-eslint/no-require-imports
const ReactLeaflet = isClient ? require("react-leaflet") : null;

// Allow map scroll only inside Helsinki
const maxBounds = [
  { lat: 60.33, lng: 25.33 },
  { lat: 60.1, lng: 24.73 }
];

interface Props {
  coordinates: number[] | null;
  zoom: 11 | 12 | 13 | 14 | 15 | 16 | 17 | 18;
}

const Map: React.FC<Props> = ({ coordinates, zoom }) => {
  const position: [number, number] | null = coordinates
    ? [coordinates[1], coordinates[0]]
    : null;
  const markerPosition = position
    ? { lat: position[0], lng: position[1] }
    : null;

  const getMarkerIcon = (): L.Icon => {
    return L.icon({
      iconAnchor: [20, 40],
      iconSize: [30, 30],
      iconUrl: markerIconUrl,
      popupAnchor: [0, 0]
    });
  };
  const renderMarker = () =>
    markerPosition ? (
      <ReactLeaflet.Marker
        icon={getMarkerIcon()}
        keyboard={false}
        position={markerPosition}
      />
    ) : null;

  return (
    <div className={styles.mapContainer}>
      {/* leaflet is breaking SSR so render map only on client side */}
      {isClient && (
        <ReactLeaflet.Map
          center={position || undefined}
          zoom={zoom}
          minZoom={11}
          maxZoom={18}
          maxBounds={maxBounds}
          style={{ height: "100%", width: "100%" }}
        >
          <ReactLeaflet.TileLayer url="https://tiles.hel.ninja/wmts/osm-sm/webmercator/{z}/{x}/{y}.png" />
          {renderMarker()}
        </ReactLeaflet.Map>
      )}
    </div>
  );
};

export default Map;
