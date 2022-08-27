import { Routes, Route } from 'react-router-dom';

import { API } from './api/api';

import Textbook from './pages/Textbook';

function App() {
  API.signin({
    email: 'reer@mail.ru',
    password: '12345678',
  }).then((res) => console.log(res));
  return (
    <div className="App">
      <Routes>
        <Route path="/textbook/" element={<Textbook />} />
      </Routes>
      {/*
        <Route path="/" element={<Comp>main</Comp>} />
        <Route path="/signin" element={<Comp>sign in</Comp>} />
        <Route path="/signup" element={<Comp>signup</Comp>} />
        <Route path="/textbook" element={<Comp>textbook</Comp>} /> +++
        <Route path="/statistic" element={<Comp>stat</Comp>} />
        <Route path="/games/audiocall" element={<Comp>audiocall</Comp>} />
        <Route path="/games/sprint" element={<Comp>sprint</Comp>} />
        <Route path="*" element={<Comp>404</Comp>} />
    */}
    </div>
  );
}

export default App;
