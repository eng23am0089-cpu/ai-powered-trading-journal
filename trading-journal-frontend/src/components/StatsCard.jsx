function StatsCard({ title, value }) {

  return (
    <div className="
    bg-white/10
    backdrop-blur-lg
    rounded-3xl
    p-8
    shadow-2xl
    hover:scale-105
    duration-300
    ">

      <h2 className="text-gray-300 text-lg">
        {title}
      </h2>

      <h1 className="text-4xl font-bold mt-4">
        {value}
      </h1>

    </div>
  );

}

export default StatsCard;