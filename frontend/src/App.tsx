import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import MainLayout from './components/MainLayout';
import Registration from './pages/Registration';
import Dashboard from './pages/Dashboard';

function App() {
  return (
    <BrowserRouter>
      <MainLayout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<Registration />} />
          <Route path="/dashboard" element={<Dashboard />} />
          {/* <Route path="" element={<Register />} /> */}
          {/* <Route path="/about" element={<About />} /> */}
        </Routes>
      </MainLayout>
    </BrowserRouter>
  )
}

export default App
