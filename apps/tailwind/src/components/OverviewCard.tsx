import CommonCard from "../ui/Card";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { Link } from "react-router-dom";


export default function OverviewCard(p: { title: string, titleLink: string, done: number, total: number }) {
  const isDark = document.documentElement.classList.contains("dark");
  return (
    <CommonCard>
      <h2><Link to={p.titleLink}>{p.title}</Link></h2>
      <p>{p.done} / {p.total} completed</p>
      <div className="mx-auto w-32 h-32">
        <CircularProgressbar
          value={p.total !== 0 ? p.done / p.total * 100 : 0}
          text={p.total !== 0 ? Math.round(p.done / p.total * 100) + '%' : '-'}
          styles={buildStyles({
            pathColor: "#4caf50",
            textColor: isDark ? "#eee" : "#333",
            trailColor: isDark ? "#666" : "#eee",
            textSize: "30px",
            })}
        />
      </div>
    </CommonCard>
  );
}
