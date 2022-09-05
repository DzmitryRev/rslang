import { Routes, Route, Link } from 'react-router-dom';

import Header from './components/header/Header';
import { useAppSelector } from './hooks/storeHooks';

import Login from './pages/login/Login';
import Registration from './pages/registration/Registration';

import MainPage from './components/mainPage/MainPage';
import Textbook from './pages/textbook/Textbook';
import Sprint from './pages/sprint/Sprint';
import GamesPreload from './pages/games-preload/GamesPreload';
import Audiocall from './pages/audiocall/Audiocall';

function App() {
  const { isAuth, userId, token } = useAppSelector((store) => store.user);

  return (
    <div className="App">
      <div className="bg"></div>

      <Link to={'/game'} state={{ game: 'audiocall' }}>
        Audiocall
      </Link>
      <Link to={'/game'} state={{ game: 'sprint' }}>
        Sprint
      </Link>
      <Header list="menu__listMainPage" isAuth={isAuth} />
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/textbook" element={<Textbook />} />
        <Route path="/login" element={<Login />} />
        <Route path="/registration" element={<Registration />} />
        <Route path="/sprint" element={<Sprint isAuth={isAuth} userId={userId} token={token} />} />
        <Route path="/audiocall" element={<Audiocall isAuth={isAuth} userId={userId} token={token} />} />
        <Route path="/game" element={<GamesPreload />} />
      </Routes>
    </div>
  );
}

export default App;
