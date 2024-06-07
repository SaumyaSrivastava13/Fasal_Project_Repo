import { Route, Routes, Navigate } from "react-router-dom";
import Signup from "./Components/Signup";
import Login from "./Components/Login";
import Dashboard from "./Components/Dashboard";
import SearchBar from "./Components/SearchBar";


function App() {

    return (
        <Routes>
            <Route path="/dashboard" exact element={<Dashboard />} />
            <Route path="/signup" exact element={<Signup />} />
            <Route path="/login" exact element={<Login />} />
            <Route path="/" element={<Navigate replace to="/login" />} />
            <Route path="/search" exact element={<SearchBar />} />
        </Routes>
    );
}

export default App;
