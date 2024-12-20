import { createContext, useContext, useState } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
 

const AuthContext = createContext();
const URL = "http://localhost:5000/api/user"
 export const AuthProvider = ({ children }) => {
  const [isAuth, setisAuth] = useState(false);
    const login = async (userData) => {
      try {
          const res = await axios.post(`${URL}/login`, userData);
          if (res.status === 200) {
              Cookies.set('token', res.data.token);
              setisAuth(true);
              return true;  
          } else {
              setisAuth(false);
              return false;  
          }
      } catch (err) {
          console.log(err);
          return false;  
      }
  };

    const logout = async () => {
      try {
        const token = Cookies.get('token');
        console.log("LogoutToken",token)
        const res = await axios.post(`${URL}/logout`,{},{
          headers:{Authorization:`Bearer ${token}`}
        });
        if (res.status === 200) {
          Cookies.remove('token');  
          setisAuth(false); 
        } else {
          console.log('Failed to log out');
        }
      } catch (err) {
        console.log('Error logging out', err);
      }
    };    
  return (
    <AuthContext.Provider value={{ isAuth,setisAuth, login, logout}}>
      {children}
    </AuthContext.Provider>
  );
};
export const useAuth=() => useContext(AuthContext)