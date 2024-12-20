import { createContext, useContext, useState } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';
const ClaimContext = createContext();
const URL = "http://localhost:5000/api/claim";

export const ClaimProvider = ({ children }) => {
  const [claimData, setClaimData] = useState(null);
  const navigate = useNavigate()

  const CreateClaim = async (userClaim) => {
    const token = Cookies.get("token");
    console.log("CreateClaimToken-",token)

    try {
        const res = await axios.post(`${URL}/createClaim`, userClaim, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        console.log("Claimdata-Response",res.data)
        setClaimData(res.data);
        navigate("/profile");
    } catch (error) {
      console.error("Error creating claim:", error.response?.data || error.message);
        alert("Failed to create claim. Please try again.");
        navigate("*");
    }
};

  const GetClaimById = async (claimId) => {
    const token = Cookies.get('token'); 
    if (!token) {
        console.error('No token found');
        throw new Error('Unauthorized');
    }
    try {
      const res = await axios.get(`${URL}/${claimId}`,{
         headers: { Authorization: `Bearer ${token}` },
    });
     return res.data;
    } catch (error) {
      console.error("Error fetching claim:", error);
    }
  };

  const UpdateClaim = async (claimId, updatedClaim) => {
    const token = Cookies.get('token'); 
    if (!token) {
        console.error('No token found');
        throw new Error('Unauthorized');
    }
    try {
      const res = await axios.put(`${URL}/${claimId}`, updatedClaim,{
        headers: { Authorization: `Bearer ${token}` },
   });
      setClaimData(res.data);
    } catch (error) {
      console.error("Error updating claim:", error);
    }
  };

  const DeleteClaim = async (claimId) => {
    const token = Cookies.get('token'); 
    if (!token) {
        console.error('No token found');
        throw new Error('Unauthorized');
    }
    try {
      await axios.delete(`${URL}/${claimId}`,{
        headers: { Authorization: `Bearer ${token}` },
   });
      setClaimData(null);
    } catch (error) {
      console.error("Error deleting claim:", error);
    }
  };

  return (
    <ClaimContext.Provider value={{ claimData, setClaimData, CreateClaim, GetClaimById, UpdateClaim, DeleteClaim }}>
      {children}
    </ClaimContext.Provider>
  );
};

export const useClaim = () => useContext(ClaimContext);
