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

export interface ListViewProps {
  list: ListItem[];
  onEdit: (item: ListItem) => void;
  onDelete: (item: ListItem) => void;
}

export default function ListView(props: ListViewProps) {
  return (
    <ListTable>
      <thead>
        <tr>
          <th>Status</th>
          <th>Title</th>
          <th>Created At</th>
          <th>Start</th>
          <th>Due</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {props.list.map((item) => (
          <tr>
            <td>{item.status}</td>
            <td>{item.title}</td>
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
