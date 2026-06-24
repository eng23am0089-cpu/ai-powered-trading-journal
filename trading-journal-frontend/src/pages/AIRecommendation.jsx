import { useEffect, useState } from "react";
import api from "../services/api";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";

function AIRecommendation() {

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
  let risk = "";
  let emotion = "";
  let symbol = "BTC";
  let streakWarning = "";

  if ((stats.win_rate || 0) >= 70) {

    recommendation =
      "Excellent performance. Continue current strategy.";

    confidence = 90;

    risk = "Low";

    emotion = "😊 Confident";

  }

  else if ((stats.win_rate || 0) >= 50) {

    recommendation =
      "Good performance. Stay disciplined and avoid overtrading.";

    confidence = 75;

    risk = "Medium";

    emotion = "😐 Neutral";

  }

  else {

    recommendation =
      "Review journal entries and reduce trade frequency.";

    confidence = 60;

    risk = "High";

    emotion = "😰 Fear";

    streakWarning =
      "⚠ Multiple losses detected. Take a break and review your trades.";

  }

  return (

    <div>

      <Navbar />

      <div className="grid grid-cols-5 gap-8 p-8">

        <div className="col-span-1">

          <Sidebar />

        </div>

        <div className="col-span-4">

          <h1 className="text-5xl font-bold mb-8">

            🤖 AI Trade Coach

          </h1>

          <div className="grid grid-cols-2 gap-8">

            {/* Performance */}

            <div className="bg-white/10 rounded-3xl p-8">

              <h2 className="text-3xl font-bold mb-6">

                Performance Analysis

              </h2>

              <p className="mb-4">

                Win Rate :
                <span className="text-blue-400 font-bold">
                  {" "} {stats.win_rate || 0}%
                </span>

              </p>

              <p className="mb-4">

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

            </div>


            {/* Recommendation */}

            <div className="bg-white/10 rounded-3xl p-8">

              <h2 className="text-3xl font-bold mb-6">

                AI Recommendation

              </h2>

              <p>

                {recommendation}

              </p>

            </div>


            {/* Risk */}

            <div className="bg-white/10 rounded-3xl p-8">

              <h2 className="text-3xl font-bold mb-6">

                Risk Level

              </h2>

              <h1 className="text-yellow-400 text-4xl">

                {risk}

              </h1>

            </div>


            {/* Confidence */}

            <div className="bg-white/10 rounded-3xl p-8">

              <h2 className="text-3xl font-bold mb-6">

                Confidence Score

              </h2>

              <h1 className="text-green-400 text-5xl">

                {confidence}%

              </h1>

            </div>


            {/* Emotion */}

            <div className="bg-white/10 rounded-3xl p-8">

              <h2 className="text-3xl font-bold mb-6">

                Emotion Analysis

              </h2>

              <h1 className="text-purple-400 text-3xl">

                {emotion}

              </h1>

            </div>


            {/* Best Symbol */}

            <div className="bg-white/10 rounded-3xl p-8">

              <h2 className="text-3xl font-bold mb-6">

                Best Symbol

              </h2>

              <h1 className="text-blue-400 text-4xl">

                {symbol}

              </h1>

            </div>

          </div>


          {/* Warning */}

          <div className="bg-red-500/20 rounded-3xl p-8 mt-8">

            <h2 className="text-3xl font-bold mb-4">

              AI Warning

            </h2>

            <p>

              {streakWarning || "No warning. Trading performance is stable."}

            </p>

          </div>

        </div>

      </div>

    </div>

  );

}

export default AIRecommendation;