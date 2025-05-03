import { CommonCard } from "../ui/Card";
import { getStatus, ListItem, ListItemStatus } from "../types";
import { Link } from "react-router-dom";
import { styled } from "styled-components";
import dayjs from "dayjs";
import relativeTime from 'dayjs/plugin/relativeTime';

const ClickableLi = styled.li`
  cursor: pointer;
  &:hover {
    color: #3b82f6;
  }
`;

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
      <ul style={{ listStyle: "none", padding: 0 }}>
        {props.list.map((item) => <ClickableLi key={item.title} onClick={() => props.onItemClick(item)}>{RenderRow(item)}</ClickableLi>)}
      </ul>
    </CommonCard>
  );
}
