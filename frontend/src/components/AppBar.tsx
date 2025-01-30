/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { X } from "lucide-react";
import logo from "../assets/logo.jpg"; // Ensure correct path
import { userDetailsFun as fetchUserDetails } from "../utils/api.utils";
import { useAuth } from "../hooks/useAuth";
import SearchBar from "./SearchBar";

function AppBar() {
  const [search, setSearch] = useState(false);
  const { isAuthenticated } = useAuth();
  const [user, setUser] = useState("");

  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.reload();
  };

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
  }, [fetchUserDetailsLocal]); // Added fetchUserDetailsLocal to dependencies

  if (search) {
    return (
      <div className="flex justify-between items-center p-5">
        <SearchBar />
        <button
          onClick={() => setSearch(false)}
          className="text-gray-500 hover:text-gray-700"
        >
          <X className="w-6 h-6" />
          <span className="sr-only">Close search</span>
        </button>
      </div>
    );
  }

  return (
    <div className="flex justify-between items-center">
      {/* Logo */}
      <Link to={"/"}>
        <img
          src={logo || "/placeholder.svg"}
          alt="logo"
          className="w-28 h-28"
        />
      </Link>
      <div className="hidden md:block md:w-96">
        <SearchBar />
      </div>
      {/* Right-side menu */}
      {isAuthenticated ? (
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
      ) : (
        <div className="flex items-center gap-10 p-10">
          <button onClick={() => setSearch(true)} className="md:hidden">
            <svg
              className="w-6 h-6 text-gray-500"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 20 20"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
              />
            </svg>
            <span className="sr-only">Open search</span>
          </button>
          <div>
            <Link
              to="/signin"
              className="bg-green-500 hover:bg-green-400 px-4 py-2 rounded-md text-sm text-white"
            >
              Login
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}

export default AppBar;
