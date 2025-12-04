import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginCallback from "./LoginCallback";

import RegisterUser from './RegisterUser';

function App() {
    return (
    <>
        <Router>
            <Routes>
                <Route path="/" element=
                    {
                        <div>
                            <h1>Mitt GUI</h1>
                            <RegisterUser />
                        </div>
                    }
                />
                <Route path="/callback" element={<LoginCallback />} />
                {/* dina andra routes */}
            </Routes>
        </Router>

        <div>
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
          <h1>Mitt GUI</h1>
          <RegisterUser/>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  )
}

export default App
