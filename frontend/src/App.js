import logo from './logo.svg';
import { Routes, Route, Navigate } from "react-router-dom";
import './App.css';
import Home from "./pages/home"
import Login from "./pages/Login"
import Register from './pages/Register';
import NotFound from './pages/NotFound';
import Profile from "./pages/Profile"
import PrivateRoute from "./componets/PrivateRoutes"
import Navigation from './componets/Navigation';
import Claim from "./pages/Claim";
import EditClaim from "./pages/EditClaim"
function App() {
  return (
    <>
    <Navigation />
 
    <div className='App'>
      <Routes>
          <Route path='/' element={<Home />}/>
          <Route path="/register" element={<Register/>}/>
          <Route path="/login" element={<Login/>}/>
          <Route path="*" element={<NotFound/>}/>  
          <Route path="/" element={<PrivateRoute/>}>
          <Route path="profile" element={<Profile />}/>
          <Route path="claim" element={<Claim/>}/>
          <Route path="editClaim/:claimId" element={<EditClaim/>}/>
          </Route>
      </Routes>
  
    </div>
    </>
  );
}

export default App;
