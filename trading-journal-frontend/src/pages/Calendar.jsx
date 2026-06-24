
import { useEffect, useState } from "react";
import api from "../services/api";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";

function Calendar() {

  const [days, setDays] = useState([]);

  useEffect(() => {

    const fetchCalendarData = async () => {

      try {

        const token = localStorage.getItem("token");

        const response = await api.get(
          "/calendar-data",
          {
            headers: {
              Authorization: `Bearer ${token}`
            }
          }
        );

        setDays(response.data);

      }

      catch (error) {

        console.log(error);

      }

    };

    fetchCalendarData();

  }, []);

  const winningDays = days.filter(day => day.pnl > 0).length;

  const losingDays = days.filter(day => day.pnl < 0).length;

  const bestDay =
    days.length > 0
      ? Math.max(...days.map(day => day.pnl))
      : 0;

  const worstDay =
    days.length > 0
      ? Math.min(...days.map(day => day.pnl))
      : 0;

  return (

    <div>

      <Navbar />

      <div className="grid grid-cols-5 gap-8 p-8">

        <div className="col-span-1">

          <Sidebar />

        </div>

        <div className="col-span-4">

          <h1 className="text-5xl font-bold mb-8">

            Trading Calendar

          </h1>

          {/* Statistics */}

          <div className="grid grid-cols-4 gap-6 mb-8">

            <div className="bg-green-500/20 rounded-3xl p-6">

              <h2 className="text-lg text-gray-300">

                Winning Days

              </h2>

              <h1 className="text-4xl font-bold text-green-400 mt-4">

                {winningDays}

              </h1>

            </div>

            <div className="bg-red-500/20 rounded-3xl p-6">

              <h2 className="text-lg text-gray-300">

                Losing Days

              </h2>

              <h1 className="text-4xl font-bold text-red-400 mt-4">

                {losingDays}

              </h1>

            </div>

            <div className="bg-blue-500/20 rounded-3xl p-6">

              <h2 className="text-lg text-gray-300">

                Best Day

              </h2>

              <h1 className="text-4xl font-bold text-blue-400 mt-4">

                ₹{bestDay}

              </h1>

            </div>

            <div className="bg-yellow-500/20 rounded-3xl p-6">

              <h2 className="text-lg text-gray-300">

                Worst Day

              </h2>

              <h1 className="text-4xl font-bold text-yellow-400 mt-4">

                ₹{worstDay}

              </h1>

            </div>

          </div>


          {/* Trade Days */}

          <div className="bg-white/10 rounded-3xl p-10">

            <h2 className="text-3xl font-bold mb-8">

              Trade Days

            </h2>

            <div className="grid grid-cols-5 gap-6">

              {

                days.map((day, index) => (

                  <div
                    key={index}
                    className={`
                      p-6
                      rounded-3xl
                      text-center
                      ${day.pnl >= 0
                        ? "bg-green-500"
                        : "bg-red-500"}
                    `}
                  >

                    <h2>

                      {day.date}

                    </h2>

                    <p className="mt-3">

                      ₹{day.pnl}

                    </p>

                  </div>

                ))

              }

            </div>

          </div>

        </div>

      </div>

    </div>

  );

}

export default Calendar;

