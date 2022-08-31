import { useLocation } from 'react-router-dom';

type SprintLocationState = {
  group: number;
  page: number;
};

export default function Sprint() {
  const location = useLocation();
  const { group, page } = location.state as SprintLocationState;
  return <div>Sprint</div>;
}
