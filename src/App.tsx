import { Routes, Route } from 'react-router-dom';

import Header from './components/header/Header';
import { useAppSelector } from './hooks/storeHooks';

import Login from './pages/login/Login';
import Registration from './pages/registration/Registration';

import MainPage from './components/mainPage/MainPage';
import Textbook from './pages/textbook/Textbook';
import Sprint from './pages/sprint/Sprint';

function App() {

  const { isAuth } = useAppSelector((store) => store.user);

  return (
    <div className="App">
      <Header list="menu__listMainPage" isAuth={isAuth} />
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/textbook" element={<Textbook />} />
        <Route path="/login" element={<Login />} />
        <Route path="/registration" element={<Registration />} />
        <Route path="/sprint" element={<Sprint />} />
      </Routes>
    </div>
  );
}

export default App;
