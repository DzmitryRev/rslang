import { useLocation } from 'react-router-dom';

type SprintLocationState = {
  group: number;
  page: number;
};

type SprintProps = {
  isAuth: boolean;
};

export default function Sprint({ isAuth }: SprintProps) {
  const location = useLocation();
  const { group, page } = location.state as SprintLocationState;
  return <div>Sprint</div>;
}
