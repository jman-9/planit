// const CardBase = styled.div`
//   background: white;
//   border-radius: 1rem;
//   padding: 1.5rem;
//   box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
// `;

//const CommonCard = styled(CardBase)``;

export default function CommonCard(p: { children: React.ReactNode }) {
  return <div className="bg-white rounded-2xl p-6 shadow-md">{p.children}</div>;
}
