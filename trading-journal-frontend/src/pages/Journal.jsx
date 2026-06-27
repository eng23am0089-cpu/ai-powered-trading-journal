import { useEffect, useState } from "react";
import api from "../services/api";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";

function Journal() {

  const [journal, setJournal] = useState({
    journal_date: "",
    emotion: "",
    mistakes: "",
    lessons: "",
    tomorrow_plan: ""
  });

  const [journals, setJournals] = useState([]);

  const handleChange = (e) => {
    setJournal({
      ...journal,
      [e.target.name]: e.target.value
    });
  };

  const fetchJournals = async () => {

    try {

      const token = localStorage.getItem("token");

      const response = await api.get(
        "/journals",
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      setJournals(response.data);

    }

    catch (error) {

      console.log(error);

    }

  };

  useEffect(() => {

    fetchJournals();

  }, []);

  const saveJournal = async () => {

    try {

      const token = localStorage.getItem("token");

      await api.post(
        "/add-journal",
        journal,
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      alert("Journal Saved Successfully");

      setJournal({
        journal_date: "",
        emotion: "",
        mistakes: "",
        lessons: "",
        tomorrow_plan: ""
      });

      fetchJournals();

    }

    catch (error) {

      console.log(error);

      alert("Failed To Save Journal");

    }

  };

  const deleteJournal = async (id) => {

    const confirmDelete = window.confirm(
      "Are you sure you want to delete this journal?"
    );

    if (!confirmDelete) return;

    try {

      const token = localStorage.getItem("token");

      await api.delete(
        `/delete-journal/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      alert("Journal Deleted Successfully");

      fetchJournals();

    }

    catch (error) {

      console.log(error);

      alert("Failed To Delete Journal");

    }

  };

  return (

    <div>

      <Navbar />

      <div className="grid grid-cols-5 gap-8 p-8">

        <div className="col-span-1">

          <Sidebar />

        </div>

        <div className="col-span-4">

          <h1 className="text-5xl font-bold mb-8">

            Trading Journal

          </h1>

          <div className="bg-white/10 rounded-3xl p-8 space-y-4 mb-10">

            <input
              type="date"
              className="w-full p-4 rounded-xl bg-black/30"
              name="journal_date"
              value={journal.journal_date}
              onChange={handleChange}
            />

            <select
              className="w-full p-4 rounded-xl bg-black/30"
              name="emotion"
              value={journal.emotion}
              onChange={handleChange}
            >

              <option value="">Select Emotion</option>
              <option>😊 Confident</option>
              <option>😐 Neutral</option>
              <option>😰 Fear</option>
              <option>😡 Frustrated</option>

            </select>

            <textarea
              className="w-full p-4 rounded-xl bg-black/30"
              placeholder="Mistakes"
              name="mistakes"
              value={journal.mistakes}
              onChange={handleChange}
            />

            <textarea
              className="w-full p-4 rounded-xl bg-black/30"
              placeholder="Lessons Learned"
              name="lessons"
              value={journal.lessons}
              onChange={handleChange}
            />

            <textarea
              className="w-full p-4 rounded-xl bg-black/30"
              placeholder="Tomorrow Plan"
              name="tomorrow_plan"
              value={journal.tomorrow_plan}
              onChange={handleChange}
            />

            <button
              className="
              bg-green-500
              hover:bg-green-600
              p-4
              rounded-2xl
              w-full
              font-bold"
              onClick={saveJournal}
            >

              Save Journal

            </button>

          </div>

          <h1 className="text-4xl font-bold mb-6">

            Saved Journals

          </h1>

          <div className="space-y-6">

            {

              journals.map((item) => (

                <div
                  key={item.id}
                  className="
                  bg-white/10
                  rounded-3xl
                  p-8">

                  <h2 className="text-2xl font-bold">

                    {item.date}

                  </h2>

                  <p className="mt-3">

                    Emotion : {item.emotion}

                  </p>

                  <p className="mt-3">

                    Mistakes : {item.mistakes}

                  </p>

                  <p className="mt-3">

                    Lessons : {item.lessons}

                  </p>

                  <p className="mt-3">

                    Tomorrow Plan : {item.tomorrow_plan}

                  </p>

                  <button
                    className="
                    mt-6
                    bg-red-600
                    hover:bg-red-700
                    px-6
                    py-2
                    rounded-xl
                    font-bold
                    text-white"
                    onClick={() => deleteJournal(item.id)}
                  >

                    🗑 Delete Journal

                  </button>

                </div>

              ))

            }

          </div>

        </div>

      </div>

    </div>

  );

}

export default Journal;