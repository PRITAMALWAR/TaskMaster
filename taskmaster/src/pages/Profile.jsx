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
      <div className="flex justify-center items-center h-screen bg-gray-100">
        <p className="text-xl text-gray-600">Please login to view your profile.</p>
      </div>
    );
  }

  return (
    <div className="max-w-sm mx-auto mt-12 p-6 bg-white shadow-md rounded-xl border border-gray-200">
      {/* Profile Header */}
      <div className="flex flex-col items-center space-y-4">
        {/* User Avatar */}
        <div className="w-24 h-24 rounded-full overflow-hidden border-4 border-blue-500 shadow-md">
          <img
            src={user.photoURL || "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTtYzfZQa-6v_PkpQoxUniKgQR-z9pVFWlOHw&s"}
            alt="User Avatar"
            className="w-full h-full object-cover"
          />
        </div>
        {/* User Info */}
        <h2 className="text-2xl font-semibold text-blue-600">{user.displayName || "No Name Provided"}</h2>
        <p className="text-gray-500">{user.email}</p>
      </div>

      {/* Account Creation */}
      <div className="mt-6 text-sm text-gray-600">
        <div className="flex justify-between">
          <span className="font-medium">Account Created:</span>
          <span>{user.metadata.creationTime}</span>
        </div>
      </div>

      {/* Logout Button */}
      <div className="mt-6 text-center">
        <button
          onClick={() => auth.signOut()}
          className="w-full px-6 py-3 bg-red-500 text-white rounded-lg hover:bg-red-600 transition duration-200"
        >
          Log Out
        </button>
      </div>
    </div>
  );
};

export default Profile;
