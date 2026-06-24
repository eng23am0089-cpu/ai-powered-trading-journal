import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

function CircularMetricCard({
  title,
  value,
  percentage,
  subtitle,
  color,
  badge
}) {
  return (
    <div className="
    bg-white/5
    border border-purple-700
    shadow-purple-900
    backdrop-blur-xl
    rounded-3xl
    p-8
    shadow-2xl
    border border-purple-900
    hover:scale-105
    duration-300">

      <div className="flex justify-between items-center">

        <h2 className="text-2xl font-bold">
          {title}
        </h2>

        <div className="
        bg-purple-900
        px-4 py-2
        rounded-xl
        text-sm">
          {badge}
        </div>

      </div>

      <div className="w-48 h-48 mx-auto mt-8">

        <CircularProgressbar
          value={percentage}
          text={`${value}`}
          styles={{
            path: {
              stroke: color
            },
            trail: {
              stroke: "#232323"
            },
            text: {
              fill: "white",
              fontSize: "16px"
            }
          }}
        />

      </div>

      <div className="text-center mt-8">

        <h1 className="text-4xl font-bold">
          {subtitle}
        </h1>

      </div>

    </div>
  );
}

export default CircularMetricCard;