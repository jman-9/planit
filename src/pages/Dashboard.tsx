import OverviewCard from "../components/OverviewCard";
import RecentListCard from "../components/RecentListCard";
import styled from 'styled-components';

const DashboardContainer = styled.div`
  padding: 2rem;
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 2rem;
`;

const OverviewRow = styled.div`
  display: flex;
  gap: 2rem;
  > * { flex: 1; }
`;

export default function Dashboard() {
  return (
    <DashboardContainer>
      <OverviewRow>        
        <OverviewCard title="To-Do List" progress={[10, 20]} />
        <OverviewCard title="Bucket List" progress={[30, 40]} />   
      </OverviewRow>
      <RecentListCard title="Recent To-Do List" list={["할 일 1", "할 일 2", "할 일 3"]} />
      <RecentListCard title="Recent Bucket List" list={["버킷 리스트 1", "버킷 리스트 2", "버킷 리스트 3"]} />
    </DashboardContainer>
  );
}
