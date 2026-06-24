import { useEffect, useState } from "react";
import api from "../services/api";
import EditTradeModal from "./EditTradeModal";

function TradeTable() {

  const [trades, setTrades] = useState([]);

  const fetchTrades = async () => {

    try {

      const token = localStorage.getItem("token");

      const response = await api.get("/trades", {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      setTrades(response.data);

    }

    catch (error) {

      console.log(error);

    }

  };

  useEffect(() => {

    fetchTrades();

  }, []);

  const deleteTrade = async (tradeId) => {

    try {

      const token = localStorage.getItem("token");

      await api.delete(`/trade/${tradeId}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      fetchTrades();

    }

    catch (error) {

      console.log(error);

    }

  };

  return (

    <div
      className="
      bg-white/5
      backdrop-blur-xl
      rounded-3xl
      p-8
      shadow-2xl
      border border-purple-800"
    >

      <h2 className="text-3xl font-bold mb-8">

        Recent Trades

      </h2>

      <table className="w-full">

        <thead>

          <tr className="text-purple-300">

            <th>Symbol</th>

            <th>Side</th>

            <th>Entry</th>

            <th>Exit</th>

            <th>PnL</th>

            <th>Edit</th>

            <th>Delete</th>

          </tr>

        </thead>

        <tbody>

          {

            trades.map((trade) => (

              <tr
                key={trade.id}
                className="
                text-center
                h-16
                border-t
                border-purple-900"
              >

                <td>{trade.symbol}</td>

                <td>{trade.side}</td>

                <td>{trade.entry_price}</td>

                <td>{trade.exit_price}</td>

                <td
                  className={
                    trade.pnl >= 0
                      ? "text-green-400"
                      : "text-red-400"
                  }
                >

                  ₹{trade.pnl}

                </td>


                {/* Edit */}

                <td>

                  <EditTradeModal
                    trade={trade}
                    fetchTrades={fetchTrades}
                  />

                </td>


                {/* Delete */}

                <td>

                  <button

                    className="
                    bg-red-600
                    hover:bg-red-700
                    px-4
                    py-2
                    rounded-xl"

                    onClick={() => deleteTrade(trade.id)}

                  >

                    ❌

                  </button>

                </td>

              </tr>

            ))

          }

        </tbody>

      </table>

    </div>

  );

}

export default TradeTable;