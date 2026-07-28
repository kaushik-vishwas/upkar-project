import React, { useEffect, useState } from 'react';
import { MapContainer, Marker, Popup, TileLayer, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import PinfImage from '../../assets/pin.png';

const BANGALORE_CENTER = [12.8644, 77.5331];

const projects = [
  {
    id: 1,
    name: 'Upkar Galaxy 1',
    location: 'Mysore Road',
    link: 'https://maps.app.goo.gl/pAt7mEa2PgM9gSAv5',
    lat: 12.904277,
    lng: 77.375027,
  },
  {
    id: 2,
    name: 'Upkar Galaxy 2',
    location: 'Bengaluru',
    link: 'https://maps.app.goo.gl/ND9hRmE1FHQbRTU56',
    lat: 12.921052,
    lng: 77.363572,
  },
  {
    id: 3,
    name: 'Upkar Royal Garden',
    location: 'Bengaluru',
    link: 'https://maps.app.goo.gl/GYKoJHxj8aYNuzXU8',
    lat: 12.778354,
    lng: 77.790484,
  },
  {
    id: 4,
    name: 'Upkar Symphony',
    location: 'Bengaluru',
    link: 'https://maps.app.goo.gl/zLBU5qQgy5t3M6U69',
    lat: 12.787889,
    lng: 77.781736,
  },
  {
    id: 5,
    name: 'Upkar Gardenia',
    location: 'Bengaluru',
    link: 'https://maps.app.goo.gl/EHRzUXt2SyN5jRbF6',
    lat: 12.7402791,
    lng: 77.7753443,
  },
];

const createPinIcon = (isActive) =>
  L.icon({
    iconUrl: PinfImage,
    iconSize: [32, 32],
    iconAnchor: [16, 32],
    popupAnchor: [0, -32],
    className: isActive ? 'active-pin' : '',
  });

function MapController({ activeProject, hasInteracted }) {
  const map = useMap();

  useEffect(() => {
    const bounds = L.latLngBounds(
      projects.map((project) => [project.lat, project.lng]),
    );
    map.fitBounds(bounds, { padding: [30, 30] });
  }, [map]);

  useEffect(() => {
    if (!hasInteracted) return;

    map.flyTo([activeProject.lat, activeProject.lng], 13, { duration: 1 });
  }, [activeProject, hasInteracted, map]);

  return null;
}

const Map = () => {
  const [activeProject, setActiveProject] = useState(projects[0]);
  const [hasInteracted, setHasInteracted] = useState(false);

  return (
    <section className="bg-gray-100 py-12 md:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          <div className="text-center lg:text-left">
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-figtree font-semibold text-black mb-6 md:mb-8">
              <span className="text-[#2D5C3A] font-semibold">
                Interactive Map
              </span>
            </h2>

            <div className="space-y-3 sm:space-y-4 md:space-y-5">
              {projects.map((project) => (
                <button
                  key={project.id}
                  type="button"
                  onClick={() => {
                    setActiveProject(project);
                    setHasInteracted(true);
                  }}
                  className={`block w-full lg:w-auto text-center lg:text-left text-sm sm:text-base md:text-lg font-figtree transition-all duration-300 ${
                    activeProject.id === project.id
                      ? 'text-[#2D5C3A] font-semibold'
                      : 'text-gray-600 hover:text-[#2D5C3A]'
                  }`}
                >
                  {project.name}
                </button>
              ))}
            </div>
          </div>

          <div className="flex justify-center w-full">
            <div className="relative w-full h-[280px] sm:h-[350px] md:h-[400px] lg:h-[450px] rounded-2xl overflow-hidden shadow-xl">
              <MapContainer
                center={BANGALORE_CENTER}
                zoom={11}
                scrollWheelZoom
                touchZoom
                dragging
                doubleClickZoom
                className="h-full w-full z-0"
              >
                <TileLayer
                  attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                <MapController
                  activeProject={activeProject}
                  hasInteracted={hasInteracted}
                />
                {projects.map((project) => (
                  <Marker
                    key={project.id}
                    position={[project.lat, project.lng]}
                    icon={createPinIcon(activeProject.id === project.id)}
                    eventHandlers={{
                      click: () => {
                        setActiveProject(project);
                        setHasInteracted(true);
                      },
                      mouseover: () => setActiveProject(project),
                    }}
                  >
                    <Popup>
                      <div className="text-center">
                        <p className="font-semibold text-[#2D5C3A] text-sm">
                          {project.name}
                        </p>
                        <p className="text-xs text-gray-500 mb-2">
                          {project.location}
                        </p>
                        <a
                          href={project.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-xs text-[#2D5C3A] underline"
                        >
                          Open in Google Maps
                        </a>
                      </div>
                    </Popup>
                  </Marker>
                ))}
              </MapContainer>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Map;
