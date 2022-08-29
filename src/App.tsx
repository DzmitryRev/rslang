import { Routes, Route } from 'react-router-dom';

import MainPage from './components/mainPage/MainPage';
import Textbook from './pages/textbook/Textbook';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/textbook/" element={<Textbook />} />
      </Routes>
    </div>
  );
}

export default App;
