import { useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';

import PetalButton from '../../components/petal-button/PetalButton';
import { Groups } from '../../store/slices/textbookSlice';
import { availableGroups } from '../../utils/availableGroups';
import { randomNumber } from '../../utils/randomNumber';

import styles from './GamePreload.module.css';

type GamesPreloadLocationState = {
  game: 'Спринт' | 'Аудиовызов';
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
    <div className={styles.preload__wrapper}>
      <h2 className={styles.preload__title}>{state.game}</h2>
      <h4 className={styles.preload__subtext}>Выберете уровень:</h4>
      <div className={styles.preload__links_wrapper}>
        {availableGroups.map((item) => {
          return (
            <Link
              className={styles.preload__link}
              to={`/${state?.game}`}
              state={{ page: randomNumber(0, 30), group: item }}
              key={item}
            >
              <div className={styles.preload__btn}>
                <PetalButton shadowColor="blue" size="s">
                  {Groups[item]}
                </PetalButton>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
