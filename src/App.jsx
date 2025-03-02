import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Sidebar from "./components/Sidebar";
import Header from "./components/Header";
import Dashboard from "./pages/Dashboard";
import Devices from "./pages/Devices";
import Rooms from "./pages/Rooms";
import VoiceRecognition from "./pages/VoiceRecognition";
import Profile from "./pages/Profile";
import { rooms as roomsData } from "./data/rooms.json";
import { devices as devicesData } from "./data/devices.json";

function App() {
  const [activeRoom, setActiveRoom] = useState(roomsData[0] || {});
  const [securityStatus, setSecurityStatus] = useState("Armed");
  const [energyUsage, setEnergyUsage] = useState(450);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const toggleLights = (roomId) => {
    const updatedRooms = roomsData.map((room) =>
      room.id === roomId ? { ...room, lights: !room.lights } : room
    );
    setActiveRoom(updatedRooms.find((room) => room.id === roomId) || {});
  };

  return (
    <Router>
      <div className="min-h-screen bg-gray-100 flex">
        <Sidebar
          isSidebarOpen={isSidebarOpen}
          setIsSidebarOpen={setIsSidebarOpen}
        />
        <main
          className={`flex-1 transition-all duration-300 ${
            isSidebarOpen ? "ml-64" : "ml-20"
          }`}
        >
          <Header securityStatus={securityStatus} energyUsage={energyUsage} />
          <Routes>
            <Route path="/" element={<Navigate to="/dashboard" replace />} />
            <Route
              path="/dashboard"
              element={
                <Dashboard
                  rooms={roomsData}
                  activeRoom={activeRoom}
                  setActiveRoom={setActiveRoom}
                  toggleLights={toggleLights}
                  securityStatus={securityStatus}
                  energyUsage={energyUsage}
                />
              }
            />
            <Route
              path="/devices"
              element={<Devices devices={devicesData} rooms={roomsData} />}
            />
            <Route path="/rooms" element={<Rooms rooms={roomsData} />} />
            <Route path="/voice-recognition" element={<VoiceRecognition />} />
            <Route path="/profile" element={<Profile />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
