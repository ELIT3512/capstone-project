import React, { useState ,useEffect} from 'react';
import {useUser} from "../contex/userContex"
import {useClaim} from "../contex/claimContex"

const Claim = () => {
    const {userData,getUser} = useUser()
    const {CreateClaim} = useClaim()

    const [claimData, setClaimData] = useState({
        MedicalProvider: '',
        DescriptionOfClaim: '',
        Price: 0,
    });
    useEffect(() => {
        getUser(); 
    }, []);
    const handleChange = (e) => {
        const { name, value } = e.target;
        setClaimData({ ...claimData, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        CreateClaim(claimData)
        console.log('Submitting claim:', claimData);
    };

    return (
        <div className="file-claim-page">
            <h2>File an Insurance Claim</h2>
            <h3>User: {userData?.username || "Loading..."}</h3> 
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="MedicalProvider">Medical Provider:  </label>
                    <input
                        type="text"
                        id="MedicalProvider"
                        name="MedicalProvider"
                        value={claimData.MedicalProvider}
                        onChange={handleChange}
                        placeholder="Enter medical provider name"
                        required
                    />
                </div>
                
                <div className="form-group">
                    <label htmlFor="DescriptionOfClaim">Description of Claim:  </label>
                    <textarea
                        id="DescriptionOfClaim"
                        name="DescriptionOfClaim"
                        value={claimData.DescriptionOfClaim}
                        onChange={handleChange}
                        placeholder="Description of incident"
                        required
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="Price">Claim Amount:  </label>
                    <input
                        type="number"
                        id="Price"
                        name="Price"
                        value={claimData.Price}
                        onChange={handleChange}
                        placeholder="Enter claim amount"
                        required
                    />
                </div>

                <button type="submit" className="submit-button">Submit Claim</button>
            </form>
        </div>
    );
};

export default Claim;
