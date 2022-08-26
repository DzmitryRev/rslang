// import { Routes, Route } from 'react-router-dom';

import PrimaryButton from './components/primary-button/PrimaryButton';

function App() {
  return (
    <div className="App">
      <PrimaryButton color="blue" size="s">
        Войти
      </PrimaryButton>

      <PrimaryButton color="orange" size="m">
        Учить
      </PrimaryButton>

      <PrimaryButton color="orange" size="m">
        Зарегистрироваться
      </PrimaryButton>

      <PrimaryButton color="orange-gradient" size="l">
        Сложное
      </PrimaryButton>

      <PrimaryButton color="blue-gradient" size="l">
        Изучено
      </PrimaryButton>
      <PrimaryButton color="orange-gradient" size="xl">
        Неверно
      </PrimaryButton>

      <PrimaryButton color="blue-gradient" size="xl">
        Верно
      </PrimaryButton>
      {/* <Routes>
        <Route path="/" element={<Comp>main</Comp>} />
        <Route path="/signin" element={<Comp>sign in</Comp>} />
        <Route path="/signup" element={<Comp>signup</Comp>} />
        <Route path="/textbook" element={<Comp>textbook</Comp>} />
        <Route path="/statistic" element={<Comp>stat</Comp>} />
        <Route path="/games/audiocall" element={<Comp>audiocall</Comp>} />
        <Route path="/games/sprint" element={<Comp>sprint</Comp>} />
        <Route path="*" element={<Comp>404</Comp>} />
      </Routes> */}
    </div>
  );
}

export default App;
