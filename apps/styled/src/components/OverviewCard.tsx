import { CommonCard } from "../ui/Card";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { Link } from "react-router-dom";


export default function OverviewCard(p: { title: string, titleLink: string, done: number, total: number }) {
  return (
    <CommonCard>
      <h1><Link to={p.titleLink}>{p.title}</Link></h1>
      <p>{p.done} / {p.total} completed</p>
      <div style={{ margin: "0 auto", width: "120px", height: "120px" }}>
        <CircularProgressbar
          value={p.total !== 0 ? p.done / p.total * 100 : 0}
          text={p.total !== 0 ? Math.round(p.done / p.total * 100) + '%' : '-'}
        styles={buildStyles({
          pathColor: "#4caf50",
          textColor: "#333",
          trailColor: "#eee",
          textSize: "30px",
          })}
        />
      </div>
    </CommonCard>
  );
}
