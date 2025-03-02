# Smart Home Backend API Endpoints

## Room Management

### GET /api/rooms

Get all rooms with metadata

**Response:**

```json
{
  "rooms": [
    {
      "id": 1,
      "name": "Living Room",
      "type": "living",
      "floor": "Ground Floor",
      "connectedDevices": 3,
      "description": "Main living area",
      "lights": true,
      "temperature": 72,
      "devices": [
        {
          "id": 1,
          "name": "Smart TV",
          "type": "tv",
          "status": "on"
        }
      ]
    }
  ],
  "metadata": {
    "roomTypes": [
      { "value": "living", "label": "Living Room" },
      { "value": "kitchen", "label": "Kitchen" },
      { "value": "bedroom", "label": "Bedroom" },
      { "value": "bathroom", "label": "Bathroom" },
      { "value": "office", "label": "Home Office" },
      { "value": "dining", "label": "Dining Room" },
      { "value": "laundry", "label": "Laundry Room" },
      { "value": "garage", "label": "Garage" },
      { "value": "basement", "label": "Basement" }
    ],
    "floorOptions": [
      "Basement",
      "Ground Floor",
      "First Floor",
      "Second Floor",
      "Attic"
    ]
  }
}
```

### GET /api/rooms/{id}

Get detailed information about a specific room

**Response:**

```json
{
  "id": 1,
  "name": "Living Room",
  "type": "living",
  "floor": "Ground Floor",
  "connectedDevices": 3,
  "description": "Main living area",
  "lights": true,
  "temperature": 72,
  "devices": [
    {
      "id": 1,
      "name": "Smart TV",
      "type": "tv",
      "status": "on",
      "lastUpdated": "2024-03-20T14:30:00Z"
    },
    {
      "id": 2,
      "name": "Air Conditioner",
      "type": "ac",
      "status": "off",
      "temperature": 72,
      "lastUpdated": "2024-03-20T14:30:00Z"
    }
  ],
  "lastUpdated": "2024-03-20T14:30:00Z"
}
```

### POST /api/rooms

Create a new room

**Request:**

```json
{
  "name": "New Room",
  "type": "living",
  "floor": "Ground Floor",
  "description": "Description of the new room"
}
```

**Response:**

```json
{
  "id": 3,
  "name": "New Room",
  "type": "living",
  "floor": "Ground Floor",
  "connectedDevices": 0,
  "description": "Description of the new room",
  "lights": false,
  "temperature": 70,
  "devices": [],
  "created": "2024-03-20T14:30:00Z",
  "lastUpdated": "2024-03-20T14:30:00Z"
}
```

### PUT /api/rooms/{id}

Update an existing room

**Request:**

```json
{
  "name": "Updated Room Name",
  "type": "living",
  "floor": "First Floor",
  "description": "Updated description"
}
```

**Response:**

```json
{
  "id": 1,
  "name": "Updated Room Name",
  "type": "living",
  "floor": "First Floor",
  "description": "Updated description",
  "connectedDevices": 2,
  "lights": true,
  "temperature": 72,
  "devices": [],
  "lastUpdated": "2024-03-20T14:35:00Z"
}
```

### DELETE /api/rooms/{id}

Delete a room

**Response:**

```json
{
  "success": true,
  "message": "Room deleted successfully"
}
```

## Device Management

### GET /api/devices

Get all devices

**Response:**

```json
{
  "devices": [
    {
      "id": 1,
      "name": "Living Room TV",
      "type": "tv",
      "status": "on",
      "roomId": 1,
      "roomName": "Living Room",
      "brand": "Samsung",
      "model": "Smart TV 4K",
      "lastUpdated": "2024-03-20T14:30:00Z"
    }
  ],
  "metadata": {
    "deviceTypes": [
      { "value": "tv", "label": "Television" },
      { "value": "ac", "label": "Air Conditioner" },
      { "value": "light", "label": "Smart Light" },
      { "value": "speaker", "label": "Speaker" },
      { "value": "camera", "label": "Security Camera" },
      { "value": "lock", "label": "Smart Lock" }
    ]
  }
}
```

### GET /api/devices/{id}

Get detailed information about a specific device

**Response:**

```json
{
  "id": 1,
  "name": "Living Room TV",
  "type": "tv",
  "status": "on",
  "roomId": 1,
  "roomName": "Living Room",
  "brand": "Samsung",
  "model": "Smart TV 4K",
  "features": ["4K", "HDR", "Smart Hub"],
  "lastUpdated": "2024-03-20T14:30:00Z",
  "statistics": {
    "hoursUsedToday": 4.5,
    "powerConsumption": "120W"
  }
}
```

### POST /api/devices

Add a new device

**Request:**

```json
{
  "name": "New Device",
  "type": "tv",
  "roomId": 1,
  "brand": "Samsung",
  "model": "Smart TV 4K"
}
```

**Response:**

```json
{
  "id": 4,
  "name": "New Device",
  "type": "tv",
  "status": "off",
  "roomId": 1,
  "roomName": "Living Room",
  "brand": "Samsung",
  "model": "Smart TV 4K",
  "created": "2024-03-20T14:30:00Z",
  "lastUpdated": "2024-03-20T14:30:00Z"
}
```

### PUT /api/devices/{id}

Update a device

**Request:**

```json
{
  "name": "Updated Device Name",
  "roomId": 2,
  "status": "on"
}
```

**Response:**

```json
{
  "id": 1,
  "name": "Updated Device Name",
  "type": "tv",
  "status": "on",
  "roomId": 2,
  "roomName": "Bedroom",
  "brand": "Samsung",
  "model": "Smart TV 4K",
  "lastUpdated": "2024-03-20T14:35:00Z"
}
```

### DELETE /api/devices/{id}

Delete a device

**Response:**

```json
{
  "success": true,
  "message": "Device deleted successfully"
}
```

## Device Control Endpoints

### POST /api/devices/{id}/control

Control a device

**Request:**

```json
{
  "action": "setPower",
  "value": "on"
}
```

**Response:**

```json
{
  "id": 1,
  "status": "on",
  "lastUpdated": "2024-03-20T14:36:00Z",
  "success": true,
  "message": "Command executed successfully"
}
```

### GET /api/devices/{id}/status

Get real-time device status

**Response:**

```json
{
  "id": 1,
  "status": "on",
  "details": {
    "temperature": 72,
    "mode": "cool",
    "fanSpeed": "auto"
  },
  "lastUpdated": "2024-03-20T14:36:00Z"
}
```

## Statistics and Analytics

### GET /api/statistics/rooms/{id}

Get room statistics

**Response:**

```json
{
  "roomId": 1,
  "energyConsumption": {
    "daily": 2.5,
    "weekly": 17.8,
    "monthly": 76.2,
    "unit": "kWh"
  },
  "deviceUsage": [
    {
      "deviceId": 1,
      "deviceName": "Smart TV",
      "hoursUsed": 4.5,
      "powerConsumption": 0.9
    }
  ],
  "temperature": {
    "current": 72,
    "average": 71.5,
    "min": 70,
    "max": 74
  },
  "occupancy": {
    "current": true,
    "dailyAverage": "6.5 hours"
  }
}
```

### GET /api/statistics/devices/{id}

Get device statistics

**Response:**

```json
{
  "deviceId": 1,
  "usage": {
    "daily": {
      "hoursUsed": 4.5,
      "powerConsumption": 0.9,
      "peakUsageTime": "19:00-22:00"
    },
    "weekly": {
      "hoursUsed": 31.5,
      "powerConsumption": 6.3,
      "mostUsedDay": "Saturday"
    }
  },
  "status": {
    "uptime": "99.9%",
    "lastMaintenance": "2024-03-01T00:00:00Z",
    "healthStatus": "good"
  }
}
```
