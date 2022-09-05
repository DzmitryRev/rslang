import { Routes, Route, Link } from 'react-router-dom';

import { useEffect } from 'react';

import Header from './components/header/Header';
import { useAppDispatch, useAppSelector } from './hooks/storeHooks';

import Login from './pages/login/Login';
import Registration from './pages/registration/Registration';

import MainPage from './pages/main-page/MainPage';
import Textbook from './pages/textbook/Textbook';
import Sprint from './pages/sprint/Sprint';
import GamesPreload from './pages/games-preload/GamesPreload';
import Audiocall from './pages/audiocall/Audiocall';
import { setUser } from './store/slices/userSlice';

function App() {
  const dispach = useAppDispatch();

  const { isAuth, userId, token } = useAppSelector((store) => store.user);

  useEffect(() => {
    if (!isAuth && localStorage.getItem('rev-user-settings')) {
      dispach(setUser(JSON.parse(localStorage.getItem('rev-user-settings') || '')));
    }
  }, []);

  return (
    <div className="App">
      <div className="bg"></div>

      <Link to={'/game'} state={{ game: 'audiocall' }}>
        Audiocall
      </Link>
      <Link to={'/game'} state={{ game: 'sprint' }}>
        Sprint
      </Link>
      <Header isAuth={isAuth} />
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/textbook" element={<Textbook />} />
        <Route path="/login" element={<Login />} />
        <Route path="/registration" element={<Registration />} />
        <Route path="/sprint" element={<Sprint isAuth={isAuth} userId={userId} token={token} />} />
        <Route
          path="/audiocall"
          element={<Audiocall isAuth={isAuth} userId={userId} token={token} />}
        />
        <Route path="/game" element={<GamesPreload />} />
      </Routes>
    </div>
  );
}

export default App;
