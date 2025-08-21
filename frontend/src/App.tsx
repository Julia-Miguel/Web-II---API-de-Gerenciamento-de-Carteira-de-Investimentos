// src/App.tsx
import { Routes, Route } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import Navbar from './components/Navbar';
import InvestmentList from './pages/InvestmentList';
import InvestmentForm from './pages/InvestmentForm';
import Summary from './pages/Summary';
import './App.css';

function App() {
  return (
    <>
      <Navbar />
      <main className="main-content">
        <Container>
          <Routes>
            <Route path="/" element={<InvestmentList />} />
            <Route path="/investments" element={<InvestmentList />} />
            <Route path="/investments/new" element={<InvestmentForm />} />
            <Route path="/investments/edit/:id" element={<InvestmentForm />} />
            <Route path="/summary" element={<Summary />} />
          </Routes>
        </Container>
      </main>
    </>
  );
}

export default App;