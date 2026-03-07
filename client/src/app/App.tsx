import { Fragment, useState } from 'react';

import reactLogo from '@/assets/react.svg';

// eslint-disable-next-line import-x/no-unresolved -- Vite serves this from public/
import viteLogo from '/vite.svg';
import './App.css';

const App = () => {
  const [count, setCount] = useState(0);

  return (
    <Fragment>
      <div>
        <a href="https://vite.dev" rel="noreferrer" target="_blank">
          <img alt="Vite logo" className="logo" src={viteLogo} />
        </a>
        <a href="https://react.dev" rel="noreferrer" target="_blank">
          <img alt="React logo" className="logo react" src={reactLogo} />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((prev) => prev + 1)} type="button">
          count is {count}
        </button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </Fragment>
  );
};

export default App;
