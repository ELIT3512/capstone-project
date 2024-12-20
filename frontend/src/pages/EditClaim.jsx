import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useClaim } from '../contex/claimContex';

const EditClaim = () => {
    const { claimId } = useParams(); 
    const { GetClaimById, UpdateClaim, DeleteClaim } = useClaim(); 
    const navigate = useNavigate();

    const [claim, setClaim] = useState(null); 
    const [updatedClaim, setUpdatedClaim] = useState({
        MedicalProvider: '',
        DescriptionOfClaim: '',
        Price: '',
    });

    useEffect(() => {
        const fetchClaim = async () => {
            const fetchedClaim = await GetClaimById(claimId);
            setClaim(fetchedClaim);
        };
        fetchClaim();
        console.log("ClaimData",claim)
    }, [claimId, GetClaimById,claim]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setUpdatedClaim({ ...updatedClaim, [name]: value });
    };

    const handleUpdate = async () => {
        try {
            await UpdateClaim(claimId, updatedClaim); 
            alert('Claim updated successfully!');
            navigate('/profile'); 
        } catch (error) {
            console.error('Error updating claim:', error);
        }
    };

    const handleDelete = async () => {
        try {
            await DeleteClaim(claimId); 
            alert('Claim deleted successfully!');
            navigate('/profile'); 
        } catch (error) {
            console.error('Error deleting claim:', error);
        }
    };

    if (!claim) return <p>Loading claim details...</p>; // Show loading while fetching data

    return (
        <div className="edit-claim-page">
        <h2>Edit Claim</h2>
        <div className="claim-details">
          
            <h3>Medical Provider: <span style={{ color: "gray" }}>{claim.MedicalProvider}</span></h3>
            <input
                type="text"
                name="MedicalProvider"
                value={updatedClaim.MedicalProvider}
                onChange={handleInputChange}
                placeholder="Enter updated medical provider"
            />
    
            <h3>Description: <span style={{ color: "gray" }}>{claim.DescriptionOfClaim}</span></h3>
            <textarea
                name="DescriptionOfClaim"
                value={updatedClaim.DescriptionOfClaim}
                onChange={handleInputChange}
                placeholder="Enter updated description"
            />
    
    
            <h3>Price: <span style={{ color: "gray" }}>${claim.Price}</span></h3>
            <input
                type="number"
                name="Price"
                value={updatedClaim.Price}
                onChange={handleInputChange}
                placeholder="Enter updated price"
            />
    
            <h3>Date Created: <span style={{ color: "gray" }}>{claim.PostTime}</span></h3>
         
        </div>
    
        <div className="actions">
            <button onClick={handleUpdate}>Update</button>
        </div>
        <div className='delete-button-container'> 
            <button onClick={handleDelete} style={{ color: 'red' }}>
                Delete Claim
            </button>
        </div>
    </div>
    
    );
};

export default EditClaim;
