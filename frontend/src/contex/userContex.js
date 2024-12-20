import { createContext, useContext, useState} from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
// Create a new context for user posts
const UserContext = createContext();
const URL = "http://localhost:5000/api/user"
export const UserProvider = ({ children }) => {
  const [userData, setUserData] = useState(null);
  const register = async(userData) => {
    const res = await axios.post(`${URL}/register`,userData);
    console.log(res,"res")
     };
  const getUser = async()=>{
    const token = Cookies.get('token');

    try {
      const res = await axios.get(`${URL}/user`, {
          headers: {
      
              Authorization: `Bearer ${token}`
          }
      });
      setUserData(res.data); // Set the retrieved user data to state
  } catch (error) {
      console.error("Get user error:", error);
  }
  }
  const deleteUser = async (userId) => {
    try {
        const token = Cookies.get('token'); // Assuming you store the token as 'token'
        await axios.delete(`http://localhost:5000/api/user/${userId}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
  
        Cookies.remove('token'); 
        console.log('User deleted successfully');
    } catch (error) {
        console.error('Error deleting user:', error);
    }
};

  return (
    <UserContext.Provider value={{ userData, setUserData,register,getUser,deleteUser }}>
      {children}
    </UserContext.Provider>
  );
};
export const useUser = () => useContext(UserContext);
