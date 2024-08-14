import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from './pages/Home/home';
import Login from './pages/Login/login';
import './global.css';

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/Home" element={<Home />} />
            </Routes>
        </BrowserRouter>
    );
}
export default App;
