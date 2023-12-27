// import { useLoaderData } from "react-router-dom";
// import jsPDF from "jspdf";
// import { useEffect, useRef, useState } from "react";
import React, { useState, useEffect, useRef } from "react";
// import L from "leaflet";
// import "leaflet/dist/leaflet.css";
// import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

export const loader = async () => {
  return "loader";
};

export const action = async ({ request, params }) => {
  return "action";
};

const TestApiPage: React.FC = () => {
  //   const reportTemplateRef = useRef(null);

  // 	const handleGeneratePdf = () => {
  // 		const doc = new jsPDF({
  // 			format: 'a4',
  // 			unit: 'px',
  // 		});

  // 		// Adding the fonts.
  // 		doc.setFont('Inter-Regular', 'normal');

  // 		doc.html("<div style=\"width: 500px; border: 1px solid black\"><h1 style=\"color: red\">hello, world</h1><p>sample paragraph</p></div>", {
  // 			async callback(doc) {
  // 				await doc.save('document');
  // 			},
  // 		});
  // 	};

  // 	return (
  // 		<div>
  // 			<button className="button" onClick={handleGeneratePdf}>
  // 				Generate PDF
  // 			</button>
  // 			<div ref={reportTemplateRef}>
  // 				<h1>alsdkjfa</h1>
  //         <p>Danh Pb</p>
  // 			</div>
  // 		</div>
  // 	);
  // State để giữ mảng các tọa độ của các marker
  const [coordinates, setCoordinates] = useState([
    { id: 1, lat: 51.505, lng: -0.09 },
    { id: 2, lat: 51.51, lng: -0.1 },
    // Thêm tọa độ khác nếu cần
  ]);

  // State để giữ giá trị của center
  const [center, setCenter] = useState({ lat: 51.505, lng: -0.09 });

  // Effect để theo dõi sự thay đổi của mảng coordinates
  useEffect(() => {
    // Code xử lý khi mảng coordinates thay đổi, có thể là cập nhật dữ liệu từ API hoặc xử lý một logic nào đó
    console.log('Coordinates updated:', coordinates);
  }, [coordinates]);

  // Effect để theo dõi sự thay đổi của center và cập nhật state của center
  useEffect(() => {
    console.log('Center updated:', center);
  }, [center]);

  return (
    <div>
      <h1>My React Leaflet App</h1>
      {/* Bản đồ */}
      <MapContainer center={center} zoom={13} style={{ height: '400px', width: '100%' }}>
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        {/* Hiển thị các marker từ mảng coordinates */}
        {coordinates.map(coord => (
          <Marker key={coord.id} position={[coord.lat, coord.lng]}>
            <Popup>
              Marker {coord.id} - Lat: {coord.lat}, Lng: {coord.lng}
            </Popup>
          </Marker>
        ))}
      </MapContainer>
      {/* Nút để thay đổi mảng coordinates và center */}
      <button
        onClick={() => {
          setCoordinates([
            { id: 1, lat: 51.505, lng: -0.09 },
            { id: 2, lat: 51.51, lng: -0.1 },
            { id: 3, lat: 51.515, lng: -0.11 }, // Thêm một marker mới
          ]);
          setCenter({ lat: 51.51, lng: -0.1 }); // Cập nhật giá trị của center
        }}
      >
        Update Coordinates and Center
      </button>
    </div>
  );
};

export default TestApiPage