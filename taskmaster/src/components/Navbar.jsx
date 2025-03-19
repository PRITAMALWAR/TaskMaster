// src/components/Navbar.jsx
import { Link } from "react-router-dom";
import { getAuth, signOut, onAuthStateChanged } from "firebase/auth";
import { useEffect, useState } from "react";

const Navbar = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const auth = getAuth();
    onAuthStateChanged(auth, (u) => {
      setUser(u);
    });
  }, []);

  const handleLogout = () => {
    const auth = getAuth();
    signOut(auth);
  };

  return (
    <nav className="bg-white shadow-md p-4 flex justify-between items-center">
      <Link to="/" className="text-2xl font-bold text-blue-600">TaskMaster</Link>
      <div className="flex gap-4 items-center">
        <Link to="/">Home</Link>
        {user && <Link to="/profile">Profile</Link>}
        {!user && <Link to="/login" className="text-blue-500">Login</Link>}
        {!user && <Link to="/signup" className="text-blue-500">Signup</Link>}
        {user && (
          <button onClick={handleLogout} className="bg-red-500 text-white px-3 py-1 rounded">
            Logout
          </button>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
