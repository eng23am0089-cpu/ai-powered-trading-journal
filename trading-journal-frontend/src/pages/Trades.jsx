
import { useEffect, useState } from "react";
import api from "../services/api";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import TradeTable from "../components/TradeTable";

function Trades() {

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

          {/* Heading */}

          <div className="mb-8">

            <h1 className="text-5xl font-bold">

              Trades

            </h1>

            <p className="text-purple-200 mt-2">

              Manage and analyze all your trades

            </p>

          </div>


          {/* Summary Cards */}

          <div className="grid grid-cols-4 gap-6 mb-8">

            <div className="bg-white/10 rounded-3xl p-6">

              <h2 className="text-lg text-gray-300">

                Total Trades

              </h2>

              <h1 className="text-4xl font-bold mt-4">

                {stats.total_trades || 0}

              </h1>

            </div>


            <div className="bg-green-500/20 rounded-3xl p-6">

              <h2 className="text-lg text-gray-300">

                Winning Trades

              </h2>

              <h1 className="text-4xl font-bold mt-4 text-green-400">

                {stats.winning_trades || 0}

              </h1>

            </div>


            <div className="bg-red-500/20 rounded-3xl p-6">

              <h2 className="text-lg text-gray-300">

                Losing Trades

              </h2>

              <h1 className="text-4xl font-bold mt-4 text-red-400">

                {stats.losing_trades || 0}

              </h1>

            </div>


            <div className="bg-blue-500/20 rounded-3xl p-6">

              <h2 className="text-lg text-gray-300">

                Total PnL

              </h2>

              <h1 className="text-4xl font-bold mt-4 text-blue-400">

                ₹{stats.total_pnl || 0}

              </h1>

            </div>

          </div>


          {/* Search + Filter */}

          <div className="flex gap-4 mb-8">

            <input
              className="
              bg-white/10
              rounded-2xl
              p-4
              w-96"
              placeholder="Search Symbol..."
            />

            <select
              className="
              bg-white/10
              rounded-2xl
              p-4"
            >

              <option>All</option>
              <option>BUY</option>
              <option>SELL</option>

            </select>

          </div>


          {/* Trade Table */}

          <TradeTable />

        </div>

      </div>

    </div>

  );

}

export default Trades;
