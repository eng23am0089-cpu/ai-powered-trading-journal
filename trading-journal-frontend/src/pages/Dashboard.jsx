import { useEffect, useState } from "react";
import api from "../services/api";

import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import WelcomeCard from "../components/WelcomeCard";
import CircularMetricCard from "../components/CircularMetricCard";
import PnlChart from "../components/PnlChart";
import ProfileCard from "../components/ProfileCard";
import TradeTable from "../components/TradeTable";
import WinLossChart from "../components/WinLossChart";
import AddTradeModal from "../components/AddTradeModal";
import AITradeCoach from "../components/AITradeCoach";

function Dashboard() {

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


        {/* Main Content */}

        <div className="col-span-4">

          <WelcomeCard />



          {/* Metric Cards */}

          <div className="grid grid-cols-2 gap-8 mt-8">

            <CircularMetricCard
              title="Total PnL"
              value={`₹${stats.total_pnl || 0}`}
              percentage={75}
              subtitle="Overall Profit"
              color="#22c55e"
              badge="PROFIT"
            />

            <CircularMetricCard
              title="Win Rate"
              value={`${stats.win_rate || 0}%`}
              percentage={stats.win_rate || 0}
              subtitle="Performance"
              color="#3b82f6"
              badge="WIN RATE"
            />

            <CircularMetricCard
              title="Total Trades"
              value={stats.total_trades || 0}
              percentage={80}
              subtitle="All Trades"
              color="#a855f7"
              badge="TRADES"
            />

            <CircularMetricCard
              title="Winning Trades"
              value={stats.winning_trades || 0}
              percentage={90}
              subtitle="Successful"
              color="#22c55e"
              badge="WINS"
            />

          </div>



          {/* PnL Chart + Profile */}

          <div className="grid grid-cols-3 gap-8 mt-8">

            <div className="col-span-2">

              <PnlChart />

            </div>

            <div>

              <ProfileCard />

            </div>

          </div>



          {/* Trade Table + Win Loss */}

          <div className="grid grid-cols-3 gap-8 mt-8">

            <div className="col-span-2">

              <TradeTable />

            </div>

            <div>

              <WinLossChart />

            </div>

          </div>



          {/* AI Trade Coach */}

          <div className="mt-8">

            <AITradeCoach />

          </div>



          {/* Floating Add Trade Button */}

          <AddTradeModal />

        </div>

      </div>

    </div>

  );

}

export default Dashboard;