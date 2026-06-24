
import { useEffect, useState } from "react";
import api from "../services/api";

function ProfileCard() {

  const [stats, setStats] = useState({});

  useEffect(() => {

    const fetchStats = async () => {

      try {

        const token = localStorage.getItem("token");

        const response = await api.get(
          "/stats",
          {
            headers: {
              Authorization: `Bearer ${token}`
            }
          }
        );

        setStats(response.data);

      }

      catch (error) {

        console.log(error);

      }

    };

    fetchStats();

  }, []);

  return (

    <div className="
      bg-gradient-to-br
      from-purple-900
      to-purple-800
      rounded-3xl
      p-8
      shadow-2xl
      border border-purple-600">

      {/* Avatar */}

      <div className="flex justify-center">

        <div className="
          w-24
          h-24
          rounded-full
          bg-green-500
          flex
          items-center
          justify-center
          text-4xl
          font-bold">

          V

        </div>

      </div>


      {/* Name */}

      <h1 className="
        text-3xl
        font-bold
        text-center
        mt-4">

        Vivek TM

      </h1>


      <p className="
        text-center
        text-green-400
        mt-2">

        🟢 Online

      </p>


      {/* Level */}

      <div className="
        bg-black/20
        rounded-2xl
        p-4
        mt-6">

        <h2 className="text-gray-300">

          Trader Level

        </h2>

        <h1 className="
          text-yellow-400
          text-2xl
          font-bold">

          🏆 Profitable Trader

        </h1>

      </div>


      {/* Stats */}

      <div className="
        grid
        grid-cols-2
        gap-4
        mt-6">

        <div className="
          bg-black/20
          rounded-2xl
          p-4
          text-center">

          <h2 className="text-gray-400">

            Win Rate

          </h2>

          <h1 className="
            text-blue-400
            text-3xl
            font-bold">

            {stats.win_rate || 0}%

          </h1>

        </div>


        <div className="
          bg-black/20
          rounded-2xl
          p-4
          text-center">

          <h2 className="text-gray-400">

            Total PnL

          </h2>

          <h1 className="
            text-green-400
            text-3xl
            font-bold">

            ₹{stats.total_pnl || 0}

          </h1>

        </div>

      </div>


      {/* Quote */}

      <div className="
        bg-black/20
        rounded-2xl
        p-5
        mt-6">

        <h2 className="
          text-lg
          text-center
          text-purple-200">

          📈 Keep Following Your Plan

        </h2>

      </div>

    </div>

  );

}

export default ProfileCard;

