import logo from './logo.svg';
import './App.css';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import { Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Authenticate from './pages/Authenticate';
import PublicationPage from './pages/PublicationPage';
import MyPublications from './pages/user/MyPublications';
import NewPublication from './pages/user/NewPublication';
import CompletedEvaluations from './pages/evaluator/CompletedEvaluations';
import PendingEvaluations from './pages/evaluator/PendingEvaluations';
import Admin from './pages/admin/Admin';
import AllEvaluations from './pages/admin/AllEvaluations';
import AllPublications from './pages/admin/AllPublications';
import Users from './pages/admin/Users';
import Navbar from './components/Navbar';
import Footer from './components/Footer';

function App() {
  return (
    <div className="App">

      <Navbar />
      
      <Routes>

        <Route path="/" element={<Home />} />
        <Route path="/authenticate" element={<Authenticate />} />
        <Route path="/publication/:id" element={<PublicationPage />} />

        <Route path="/myPublications" element={<MyPublications />} />
        <Route path="/newPublication" element={<NewPublication />} />

        <Route path="/completed-evaluations" element={<CompletedEvaluations/>} />
        <Route path="/pending-evaluation" element={<PendingEvaluations/>} />

        <Route path="/admin" element={<Admin />} />
        <Route path="/allEvaluations" element={<AllEvaluations />} />
        <Route path="/allPublications" element={<AllPublications />} />
        <Route path="/users" element={<Users />} />

      </Routes>

      <Footer />

    </div>
  );
}

export default App;
