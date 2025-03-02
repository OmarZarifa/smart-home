import React, { useState } from "react";
import mockData from "../data/rooms.json";
import {
  RiHomeSmileLine,
  RiDeleteBin6Line,
  RiEditLine,
  RiAddLine,
  RiHome2Line,
} from "react-icons/ri";

function Rooms() {
  const [rooms, setRooms] = useState(mockData.rooms);
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingRoom, setEditingRoom] = useState(null);
  const [newRoom, setNewRoom] = useState({
    name: "",
    type: "living",
    floor: "Ground Floor",
    connectedDevices: 0,
    description: "",
  });

  const { roomTypes, floorOptions } = mockData;

  const handleAddRoom = (e) => {
    e.preventDefault();
    if (newRoom.name.trim()) {
      setRooms([...rooms, { ...newRoom, id: Date.now() }]);
      setNewRoom({
        name: "",
        type: "living",
        floor: "Ground Floor",
        connectedDevices: 0,
        description: "",
      });
      setShowAddForm(false);
    }
  };

  const handleEditRoom = (room) => {
    setEditingRoom(room);
    setNewRoom({
      name: room.name,
      type: room.type,
      floor: room.floor,
      connectedDevices: room.connectedDevices,
      description: room.description,
    });
  };

  const handleUpdateRoom = (e) => {
    e.preventDefault();
    if (newRoom.name.trim()) {
      setRooms(
        rooms.map((room) =>
          room.id === editingRoom.id ? { ...room, ...newRoom } : room
        )
      );
      setEditingRoom(null);
      setNewRoom({
        name: "",
        type: "living",
        floor: "Ground Floor",
        connectedDevices: 0,
        description: "",
      });
    }
  };

  const handleDeleteRoom = (roomId) => {
    if (window.confirm("Are you sure you want to delete this room?")) {
      setRooms(rooms.filter((room) => room.id !== roomId));
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Page Header */}
        <div className="bg-white rounded-2xl shadow-sm p-6 mb-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <RiHome2Line className="text-3xl text-blue-600" />
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Rooms</h1>
                <p className="text-gray-500">
                  Manage your home's rooms and spaces
                </p>
              </div>
            </div>
            {!showAddForm && !editingRoom && (
              <button
                onClick={() => setShowAddForm(true)}
                className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                <RiAddLine />
                Add Room
              </button>
            )}
          </div>
        </div>

        {/* Add/Edit Form */}
        {(showAddForm || editingRoom) && (
          <div className="bg-white rounded-2xl shadow-sm p-6 mb-6">
            <form onSubmit={editingRoom ? handleUpdateRoom : handleAddRoom}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Room Name
                  </label>
                  <input
                    type="text"
                    value={newRoom.name}
                    onChange={(e) =>
                      setNewRoom({ ...newRoom, name: e.target.value })
                    }
                    className="w-full px-4 py-2.5 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Enter room name"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Room Type
                  </label>
                  <select
                    value={newRoom.type}
                    onChange={(e) =>
                      setNewRoom({ ...newRoom, type: e.target.value })
                    }
                    className="w-full px-4 py-2.5 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  >
                    {roomTypes.map((type) => (
                      <option key={type.value} value={type.value}>
                        {type.label}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Floor
                  </label>
                  <select
                    value={newRoom.floor}
                    onChange={(e) =>
                      setNewRoom({ ...newRoom, floor: e.target.value })
                    }
                    className="w-full px-4 py-2.5 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  >
                    {floorOptions.map((floor) => (
                      <option key={floor} value={floor}>
                        {floor}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Description
                  </label>
                  <input
                    type="text"
                    value={newRoom.description}
                    onChange={(e) =>
                      setNewRoom({ ...newRoom, description: e.target.value })
                    }
                    className="w-full px-4 py-2.5 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Brief description of the room"
                  />
                </div>
              </div>
              <div className="flex gap-3 mt-6">
                <button
                  type="submit"
                  className="px-6 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  {editingRoom ? "Update Room" : "Add Room"}
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setShowAddForm(false);
                    setEditingRoom(null);
                    setNewRoom({
                      name: "",
                      type: "living",
                      floor: "Ground Floor",
                      connectedDevices: 0,
                      description: "",
                    });
                  }}
                  className="px-6 py-2.5 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Rooms Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {rooms.map((room) => (
            <div
              key={room.id}
              className="bg-white rounded-2xl shadow-sm p-6 hover:shadow-md transition-shadow"
            >
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">
                    {room.name}
                  </h3>
                  <p className="text-sm text-gray-500 capitalize">
                    {room.type}
                  </p>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => handleEditRoom(room)}
                    className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                  >
                    <RiEditLine size={20} />
                  </button>
                  <button
                    onClick={() => handleDeleteRoom(room.id)}
                    className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                  >
                    <RiDeleteBin6Line size={20} />
                  </button>
                </div>
              </div>
              <div className="space-y-2 text-sm text-gray-600">
                <p className="flex items-center gap-2">
                  <RiHomeSmileLine className="text-gray-400" />
                  Floor: {room.floor}
                </p>
                <p className="flex items-center gap-2">
                  <RiHome2Line className="text-gray-400" />
                  Connected Devices: {room.connectedDevices}
                </p>
                <p className="text-gray-500 mt-2">{room.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Rooms;
