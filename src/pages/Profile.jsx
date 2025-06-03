// Profile.jsx
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { motion } from "framer-motion";

const API_BASE = "https://authdb-image.onrender.com/api/users";

const Profile = () => {
  const { id } = useParams();
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    axios
    .get(`${API_BASE}/${id}`)
    .then((res) => {
      console.log("User fetched:", res.data); // DEBUG LOG
      setUser(res.data);
    })
    .catch((error) => console.error(error));
  
  }, [id]);

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/auth");
  };

  if (!user) return <div className="text-white text-center mt-10">Loading...</div>;

  return (
    <div className="relative w-full h-screen overflow-hidden">
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover z-0"
        src="https://res.cloudinary.com/dxpsug2mk/video/upload/v1748928988/Ghim_ca_Jos_Matheus_trn_FUNDOS_nh_ng_Thip_Hnh_pbbqck.mp4"
      />
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-10 p-4">
        <div className="bg-white/10 rounded-xl p-6 shadow-xl w-full max-w-5xl flex flex-col md:flex-row gap-6 text-white">
          <motion.div
            initial={{ x: -100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="flex-shrink-0 w-full md:w-1/2 flex justify-center items-center"
          >
           {user?.image ? (
  <img
    src={`https://authdb-image.onrender.com${user.image}`}
    alt="User"
    className="rounded-2xl w-60 h-60 object-cover border-4 border-white shadow-lg"
  />
) : (
  <div className="w-60 h-60 bg-gray-300 rounded-2xl flex items-center justify-center">
    No Image
  </div>
)}

          </motion.div>

          <motion.div
            initial={{ x: 100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="w-full md:w-1/2 space-y-4"
          >
            <h2 className="text-4xl font-bold text-yellow-300">Welcome, {user.username}!</h2>
            <p>
              <span className="font-semibold text-lg">Biodata:</span> {user.biodata || "Not provided"}
            </p>
            <p>
              <span className="font-semibold text-lg">Job Role:</span> {user.jobRole || "Not provided"}
            </p>
            <button
              onClick={handleLogout}
              className="btn bg-red-500 hover:bg-red-700 text-white font-semibold mt-4"
            >
              Logout
            </button>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
