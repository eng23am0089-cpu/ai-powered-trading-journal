import { useEffect, useState } from "react";
import api from "../services/api";

function AITradeCoach() {

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

  let recommendation = "";
  let confidence = 50;

  if ((stats.win_rate || 0) >= 70) {

    recommendation =
      "Excellent performance. Continue your current strategy.";

    confidence = 90;

  }

  else if ((stats.win_rate || 0) >= 50) {

    recommendation =
      "Good performance. Reduce risk and stay disciplined.";

    confidence = 75;

  }

  else {

    recommendation =
      "Take fewer trades and review your journal before entering.";

    confidence = 60;

  }

  return (

    <div className="
      bg-white/10
      rounded-3xl
      p-8
      shadow-2xl
      border border-purple-700">

      <h1 className="text-3xl font-bold mb-6">

        🤖 AI Trade Coach

      </h1>

      <div className="space-y-4">

        <p>
          Current Win Rate :
          <span className="text-blue-400 font-bold">
            {" "} {stats.win_rate || 0}%
          </span>
        </p>

        <p>
          Total Trades :
          <span className="text-purple-300 font-bold">
            {" "} {stats.total_trades || 0}
          </span>
        </p>

        <p>
          Winning Trades :
          <span className="text-green-400 font-bold">
            {" "} {stats.winning_trades || 0}
          </span>
        </p>

        <p>
          Losing Trades :
          <span className="text-red-400 font-bold">
            {" "} {stats.losing_trades || 0}
          </span>
        </p>

        <div className="
          bg-black/20
          rounded-2xl
          p-5
          mt-6">

          <h2 className="text-xl font-bold mb-3">

            Recommendation

          </h2>

          <p>

            {recommendation}

          </p>

        </div>

        <h2 className="text-green-400 text-2xl font-bold mt-6">

          Confidence Score : {confidence}%

        </h2>

      </div>

    </div>

  );

}

export default AITradeCoach;