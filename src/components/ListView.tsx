import { styled } from "styled-components";
import { ListItem } from "../types";
import dayjs from "dayjs";

const ListTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  font-size: 1.6rem;

  th, td {
    border-bottom: 1px solid #eee;
    padding: 0.75rem 1rem;
    text-align: left;
  }

  thead {
    background: #fafafa;
    font-weight: bold;
    font-size: 1.65rem;
  }

  tbody tr:hover {
    background: #f9f9f9;
  }
`;

const IconButton = styled.button`
  font-size: 1rem;
  line-height: 1;
  padding: 0.25rem;
  background: none;
  border: none;
  cursor: pointer;
`;

const ClickableTd = styled.td`
  cursor: pointer;
  &:hover {
    color: #3b82f6;
  }
`;

const StatusBadge = styled.span<{ color: string, backgroundColor: string }>`
  display: inline-flex;
  align-items: center;
  vertical-align: middle;
  padding: 0.05em 0.50em;
  font-size: inherit;
  line-height: 1;
  font-weight: 500;
  border-radius: 9999px;
  background-color: ${({ backgroundColor }) => backgroundColor};
  color: ${({ color }) => color};
`;

const StatusEmoji = styled.span`
  display: inline-block;
  font-size: 1rem;
  background: none;
  border: none;
  margin-right: 0.25em;
  transform: translateY(2px);
`;

export interface ListViewProps {
  list: ListItem[];
  onView: (item: ListItem) => void;
  onEdit: (item: ListItem) => void;
  onDelete: (item: ListItem) => void;
}

function resolveStatus(item: ListItem) {
  if(item.completedAt) {
    return <StatusBadge color="#065f46" backgroundColor="#d1fae5"><StatusEmoji>✅</StatusEmoji> Done</StatusBadge>;
  }
  if(item.startedAt) {
    return <StatusBadge color="#92400e" backgroundColor="#fef3c7"><StatusEmoji>⏳</StatusEmoji> In Progress</StatusBadge>;
  }
  return <StatusBadge color="#374151" backgroundColor="#f3f4f6"><StatusEmoji>📝</StatusEmoji> To Do</StatusBadge>;
}

export default function ListView(props: ListViewProps) {
  return (
    <ListTable>
      <thead>
        <tr>
          <th>Status</th>
          <th>Title</th>
          <th>Created</th>
          <th>Started</th>
          <th>Completed</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {props.list.map((item) => (
          <tr>
            <td>{resolveStatus(item)}</td>
            <ClickableTd onClick={() => props.onView(item)}>{item.title}</ClickableTd>
            <td>{dayjs(item.createdAt).format('YYYY-MM-DD')}</td>
            <td>{item.startedAt}</td>
            <td>{item.completedAt}</td>
            <td>
              <IconButton title="Edit" onClick={() => props.onEdit(item)}>✏️</IconButton>
              <IconButton title="Delete" onClick={() => props.onDelete(item)}>🗑️</IconButton>
            </td>
          </tr>
        ))}
      </tbody>
    </ListTable>
  );
}
