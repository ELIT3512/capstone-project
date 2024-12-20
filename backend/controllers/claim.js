const models = require('../models');
module.exports = {
    get: (req, res, next) => {
        models.Claim.find().populate('owner')
            .then((claims) => res.send(claims))
            .catch(next);
    },
    getById: (req, res, next) => {
        const id = req.params.id;
        models.Claim.findById(id).populate('owner')
            .then((claim) => {
                if (!claim) return res.status(404).send({ message: "Claim not found" });
                res.send(claim);
            })
            .catch(next);
    },
    post: {
        createClaim: (req, res, next) => {
            console.log("CCReqBody", req.body);
            console.log("Request Body:", req.body);
            console.log("Authenticated User:", req.user);
            const { MedicalProvider, DescriptionOfClaim, Price } = req.body;
            if (!MedicalProvider || !DescriptionOfClaim || !Price) {
                return res.status(400).json({ message: "Missing required fields" });
            }
            const { _id } = req.user; 
            models.Claim.create({
                MedicalProvider,
                DescriptionOfClaim,
                Price,
                owner: _id,
            })
                .then((createdClaim) => {
                    console.log("Claim created successfully:", createdClaim);
                    return models.User.updateOne(
                        { _id: _id },
                        { $push: { claims: createdClaim._id } }
                    ).then(() => createdClaim);
                })
                .then((createdClaim) => {
                    console.log("User updated successfully");
                    res.status(201).json({ message: "Claim created successfully", createdClaim });
                })
                .catch((error) => {
                    console.error("Error during claim creation:", error);
                    next(error); // Pass error to the global error handler
                });
        },
    },
    put: (req, res, next) => {
        const id = req.params.id;
        const { MedicalProvider, DescriptionOfClaim, Price } = req.body;

        models.Claim.findByIdAndUpdate(id, { MedicalProvider, DescriptionOfClaim, Price }, { new: true })
            .then((updatedClaim) => {
                if (!updatedClaim) return res.status(404).send({ message: "Claim not found" });
                res.send(updatedClaim);
            })
            .catch(next);
    },

    delete: (req, res, next) => {
        const id = req.params.id;

        models.Claim.findByIdAndDelete(id)
            .then((deletedClaim) => {
                if (!deletedClaim) return res.status(404).send({ message: "Claim not found" });
                res.send({ message: "Claim deleted successfully", deletedClaim });
            })
            .catch(next);
    }
};
