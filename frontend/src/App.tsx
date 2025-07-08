import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Dashboard from './components/Dashboard/Dashboard';
import CameraView from './components/CameraView/CameraView';
import RecipeGenerator from './components/RecipeGenerator/RecipeGenerator';
import Navbar from './components/Navigation/Navbar';
import { FridgeProvider } from './context/FridgeProvider';
import Footer from './components/Footer/Footer'; // Import the Footer component
import './App.css';

function App() {
    return (
        <FridgeProvider>
            <Router>
                <div className="App">
                    <Navbar />
                    <main className="content">
                        <Routes>
                            <Route path="/" element={<Dashboard />} />
                            <Route path="/camera" element={<CameraView />} />
                            <Route path="/recipe" element={<RecipeGenerator />} />
                        </Routes>
                    </main>
                    <Footer /> {/* Include the Footer component */}
                </div>
            </Router>
        </FridgeProvider>
    );
}

export default App;
