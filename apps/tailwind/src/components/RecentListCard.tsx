import CommonCard from "../ui/Card";
import { getStatus, ListItem, ListItemStatus } from "../types";
import { Link } from "react-router-dom";
import dayjs from "dayjs";
import relativeTime from 'dayjs/plugin/relativeTime';

function getEmoji(status: ListItemStatus) {
  if(status === 'Done') {
    return '✅';
  }
  if(status === 'In Progress') {
    return '⏳';
  }
  return '📝';
}

function RenderRow(item: ListItem) {
  return <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
    <span style={{ flex: 1 }}>{item.title}</span>
    <span style={{ flex: 1 }}><span style={{ display: 'inline-block', fontSize: '1.2rem', width: '2.0rem'}}>{getEmoji(getStatus(item))}</span>{getStatus(item)}</span>
    <span style={{ flex: 1 }}>created {dayjs(item.createdAt).fromNow()}</span>
  </div>
}

export default function RecentListCard(props: { title: string, titleLink: string, list: ListItem[], onItemClick: (item: ListItem) => void }) {
  dayjs.extend(relativeTime);
  return (
    <CommonCard>
      <h1><Link to={props.titleLink}>{props.title}</Link></h1>
      <ul className="list-none p-0">
        {props.list.map((item) => <li className="cursor-pointer hover:text-blue-500" key={item.title} onClick={() => props.onItemClick(item)}>{RenderRow(item)}</li>)}
      </ul>
    </CommonCard>
  );
}
