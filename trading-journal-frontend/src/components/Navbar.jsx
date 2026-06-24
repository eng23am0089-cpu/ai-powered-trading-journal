
import { Link, useNavigate } from "react-router-dom";

function Navbar() {

  const navigate = useNavigate();

  const logout = () => {

    localStorage.removeItem("token");

    navigate("/");

  };

  return (

    <div
      className="
      bg-purple-800
      rounded-full
      mx-6
      mt-4
      px-8
      py-4
      flex
      justify-between
      items-center">

      <h1 className="text-3xl font-bold">

        Trading Journal

      </h1>


      <div className="flex gap-12 text-lg font-medium">

        <Link to="/dashboard">

          Dashboard

        </Link>

        <Link to="/trades">

          Trades

        </Link>

        <Link to="/analytics">

          Analytics

        </Link>

      </div>


      <button

        className="
        bg-lime-400
        text-black
        px-6
        py-3
        rounded-full
        font-bold"

        onClick={logout}

      >

        Logout

      </button>

    </div>

  );

}

export default Navbar;

