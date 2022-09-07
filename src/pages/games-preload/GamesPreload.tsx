import { Link, useParams } from 'react-router-dom';

import PetalButton from '../../components/petal-button/PetalButton';
import { Groups } from '../../store/slices/textbookSlice';
import { availableGroups } from '../../utils/availableGroups';
import { randomNumber } from '../../utils/randomNumber';

import styles from './GamePreload.module.css';

export default function GamesPreload() {
  const params = useParams();

  return (
    <div className={styles.preload__wrapper}>
      <h2 className={styles.preload__title}>{params.gameName}</h2>
      <h4 className={styles.preload__subtext}>Выберете уровень:</h4>
      <div className={styles.preload__links_wrapper}>
        {availableGroups.map((item) => {
          return (
            <Link
              className={styles.preload__link}
              to={`/${params.gameName}`}
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
