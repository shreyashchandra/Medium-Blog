import logo from "../assets/logo.jpg"; // Ensure correct path
import { Link } from "react-router-dom";
import { userDetailsFun as fetchUserDetails } from "../utils/api.utils";
import { useEffect, useState } from "react";

function AppBar() {
  const handleLogout = () => {
    localStorage.removeItem("token"); // Remove token
    window.location.reload(); // Reload the page
  };

  const [user, setUser] = useState("");

  const fetchUserDetailsLocal = async (token: string) => {
    const res = await fetchUserDetails(token);
    if (res) {
      console.log(res.name);
      setUser(res.name);
    }
  };
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      fetchUserDetailsLocal(token);
    }
  }, []);

  return (
    <div className="flex justify-between  items-center">
      {/* Logo */}
      <Link to={"/"}>
        <img src={logo} alt="logo" className="w-28 h-28" />
      </Link>

      {/* Right-side menu */}
      <div className="flex items-center gap-4 p-10">
        <button className="bg-green-500 hover:bg-green-400 px-3 py-1 rounded-md text-sm text-white">
          New +
        </button>

        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full flex items-center justify-center text-white bg-black">
            {user?.charAt(0)}
          </div>

          <button
            onClick={handleLogout}
            className="bg-red-500 hover:bg-red-400 text-white px-3 py-1 rounded-md text-sm"
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
}

export default AppBar;
