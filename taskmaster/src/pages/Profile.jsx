// src/pages/Profile.jsx
import { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase";

const Profile = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    onAuthStateChanged(auth, (u) => {
      setUser(u);
    });
  }, []);

  if (!user) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-xl text-gray-600">Please login to view your profile.</p>
      </div>
    );
  }

  return (
    <div className="max-w-xl mx-auto mt-10 p-6 bg-white shadow-lg rounded-lg">
      <h2 className="text-2xl font-bold mb-4 text-blue-600">User Profile</h2>
      <div className="space-y-3 text-lg">
        <p><span className="font-semibold">Name:</span> {user.displayName || "Not provided"}</p>
        <p><span className="font-semibold">Email:</span> {user.email}</p>
        <p><span className="font-semibold">User ID:</span> {user.uid}</p>
      </div>
    </div>
  );
};

export default Profile;
