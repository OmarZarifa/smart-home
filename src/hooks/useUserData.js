import { useState } from "react";

const initialUserData = {
  name: "John Doe",
  email: "john.doe@example.com",
  avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=John",
  role: "Home Owner",
  notifications: true,
  darkMode: false,
  language: "English",
  timezone: "UTC-5",
};

export function useUserData() {
  const [userData, setUserData] = useState(initialUserData);

  const updateUserData = (newData) => {
    setUserData(newData);
    // Here you would typically make an API call to update the user data
    console.log("Updating user data:", newData);
  };

  return { userData, updateUserData };
}
