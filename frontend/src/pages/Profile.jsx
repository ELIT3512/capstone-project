import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUser } from "../contex/userContex";
import { useAuth } from "../contex/auth";


const Profile = () => {
    const { userData, getUser, deleteUser } = useUser();
    const { logout, setisAuth } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        getUser();
        console.log("Userdata", userData);
    }, [getUser,userData]);

    console.log("userDataProfilePage", userData);

    const handleDelete = () => {
        if (userData?._id) {
            deleteUser(userData._id);
            setisAuth(false);
            navigate("/");
        }
    };

    const handleLogout = () => {
        logout();
        setisAuth(false);
        navigate('/login');
    };

    const handleEdit = (claimId) => {
        navigate(`/editClaim/${claimId}`);
    };

    return (
        <div className="Profile">
            <img
                src="https://png.pngtree.com/png-clipart/20210915/ourmid/pngtree-user-avatar-placeholder-png-image_3918418.jpg"
                alt="profile-icon"
            />
            <div className="personal-info">
                <p><span>Email: </span> {userData?.username} </p>
            </div>
            <div>
                <h2>Your Claims</h2>
                {userData?.claims?.length > 0 ? (
                    userData.claims
                        .sort((a, b) => new Date(b.dateCreated) - new Date(a.dateCreated))
                        .map((claim, index) => (
                            <div key={index} className="claim-item">
                                <h3>Medical Provider: {claim.MedicalProvider}</h3>
                                <p>Description: {claim.DescriptionOfClaim}</p>
                                <p>Price: ${claim.Price}</p>
                                <p>Date Created: {claim.PostTime}</p>
                                <button onClick={() => handleEdit(claim._id)}>Edit</button>
                            </div>
                        ))
                ) : (
                    <p>No claims.</p>
                )}
            </div>
            <div className="button-container">
            <button className='logout-button' onClick={handleLogout}>Logout</button>
            <br></br>
            <button className='delete-button' onClick={handleDelete}>Delete Account</button>
            </div>
           
        </div>
    );
};

export default Profile;
