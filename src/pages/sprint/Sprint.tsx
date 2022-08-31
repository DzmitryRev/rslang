import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import { API } from '../../api/api';

import { IWord } from '../../api/api.types';

type SprintLocationState = {
  group: number;
  page: number;
};

type SprintProps = {
  isAuth: boolean;
};

export default function Sprint({ isAuth }: SprintProps) {
  const location = useLocation();
  const state = location.state as SprintLocationState;
  const navigate = useNavigate();
  useEffect(() => {
    if (!state) {
      navigate('/');
    }
  }, [navigate, state]);
  //   const [words, setWords] = useState<IWord[]>([]);
  //   const [page, setPage] = useState<number>(state.page);

  //   console.log(state);
  //   useEffect(() => {
  //     if (isAuth) {
  //     } else {
  //     }
  //   }, [page]);
  return <div>
    <h1>{state?.page}</h1>
  </div>;
}
