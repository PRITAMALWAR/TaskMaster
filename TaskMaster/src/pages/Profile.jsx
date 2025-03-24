import { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase";

const Profile = () => {
  const dummyUser = {
    displayName: "John Doe",
    email: "johndoe@example.com",
    photoURL: "https://randomuser.me/api/portraits/men/32.jpg", 
    metadata: {
      creationTime: "2022-01-15T12:34:56Z",
    },
  };

  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => setLoading(false), 500);

    onAuthStateChanged(auth, (u) => {
      setUser(u || dummyUser);
    });
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen bg-gray-100">
        <div className="spinner-border animate-spin text-indigo-600 w-10 h-10 border-t-4 border-indigo-600 rounded-full"></div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="flex justify-center items-center h-screen bg-gray-100">
        <p className="text-lg text-gray-800 font-medium">Please log in to view your profile.</p>
      </div>
    );
  }

  return (
    <div className="max-w-lg mx-auto mt-30 mb-40 p-8 bg-white rounded-xl shadow-lg border border-gray-300 hover:shadow-2xl transition-all duration-300">
      {/* Profile Header */}
      <div className="flex items-center space-x-6 mb-6">
        {/* User Avatar */}
        <div className="w-24 h-24 rounded-full overflow-hidden border-4 border-indigo-600">
          {user.photoURL ? (
            <img
              src={user.photoURL}
              alt="User Avatar"
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-xl font-semibold text-white bg-indigo-600">
              {user.displayName ? user.displayName.charAt(0) : "N/A"}
            </div>
          )}
        </div>

        <div>
          <h2 className="text-3xl font-bold text-gray-800">{user.displayName || "No Name Provided"}</h2>
          <p className="text-gray-500">{user.email}</p>
        </div>
      </div>

      <div className="mt-6 border-t border-gray-200 pt-4 text-sm text-gray-600">
        <div className="flex justify-between">
          <span className="font-semibold">Account Created:</span>
          <span>{new Date(user.metadata?.creationTime).toLocaleDateString() || "N/A"}</span>
        </div>
      </div>

      <div className="mt-8">
        <button
          onClick={() => auth.signOut()}
          className="w-full px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition duration-300 transform hover:scale-105"
        >
          Log Out
        </button>
      </div>
    </div>
  );
};

export default Profile;
