import { React, useState } from 'react';
import MarioPortfolio from './components/MarioPortfolio';
import Nav from './components/Nav';


function App() {
  const [controlsEnabled, setControlsEnabled] = useState(true);
  return (
    <div>
      <Nav setControlsEnabled={setControlsEnabled} />

      <MarioPortfolio controlsEnabled={controlsEnabled} />
    </div>
  );
}

export default App;
