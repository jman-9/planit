import { BucketApi } from "../api/bucketApi";
import { TodoApi } from "../api/todoApi";
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
  const todoTotalCount = TodoApi.getItemCount();
  const bucketTotalCount = BucketApi.getItemCount();

  const todoCompletedCount = TodoApi.getItemCount('completed');
  const bucketCompletedCount = BucketApi.getItemCount('completed');
  
  const recentTodoList = TodoApi.getList().slice(0, 3);
  const recentBucketList = BucketApi.getList().slice(0, 3);

  return (
    <DashboardContainer>
      <OverviewRow>        
        <OverviewCard title="To-Do List" titleLink="/todo" progress={[todoCompletedCount, todoTotalCount]} />
        <OverviewCard title="Bucket List" titleLink="/bucket" progress={[bucketCompletedCount, bucketTotalCount]} />   
      </OverviewRow>
      <RecentListCard title="Recent To-Do List" titleLink="/todo" list={recentTodoList} />
      <RecentListCard title="Recent Bucket List" titleLink="/bucket" list={recentBucketList} />
    </DashboardContainer>
  );
}
