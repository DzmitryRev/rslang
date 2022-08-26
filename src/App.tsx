// import { Routes, Route } from 'react-router-dom';

import PetalButton from './components/petal-button/PetalButton';

function App() {
  return (
    <div className="App">
      <PetalButton shadowColor="blue" size="s" active={true}>A1</PetalButton>
      <PetalButton shadowColor="light-purple" size="m">Привет</PetalButton>
      <PetalButton shadowColor="purple" size="s">C2</PetalButton>
      <PetalButton shadowColor="pink" size="m">Привет</PetalButton>
      <PetalButton shadowColor="red" size="s">B1</PetalButton>
      <PetalButton shadowColor="yellow" size="m">Привет</PetalButton>
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
