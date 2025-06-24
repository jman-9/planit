export default function CommonCard(p: { children: React.ReactNode }) {
  return <div className="rounded-2xl p-6 shadow-md dark:shadow-[0_4px_6px_-1px_rgba(192,192,255,0.2),0_2px_4px_-2px_rgba(192,192,255,0.2)]">{p.children}</div>;
}
