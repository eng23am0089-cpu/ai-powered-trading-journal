import { useState } from "react";
import api from "../services/api";

function AddTradeModal() {

  const [showModal, setShowModal] = useState(false);

  const [trade, setTrade] = useState({

    trade_date: "",
    symbol: "",
    side: "",
    entry_price: "",
    exit_price: "",
    stop_loss: "",
    take_profit: "",
    lot_size: "",
    notes: ""

  });

  const handleChange = (e) => {

    setTrade({
      ...trade,
      [e.target.name]: e.target.value
    });

  };

  const handleSubmit = async () => {

    try {

      const token = localStorage.getItem("token");

      await api.post(

        "/add-trade",

        trade,

        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }

      );

      alert("Trade Added Successfully");

      setTrade({

        trade_date: "",
        symbol: "",
        side: "",
        entry_price: "",
        exit_price: "",
        stop_loss: "",
        take_profit: "",
        lot_size: "",
        notes: ""

      });

      setShowModal(false);

    }

    catch (error) {

      console.log(error);

      alert("Failed to Add Trade");

    }

  };

  return (

    <>

      {/* Floating Button */}

      <button

        className="
        fixed
        bottom-10
        right-10
        bg-green-500
        w-16
        h-16
        rounded-full
        text-4xl
        shadow-2xl
        hover:scale-110"

        onClick={() => setShowModal(true)}

      >

        +

      </button>


      {/* Modal */}

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

                Add Trade

              </h1>

              <input
                className="w-full p-3 rounded-xl bg-black/30"
                placeholder="Trade Date (YYYY-MM-DD)"
                name="trade_date"
                value={trade.trade_date}
                onChange={handleChange}
              />

              <input
                className="w-full p-3 rounded-xl bg-black/30"
                placeholder="Symbol"
                name="symbol"
                value={trade.symbol}
                onChange={handleChange}
              />

              <input
                className="w-full p-3 rounded-xl bg-black/30"
                placeholder="Side (BUY / SELL)"
                name="side"
                value={trade.side}
                onChange={handleChange}
              />

              <input
                className="w-full p-3 rounded-xl bg-black/30"
                placeholder="Entry Price"
                name="entry_price"
                value={trade.entry_price}
                onChange={handleChange}
              />

              <input
                className="w-full p-3 rounded-xl bg-black/30"
                placeholder="Exit Price"
                name="exit_price"
                value={trade.exit_price}
                onChange={handleChange}
              />

              <input
                className="w-full p-3 rounded-xl bg-black/30"
                placeholder="Stop Loss"
                name="stop_loss"
                value={trade.stop_loss}
                onChange={handleChange}
              />

              <input
                className="w-full p-3 rounded-xl bg-black/30"
                placeholder="Take Profit"
                name="take_profit"
                value={trade.take_profit}
                onChange={handleChange}
              />

              <input
                className="w-full p-3 rounded-xl bg-black/30"
                placeholder="Lot Size"
                name="lot_size"
                value={trade.lot_size}
                onChange={handleChange}
              />

              <textarea
                className="w-full p-3 rounded-xl bg-black/30"
                placeholder="Notes"
                name="notes"
                value={trade.notes}
                onChange={handleChange}
              />

              <button

                className="
                bg-green-500
                w-full
                p-4
                rounded-2xl
                hover:bg-green-600"

                onClick={handleSubmit}

              >

                Save Trade

              </button>

            </div>

          </div>

        )

      }

    </>

  );

}

export default AddTradeModal;

