// const CardBase = styled.div`
//   background: white;
//   border-radius: 1rem;
//   padding: 1.5rem;
//   box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
// `;

//const CommonCard = styled(CardBase)``;

export default function CommonCard(p: { children: React.ReactNode }) {
  return <div className="rounded-2xl p-6 shadow-md dark:shadow-[0_4px_6px_-1px_rgba(192,192,255,0.2),0_2px_4px_-2px_rgba(192,192,255,0.2)]">{p.children}</div>;
}
