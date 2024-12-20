const models = require('../models');
const config = require('../config/config');
const jwt = require('../utils/jwt');

module.exports = {
  get:  (req, res, next) => {
    const token = req.headers.authorization.split(' ')[1];
    console.log("getToken",token)
    jwt.verifyToken(token)
    .then(decoded =>{
    console.log("Decoded",decoded);
    const userId = decoded.id
    console.log("userId",userId)
    models.User.findById(userId).populate("claims")
    .then((user) => {
    if (!user) {
      return res.status(404).send('find user error');
    }
    res.send(user);
    })
    .catch(next);
    })
  },
  
      
  post: {
    
    register: (req, res, next) => {
                    console.log("req",req.body)
                    const { username, password } = req.body;
                    if (!username || !password) {
                        return res.status(400).json({ message: 'Username and password are required' });
                      }
                    models.User.create({ username, password })
                        .then((createdUser) => {
                            // Ensure the response is in JSON format
                            res.status(201).json({
                                message: 'User registered successfully',
                                user: createdUser
                            });
                        })
                        .catch((err) => {
                            // Handle error properly and send a JSON response for errors
                            res.status(400).json({ message: 'Error registering user', error: err.message });
                        });
                },         
    login: (req, res, next) => {
        const { username, password } = req.body;
    
        // Find the user by username
        models.User.findOne({ username })
            .then((user) => {
 
                if (!user) {
                    return res.status(404).json({ message: 'User not found. Please try again.' });
                }
                return user.matchPassword(password).then((match) => {
                    if (!match) {
                        return res.status(401).json({ message: 'Invalid password. Please try again.' });
                    }
                    const token = jwt.createToken({ id: user._id, username: user.username });
                    res.json({ token, user: user.doc });
                });
            })
            .catch(next);
            },
      
    logout: (req, res) => {
                const authHeader = req.headers.authorization;
                if (!authHeader) {
                    return res.status(401).send('No token provided');
                }
                const token = authHeader.split(' ')[1];
                console.log("Logout token:", token);
                res.clearCookie('token').send('Logout successfully!');
            }
        },
    put: (req, res, next) => {
                    const id = req.params.id;
                        // Find the user by ID
                        models.User.findById(id)
                            .then(user => {
                                if (!user) {
                                    return res.status(404).send('User not found');
                                }
                                                // Update user fields
                                if (req.body.username) user.username = req.body.username;
                                if (req.body.password) user.password = req.body.password;
                                     // Save the user (this triggers the pre-save hook)
                                return user.save();
                            })
                            .then(updatedUser => res.send(updatedUser))
                            .catch(next);
                    },
                 
    delete: (req, res, next) => {
        const id = req.params.id;
        models.User.deleteOne({ _id: id })
            .then((removedUser) => res.send(removedUser))
            .catch(next)
    }
  
 
};