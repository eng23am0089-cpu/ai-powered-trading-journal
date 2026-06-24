import { useState } from "react";
import api from "../services/api";

function EditTradeModal({ trade, fetchTrades }) {

  const [showModal, setShowModal] = useState(false);

  const [formData, setFormData] = useState(trade);

  const handleChange = (e) => {

    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });

  };

  const updateTrade = async () => {

    try {

      const token = localStorage.getItem("token");

      await api.put(

        `/trade/${trade.id}`,

        formData,

        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }

      );

      fetchTrades();

      setShowModal(false);

    }

    catch (error) {

      console.log(error);

    }

  };

  return (

    <>

      <button
        className="
        bg-blue-600
        px-4
        py-2
        rounded-xl"

        onClick={() => setShowModal(true)}
      >

        ✏️

      </button>


      {

        showModal && (

          <div className="
          fixed
          inset-0
          bg-black/60
          flex
          justify-center
          items-center">

            <div className="
            bg-[#170022]
            p-8
            rounded-3xl
            w-[500px]
            space-y-4">

              <h1 className="text-3xl font-bold">

                Edit Trade

              </h1>

              <input
                className="w-full p-3 rounded-xl bg-black/30"
                name="symbol"
                value={formData.symbol}
                onChange={handleChange}
              />

              <input
                className="w-full p-3 rounded-xl bg-black/30"
                name="side"
                value={formData.side}
                onChange={handleChange}
              />

              <input
                className="w-full p-3 rounded-xl bg-black/30"
                name="entry_price"
                value={formData.entry_price}
                onChange={handleChange}
              />

              <input
                className="w-full p-3 rounded-xl bg-black/30"
                name="exit_price"
                value={formData.exit_price}
                onChange={handleChange}
              />

              <input
                className="w-full p-3 rounded-xl bg-black/30"
                name="pnl"
                value={formData.pnl}
                onChange={handleChange}
              />

              <textarea
                className="w-full p-3 rounded-xl bg-black/30"
                name="notes"
                value={formData.notes}
                onChange={handleChange}
              />

              <button
                className="
                bg-green-500
                w-full
                p-4
                rounded-2xl"

                onClick={updateTrade}
              >

                Update Trade

              </button>

            </div>

          </div>

        )

      }

    </>

  );

}

export default EditTradeModal;