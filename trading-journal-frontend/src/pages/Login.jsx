
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";

function Login() {

  const navigate = useNavigate();

  const [form, setForm] = useState({
    email: "",
    password: ""
  });

  const handleChange = (e) => {

    setForm({
      ...form,
      [e.target.name]: e.target.value
    });

  };

  const handleLogin = async () => {

    try {

      const response = await api.post("/login", form);

      localStorage.setItem(
        "token",
        response.data.token
      );

      navigate("/dashboard");

    }

    catch (error) {

      alert("Login Failed");

    }

  };

  return (

    <div className="
    min-h-screen
    flex
    items-center
    justify-center
    bg-gradient-to-br
    from-black
    via-purple-950
    to-black
    overflow-hidden">

      {/* Background Blur */}

      <div className="
      absolute
      w-96
      h-96
      bg-purple-600/20
      rounded-full
      blur-3xl
      animate-pulse">

      </div>

      <div className="
      absolute
      right-20
      top-20
      w-80
      h-80
      bg-green-500/20
      rounded-full
      blur-3xl
      animate-pulse">

      </div>


      {/* Login Card */}

      <div className="
      bg-white/10
      backdrop-blur-2xl
      border
      border-white/20
      rounded-3xl
      p-10
      w-[450px]
      shadow-2xl">

        <h1 className="
        text-5xl
        font-bold
        text-center
        mb-3">

          📈 Trade Journal

        </h1>

        <p className="
        text-center
        text-gray-300
        mb-10">

          AI Powered Trading Dashboard

        </p>


        <input
          className="
          w-full
          p-4
          rounded-2xl
          bg-black/30
          mb-5"
          placeholder="Email"
          name="email"
          onChange={handleChange}
        />

        <input
          type="password"
          className="
          w-full
          p-4
          rounded-2xl
          bg-black/30
          mb-8"
          placeholder="Password"
          name="password"
          onChange={handleChange}
        />


        <button
          className="
          bg-green-500
          w-full
          p-4
          rounded-2xl
          text-xl
          font-bold
          hover:scale-105
          duration-300"
          onClick={handleLogin}
        >

          Login

        </button>

        <div className="mt-8 text-center text-gray-400">

          Powered by AI Trading Coach 🤖

        </div>

      </div>

    </div>

  );

}

export default Login;
