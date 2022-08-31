import { Link, useLocation } from 'react-router-dom';

import PetalButton from '../../components/petal-button/PetalButton';
import { Groups } from '../../store/slices/textbookSlice';

type GamesPreloadLocationState = {
  game: 'sprint' | 'audiocall';
};

export default function GamesPreload() {
  const location = useLocation();
  const {game} = location.state as GamesPreloadLocationState;

  // TODO: make abstract
  const availableGroups = Object.values(Groups).filter((item) => !isNaN(+item)) as number[];

  return (
    <div>
      <h2>{game}</h2>
      {availableGroups.map((item) => {
        return (
          <Link to={`/${game}`} key={item}>
            <PetalButton shadowColor="blue" size="s">
              {Groups[item]}
            </PetalButton>
          </Link>
        );
      })}
    </div>
  );
}
