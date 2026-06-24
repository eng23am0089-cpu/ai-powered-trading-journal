import { Link } from "react-router-dom";

function Sidebar() {

  return (

    <div className="
      bg-white/10
      rounded-3xl
      p-8
      min-h-screen">

      <h1 className="text-5xl font-bold mb-12">

        Trading Journal

      </h1>

      <div className="space-y-8 text-xl">

        <Link
          to="/dashboard"
          className="block hover:text-green-400"
        >
          🏠 Dashboard
        </Link>

        <Link
          to="/analytics"
          className="block hover:text-green-400"
        >
          📊 Analytics
        </Link>

        <Link
          to="/journal"
          className="block hover:text-green-400"
        >
          📒 Journal
        </Link>

        <Link
          to="/calendar"
          className="block hover:text-green-400"
        >
          📅 Calendar
        </Link>

        <Link
          to="/trades"
          className="block hover:text-green-400"
        >
          📈 Trades
        </Link>

        <Link
          to="/ai"
          className="block hover:text-green-400"
        >
          🤖 AI Recommendation
        </Link>

        <Link
          to="/settings"
          className="block hover:text-green-400"
        >
          ⚙ Settings
        </Link>

      </div>

    </div>

  );

}

export default Sidebar;