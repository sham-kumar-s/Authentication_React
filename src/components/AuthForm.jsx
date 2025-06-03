// AuthForm.jsx
import { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const API_BASE = "https://authdb-image.onrender.com/api/users";

const AuthForm = () => {
  const [isLogin, setIsLogin] = useState(false);
  const [form, setForm] = useState({
    username: "",
    password: "",
    biodata: "",
    jobRole: "",
  });
  const [image, setImage] = useState(null);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isLogin) {
        const res = await axios.post(`${API_BASE}/login`, {
          username: form.username,
          password: form.password,
        });
        localStorage.setItem("user", JSON.stringify(res.data.user));
        navigate(`/profile/${res.data.user._id}`);
      } else {
        const formData = new FormData();
        formData.append("username", form.username);
        formData.append("password", form.password);
        formData.append("biodata", form.biodata);
        formData.append("jobRole", form.jobRole);
        if (image) formData.append("image", image);

        await axios.post(`${API_BASE}/`, formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });

        alert("Registered successfully! Please login.");
        setIsLogin(true);
        setForm({ username: "", password: "", biodata: "", jobRole: "" });
        setImage(null);
      }
    } catch (error) {
      console.error("Error:", error);
      alert(error.response?.data?.message || "Something went wrong");
    }
  };

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
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm flex justify-center items-center z-10">
        <div className="bg-white/20 p-10 rounded-xl shadow-xl w-full max-w-md text-white">
          <h2 className="text-3xl font-bold text-center mb-6">
            {isLogin ? "Login" : "Register"}
          </h2>
          <form
            onSubmit={handleSubmit}
            encType="multipart/form-data"
            className="space-y-4"
          >
            <input
              type="text"
              name="username"
              placeholder="Username"
              value={form.username}
              onChange={handleChange}
              required
              className="input input-bordered w-full text-black text-lg"
            />
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={form.password}
              onChange={handleChange}
              required
              className="input input-bordered w-full text-black text-lg"
            />
            {!isLogin && (
              <>
                <input
                  type="text"
                  name="biodata"
                  placeholder="Biodata"
                  value={form.biodata}
                  onChange={handleChange}
                  className="input input-bordered w-full text-black text-lg"
                />
                <input
                  type="text"
                  name="jobRole"
                  placeholder="Job Role"
                  value={form.jobRole}
                  onChange={handleChange}
                  className="input input-bordered w-full text-black text-lg"
                />
                <input
                  type="file"
                  name="image"
                  accept="image/*"
                  onChange={handleFileChange}
                  className="file-input file-input-bordered w-full text-black"
                />
              </>
            )}

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              type="submit"
              className="btn w-full text-white text-xl font-semibold bg-gradient-to-r from-purple-700 to-pink-500 border-0 hover:opacity-90"
            >
              {isLogin ? "Login" : "Register"}
            </motion.button>
          </form>

          <p className="mt-4 text-center">
            {isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
            <button
              onClick={() => setIsLogin(!isLogin)}
              className="text-yellow-300 underline hover:text-white"
            >
              {isLogin ? "Register here" : "Login here"}
            </button>
          </p>

          <div className="text-center mt-2">
            <Link to="/contact" className="text-blue-200 hover:underline">
              Contact
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthForm;
