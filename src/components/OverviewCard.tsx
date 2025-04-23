import { CommonCard } from "./ui/Card";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { Link } from "react-router-dom";


export default function OverviewCard(props: { title: string, titleLink: string, progress: number[] }) {
  return (
    <CommonCard>
      <Link to={props.titleLink}><h1>{props.title}</h1></Link>
      <p>{props.progress[0]} / {props.progress[1]} completed</p>
      <div style={{ margin: "0 auto", width: "120px", height: "120px" }}>
        <CircularProgressbar
          value={props.progress[0] / props.progress[1] * 100}
        text={(props.progress[0] / props.progress[1] * 100) + '%'}
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
