import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import MainLayout from './components/MainLayout';

function App() {
  return (
    <BrowserRouter>
      <MainLayout>
        <Routes>
          <Route path="/" element={<Home />} />
          {/* <Route path="/login" element={<Login />} /> */}
          {/* <Route path="/register" element={<Register />} /> */}
          {/* <Route path="/about" element={<About />} /> */}
        </Routes>
      </MainLayout>
    </BrowserRouter>
  )
}

export default App
