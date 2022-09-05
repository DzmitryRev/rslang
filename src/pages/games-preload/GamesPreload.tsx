import { useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';

import PetalButton from '../../components/petal-button/PetalButton';
import { Groups } from '../../store/slices/textbookSlice';
import { availableGroups } from '../../utils/availableGroups';
import { randomNumber } from '../../utils/randomNumber';

type GamesPreloadLocationState = {
  game: 'sprint' | 'audiocall';
};

export default function GamesPreload() {
  const location = useLocation();
  const state = location.state as GamesPreloadLocationState;
  const navigate = useNavigate();
  useEffect(() => {
    if (!state) {
      navigate('/');
    }
  }, [navigate, state]);

  return (
    <div>
      <h2>{state.game}</h2>
      {availableGroups.map((item) => {
        return (
          <Link
            to={`/${state?.game}`}
            state={{ page: randomNumber(0, 30), group: item }}
            key={item}
          >
            <PetalButton shadowColor="blue" size="s">
              {Groups[item]}
            </PetalButton>
          </Link>
        );
      })}
    </div>
  );
}