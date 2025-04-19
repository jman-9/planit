import { CommonCard } from "./ui/Card";

export default function RecentListCard(props: { title: string, list: string[] }) {
  return (
    <CommonCard>
      <h1>{props.title}</h1>
      <ul style={{ listStyle: "none", padding: 0 }}>
        {props.list.map((item) => <li key={item}>{item}</li>)}
      </ul>
    </CommonCard>
  );
}
