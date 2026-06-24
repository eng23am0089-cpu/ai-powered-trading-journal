
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";

function Settings() {

  const navigate = useNavigate();

  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");

  const logout = () => {

    localStorage.removeItem("token");

    navigate("/");

  };

  const changePassword = async () => {

    try {

      const token = localStorage.getItem("token");

      await api.put(
        "/change-password",
        {
          current_password: currentPassword,
          new_password: newPassword
        },
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      alert("Password Changed Successfully");

      setCurrentPassword("");
      setNewPassword("");

    }

    catch (error) {

      console.log(error);

      alert("Failed To Change Password");

    }

  };

  return (

    <div>

      <Navbar />

      <div className="grid grid-cols-5 gap-8 p-8">

        <div className="col-span-1">

          <Sidebar />

        </div>

        <div className="col-span-4">

          <h1 className="text-5xl font-bold mb-8">

            Settings

          </h1>


          {/* Change Password */}

          <div className="bg-white/10 rounded-3xl p-8 mb-8">

            <h2 className="text-3xl font-bold mb-6">

              Change Password

            </h2>

            <input
              className="
              w-full
              p-4
              rounded-xl
              bg-black/30
              mb-4"
              type="password"
              placeholder="Current Password"
              value={currentPassword}
              onChange={(e) =>
                setCurrentPassword(e.target.value)
              }
            />

            <input
              className="
              w-full
              p-4
              rounded-xl
              bg-black/30
              mb-6"
              type="password"
              placeholder="New Password"
              value={newPassword}
              onChange={(e) =>
                setNewPassword(e.target.value)
              }
            />

            <button
              className="
              bg-blue-500
              px-8
              py-4
              rounded-2xl"
              onClick={changePassword}
            >

              Change Password

            </button>

          </div>


          {/* Logout */}

          <div className="bg-white/10 rounded-3xl p-8">

            <h2 className="text-3xl font-bold mb-6">

              Account

            </h2>

            <button
              className="
              bg-red-500
              px-8
              py-4
              rounded-2xl"
              onClick={logout}
            >

              Logout

            </button>

          </div>

        </div>

      </div>

    </div>

  );

}

export default Settings;

