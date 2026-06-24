
import { useEffect, useState } from "react";
import api from "../services/api";

import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import PnlChart from "../components/PnlChart";
import WinLossChart from "../components/WinLossChart";

function Analytics() {

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

    <div>

      <Navbar />

      <div className="grid grid-cols-5 gap-8 p-8">

        {/* Sidebar */}

        <div className="col-span-1">

          <Sidebar />

        </div>


        {/* Main */}

        <div className="col-span-4">

          <h1 className="text-5xl font-bold mb-8">

            Analytics

          </h1>


          {/* Top Cards */}

          <div className="grid grid-cols-4 gap-8">

            <div className="bg-white/10 rounded-3xl p-8">

              <h2 className="text-gray-300">

                Total Trades

              </h2>

              <h1 className="text-5xl font-bold mt-4">

                {stats.total_trades || 0}

              </h1>

            </div>

            <div className="bg-white/10 rounded-3xl p-8">

              <h2 className="text-gray-300">

                Win Rate

              </h2>

              <h1 className="text-5xl text-blue-400 font-bold mt-4">

                {stats.win_rate || 0}%

              </h1>

            </div>

            <div className="bg-white/10 rounded-3xl p-8">

              <h2 className="text-gray-300">

                Winning Trades

              </h2>

              <h1 className="text-5xl text-green-400 font-bold mt-4">

                {stats.winning_trades || 0}

              </h1>

            </div>

            <div className="bg-white/10 rounded-3xl p-8">

              <h2 className="text-gray-300">

                Losing Trades

              </h2>

              <h1 className="text-5xl text-red-400 font-bold mt-4">

                {stats.losing_trades || 0}

              </h1>

            </div>

          </div>


          {/* Charts */}

          <div className="grid grid-cols-2 gap-8 mt-8">

            <PnlChart />

            <WinLossChart />

          </div>


          {/* Bottom Cards */}

          <div className="grid grid-cols-2 gap-8 mt-8">

            <div className="bg-white/10 rounded-3xl p-8">

              <h2 className="text-3xl font-bold mb-6">

                🔥 Trading Streak

              </h2>

              <h1 className="text-6xl font-bold text-orange-400">

                {stats.trading_streak || 0} Days

              </h1>

            </div>


            <div className="bg-white/10 rounded-3xl p-8">

              <h2 className="text-3xl font-bold mb-6">

                🏆 Best Trade

              </h2>

              <h1 className="text-6xl font-bold text-green-400">

                ₹{stats.best_trade || 0}

              </h1>

            </div>

          </div>


          <div className="grid grid-cols-2 gap-8 mt-8">

            <div className="bg-white/10 rounded-3xl p-8">

              <h2 className="text-3xl font-bold mb-6">

                📉 Worst Trade

              </h2>

              <h1 className="text-6xl font-bold text-red-400">

                ₹{stats.worst_trade || 0}

              </h1>

            </div>


            <div className="bg-white/10 rounded-3xl p-8">

              <h2 className="text-3xl font-bold mb-6">

                📅 Monthly Performance

              </h2>

              <h1 className="text-6xl font-bold text-blue-400">

                ₹{stats.monthly_pnl || 0}

              </h1>

            </div>

          </div>


          {/* AI Insight */}

          <div className="bg-white/10 rounded-3xl p-8 mt-8">

            <h2 className="text-3xl font-bold mb-6">

              🤖 AI Insight

            </h2>

            <p className="text-xl text-gray-300">

              {

                stats.win_rate >= 70

                  ? "Excellent performance. Continue your current strategy."

                  : stats.win_rate >= 50

                  ? "Good performance. Reduce risk and stay disciplined."

                  : "Review your trades and avoid overtrading."

              }

            </p>

          </div>

        </div>

      </div>

    </div>

  );

}

export default Analytics;

