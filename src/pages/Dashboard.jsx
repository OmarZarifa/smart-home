import React from "react";
import {
  RiDeviceLine,
  RiHomeSmileLine,
  RiLightbulbLine,
  RiAddLine,
  RiArrowRightLine,
} from "react-icons/ri";

function StatCard({ icon: Icon, label, value, color }) {
  return (
    <div className="bg-white rounded-xl p-6 shadow-sm">
      <div className="flex items-center gap-4">
        <div className={`p-3 ${color} rounded-lg`}>
          <Icon size={24} className="text-white" />
        </div>
        <div>
          <h3 className="text-sm font-medium text-gray-500">{label}</h3>
          <p className="text-2xl font-semibold text-gray-900">{value}</p>
        </div>
      </div>
    </div>
  );
}

function QuickAccessCard({ icon: Icon, label, onClick }) {
  return (
    <button
      onClick={onClick}
      className="w-full flex items-center justify-between bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow group"
    >
      <div className="flex items-center gap-4">
        <div className="p-3 bg-blue-50 rounded-lg text-blue-600">
          <Icon size={24} />
        </div>
        <h3 className="font-medium text-gray-900">{label}</h3>
      </div>
      <RiArrowRightLine
        className="text-gray-400 group-hover:text-blue-600 transition-colors"
        size={20}
      />
    </button>
  );
}

function RoomCard({ room, activeDevices, totalDevices }) {
  return (
    <div className="bg-white rounded-xl p-6 shadow-sm">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-medium text-gray-900">{room}</h3>
        <span className="text-sm text-gray-500">
          {activeDevices} of {totalDevices} active
        </span>
      </div>
      <div className="w-full bg-gray-100 rounded-full h-2">
        <div
          className="bg-blue-600 h-2 rounded-full"
          style={{
            width: `${(activeDevices / totalDevices) * 100}%`,
          }}
        ></div>
      </div>
    </div>
  );
}

function Dashboard() {
  // Example data - in a real app, this would come from props or an API
  const stats = {
    totalDevices: 12,
    activeDevices: 8,
    totalRooms: 5,
  };

  const rooms = [
    { name: "Living Room", activeDevices: 3, totalDevices: 4 },
    { name: "Kitchen", activeDevices: 2, totalDevices: 3 },
    { name: "Bedroom", activeDevices: 2, totalDevices: 3 },
    { name: "Bathroom", activeDevices: 1, totalDevices: 2 },
  ];

  const handleQuickAccess = (action) => {
    console.log(`Navigating to ${action}`);
    // Here you would typically handle navigation
  };

  return (
    <div className="space-y-6 p-6">
      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatCard
          icon={RiDeviceLine}
          label="Total Devices"
          value={stats.totalDevices}
          color="bg-blue-600"
        />
        <StatCard
          icon={RiLightbulbLine}
          label="Active Devices"
          value={stats.activeDevices}
          color="bg-green-600"
        />
        <StatCard
          icon={RiHomeSmileLine}
          label="Rooms"
          value={stats.totalRooms}
          color="bg-purple-600"
        />
      </div>

      {/* Quick Access */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <QuickAccessCard
          icon={RiAddLine}
          label="Add New Device"
          onClick={() => handleQuickAccess("add-device")}
        />
        <QuickAccessCard
          icon={RiDeviceLine}
          label="Manage Devices"
          onClick={() => handleQuickAccess("manage-devices")}
        />
      </div>

      {/* Rooms Overview */}
      <div>
        <h2 className="text-xl font-semibold text-gray-900 mb-4">
          Rooms Overview
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {rooms.map((room) => (
            <RoomCard
              key={room.name}
              room={room.name}
              activeDevices={room.activeDevices}
              totalDevices={room.totalDevices}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
