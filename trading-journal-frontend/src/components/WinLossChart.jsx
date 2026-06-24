import { PieChart, Pie, Cell, Tooltip, Legend } from "recharts";
import { useEffect, useState } from "react";
import api from "../services/api";

function WinLossChart() {

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

  const data = [
    {
      name: "Winning Trades",
      value: stats.winning_trades || 0
    },
    {
      name: "Losing Trades",
      value: stats.losing_trades || 0
    }
  ];

  const COLORS = ["#2bc764", "#eb2525"];

  return (

    <div
      className="
      bg-white/10
      rounded-3xl
      p-8
      shadow-2xl
      border border-purple-700"
    >

      <h2 className="text-3xl font-bold mb-8">

        Win vs Loss

      </h2>

      <div className="flex justify-center">

        <PieChart width={320} height={320}>

          <Pie
            data={data}
            cx="50%"
            cy="50%"
            outerRadius={100}
            innerRadius={55}
            dataKey="value"
            label={({ percent }) =>
              `${(percent * 100).toFixed(0)}%`
            }
          >

            {
              data.map((entry, index) => (

                <Cell
                  key={index}
                  fill={COLORS[index]}
                />

              ))
            }

          </Pie>

          <Tooltip />

          <Legend
            wrapperStyle={{
              color: "#ffffff",
              fontSize: "15px",
              paddingTop: "20px"
            }}
          />

        </PieChart>

      </div>

      <div className="flex justify-center gap-10 mt-4">

        <div className="text-center">

          <h1 className="text-green-500 text-4xl font-bold">

            {stats.winning_trades || 0}

          </h1>

          <p className="text-gray-500">

            Winning

          </p>

        </div>

        <div className="text-center">

          <h1 className="text-red-500 text-4xl font-bold">

            {stats.losing_trades || 0}

          </h1>

          <p className="text-gray-500">

            Losing

          </p>

        </div>

      </div>

    </div>

  );

}

export default WinLossChart;