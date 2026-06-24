import { useEffect, useState } from "react";
import api from "../services/api";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer
} from "recharts";

function PnlChart() {

  const [chartData, setChartData] = useState([]);

  useEffect(() => {

    const fetchTrades = async () => {

      try {

        const token = localStorage.getItem("token");

        const response = await api.get("/trades", {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });

        let cumulativePnl = 0;

        const data = response.data.map((trade, index) => {

          cumulativePnl += trade.pnl;

          return {
            trade: index + 1,
            pnl: cumulativePnl
          };

        });

        setChartData(data);

      }

      catch (error) {

        console.log(error);

      }

    };

    fetchTrades();

  }, []);

  return (

    <div className="
    bg-white/5
    backdrop-blur-xl
    rounded-3xl
    p-8
    border border-purple-800
    shadow-2xl">

      <h2 className="text-3xl font-bold mb-8">

        Equity Curve

      </h2>

      <ResponsiveContainer width="100%" height={300}>

        <LineChart data={chartData}>

          <CartesianGrid stroke="#333" />

          <XAxis dataKey="trade" />

          <YAxis />

          <Tooltip />

          <Line
            type="monotone"
            dataKey="pnl"
            stroke="#22c55e"
            strokeWidth={4}
          />

        </LineChart>

      </ResponsiveContainer>

    </div>

  );

}

export default PnlChart;