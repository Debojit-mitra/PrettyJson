// src/pages/api/sample.js

export default function handler(req, res) {
  // Return a sample JSON object that showcases different data types
  res.status(200).json({
    user: {
      id: 1,
      name: "John Doe",
      email: "john@example.com",
      isActive: true,
      roles: ["admin", "user"],
      preferences: {
        theme: "dark",
        notifications: {
          email: true,
          push: false,
          sms: null,
        },
        dashboard: {
          widgets: [
            {
              id: "w1",
              type: "chart",
              data: {
                title: "Monthly Revenue",
                values: [1200, 1800, 1550, 1900, 2100],
              },
            },
            {
              id: "w2",
              type: "list",
              data: {
                title: "Recent Activities",
                items: [
                  "Signed in from new device",
                  "Updated profile picture",
                  "Changed password",
                ],
              },
            },
          ],
        },
      },
      address: {
        street: "123 Main St",
        city: "Anytown",
        state: "CA",
        zip: "12345",
        coordinates: {
          lat: 37.7749,
          lng: -122.4194,
        },
      },
      metadata: {
        createdAt: "2023-06-15T10:30:00Z",
        lastLogin: "2023-06-20T15:45:22Z",
        browser: "Chrome",
        operatingSystem: "macOS",
      },
    },
    stats: {
      visits: 152,
      conversions: 23,
      conversionRate: 15.13,
      revenue: 2859.99,
    },
    emptyObject: {},
    nullValue: null,
    booleans: [true, false],
    mixedArray: ["string", 42, true, null, { nested: "value" }],
  });
}
