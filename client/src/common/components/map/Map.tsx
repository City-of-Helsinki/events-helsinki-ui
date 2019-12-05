import "leaflet/dist/leaflet.css";

import L, { Icon } from "leaflet";
import React from "react";
import { Map as LeafletMap, Marker, TileLayer } from "react-leaflet";

import markerIconUrl from "../../../assets/icons/svg/map-marker.svg";
import styles from "./map.module.scss";

// Allow map scroll only inside Helsinki
const maxBounds: [number, number][] = [[60.33, 25.33], [60.1, 24.73]];

interface Props {
  coordinates: number[] | null;
}

const Map: React.FC<Props> = ({ coordinates }) => {
  const zoom = 15;
  const position: [number, number] | null = coordinates
    ? [coordinates[1], coordinates[0]]
    : null;
  const markerPosition = position
    ? { lat: position[0], lng: position[1] }
    : null;

  const getMarkerIcon = (): Icon => {
    return L.icon({
      iconAnchor: [20, 40],
      iconSize: [40, 40],
      iconUrl: markerIconUrl,
      popupAnchor: [0, 0]
    });
  };
  const marker = markerPosition ? (
    <Marker icon={getMarkerIcon()} keyboard={false} position={markerPosition} />
  ) : null;

  return (
    <div className={styles.mapContainer}>
      <LeafletMap
        center={position || undefined}
        zoom={zoom}
        minZoom={11}
        maxZoom={18}
        maxBounds={maxBounds}
        style={{ height: "100%", width: "100%" }}
      >
        <TileLayer url="https://tiles.hel.ninja/wmts/osm-sm/webmercator/{z}/{x}/{y}.png" />
        {marker}
      </LeafletMap>
    </div>
  );
};

export default Map;
