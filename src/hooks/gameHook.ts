import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

type GamesLocationState = {
  group: number;
  page: number;
};

export function useGame() {
  const location = useLocation();
  const state = location.state as GamesLocationState;
  const navigate = useNavigate();
  useEffect(() => {
    if (!state) {
      navigate('/');
    }
  }, [navigate, state]);
  

  return [state];
}
