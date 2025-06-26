import { getStatus, ListItem } from "../types";
import dayjs from "dayjs";


export interface ListViewProps {
  list: ListItem[];
  onView: (item: ListItem) => void;
  onEdit: (item: ListItem) => void;
  onDelete: (item: ListItem) => void;
}


function LvTh({children, className, ...rest}: {children: React.ReactNode, className?: string} & React.ThHTMLAttributes<HTMLTableCellElement>) {
  return <th className={`border-b border-[#eee] text-left px-4 py-3 dark:border-[#555] ${className}`} {...rest}>{children}</th>;
}


function LvTd({children, className, ...rest}: {children: React.ReactNode, className?: string} & React.TdHTMLAttributes<HTMLTableCellElement>) {
  return <td className={`border-b border-[#eee] text-left px-4 py-3 dark:border-[#555] ${className}`} {...rest}>{children}</td>;
}

function LvButton({children, ...rest}: {children: React.ReactNode} & React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return <button className="text-base leading-none px-1 py-1 bg-none border-none cursor-pointer" {...rest}>{children}</button>
}

function StatusBadge(props: { className: string, Emoji: string, text: string }) {
  return (
    <span className={`inline-block items-center justify-center align-middle px-2 py-0 leading-none font-medium rounded-full ${props.className}`}>
      <span className="inline-block translate-y-0.5">
        <span className="inline-block text-base w-6 bg-none border-none">{props.Emoji}</span>
        {props.text}
      </span>
    </span>
  );
}

function resolveStatus(item: ListItem) {
  const status = getStatus(item);
  if(status === 'Done') {
    return <StatusBadge className="text-emerald-800 bg-emerald-100 dark:text-emerald-200 dark:bg-emerald-900" Emoji="✅" text="Done" />;
  }
  if(status === 'In Progress') {
    return <StatusBadge className="text-amber-800 bg-amber-100 dark:text-amber-200 dark:bg-amber-900" Emoji="⏳" text="In Progress" />;
  }
  return <StatusBadge className="text-gray-700 bg-gray-200 dark:text-gray-200 dark:bg-gray-700" Emoji="📝" text="To Do" />;
}

export default function ListView(props: ListViewProps) {
  return (
    <div className="overflow-x-auto">
      <table className="border-collapse text-2xl">
        <thead className="bg-gray-100 font-bold dark:bg-gray-800">
          <tr>
            <LvTh>Status</LvTh>
            <LvTh>Title</LvTh>
            <LvTh>Created</LvTh>
            <LvTh>Started</LvTh>
            <LvTh>Completed</LvTh>
            <LvTh>Actions</LvTh>
          </tr>
        </thead>
        <tbody>
          {props.list.map((item) => (
            <tr className="hover:bg-gray-100 dark:hover:bg-gray-700">
              <LvTd className="whitespace-nowrap">{resolveStatus(item)}</LvTd>
              <LvTd className="whitespace-nowrap truncate max-w-3xs cursor-pointer hover:text-blue-500 dark:hover:text-blue-300" onClick={() => props.onView(item)}>{item.title}</LvTd>
              <LvTd>{dayjs(item.createdAt).format('YYYY-MM-DD')}</LvTd>
              <LvTd>{item.startedAt}</LvTd>
              <LvTd>{item.completedAt}</LvTd>
              <LvTd>
                <LvButton title="Edit" onClick={() => props.onEdit(item)}>✏️</LvButton>
                <LvButton title="Delete" onClick={() => props.onDelete(item)}>🗑️</LvButton>
              </LvTd>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
