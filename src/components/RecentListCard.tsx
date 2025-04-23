import { CommonCard } from "../ui/Card";
import { ListItem } from "../types";
import { Link } from "react-router-dom";

export default function RecentListCard(props: { title: string, titleLink: string, list: ListItem[] }) {
  return (
    <CommonCard>
      <h1><Link to={props.titleLink}>{props.title}</Link></h1>
      <ul style={{ listStyle: "none", padding: 0 }}>
        {props.list.map((item) => <li key={item.title}>{item.title}</li>)}
      </ul>
    </CommonCard>
  );
}
