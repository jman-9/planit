import { CommonCard } from "../ui/Card";
import { ListItem } from "../types";
import { Link } from "react-router-dom";
import { styled } from "styled-components";

const ClickableLi = styled.li`
  cursor: pointer;
  &:hover {
    color: #3b82f6;
  }
`;

export default function RecentListCard(props: { title: string, titleLink: string, list: ListItem[], onItemClick: (item: ListItem) => void }) {
  return (
    <CommonCard>
      <h1><Link to={props.titleLink}>{props.title}</Link></h1>
      <ul style={{ listStyle: "none", padding: 0 }}>
        {props.list.map((item) => <ClickableLi key={item.title} onClick={() => props.onItemClick(item)}>{item.title}</ClickableLi>)}
      </ul>
    </CommonCard>
  );
}
