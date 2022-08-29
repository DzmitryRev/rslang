import { Routes, Route } from 'react-router-dom';

import Login from './pages/login/Login';
import Registration from './pages/registration/Registration';

import Textbook from './pages/textbook/Textbook';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/textbook" element={<Textbook />} />
        <Route path="/registration" element={<Registration />} />
        <Route path="/login" element={<Login />} />
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
