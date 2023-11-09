import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Home from "./Pages/Home"
import Navbar from "./Components/Navbar";
import SignUp from "./Pages/SignUp";
import Login from "./Pages/Login";
import useAuthenticationContextHook from "./Hooks/useAuthenticationContextHook"

function App() {
  const {user} = useAuthenticationContextHook();
  
  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
        <div className="Pages">
          <Routes>
            <Route path="/" exact element={user ? <Home /> : <Navigate to="/login"></Navigate>} />          
            <Route path="/signup" exact element={ !user ?<SignUp /> : <Navigate to ="/"></Navigate>} />
            <Route path="/login" exact element={ !user? <Login />: <Navigate to="/"></Navigate>} />
            </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
