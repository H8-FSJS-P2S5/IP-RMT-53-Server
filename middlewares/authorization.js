const UserAuthorization = async (req, res, next) => {
    const { id: userId } = req.params; 
    const authenticatedUserId = req.user.id; // Authenticated user's ID
  
    if (userId !== authenticatedUserId) {
      return res.status(403).json({ message: "Access denied: You cannot access this user's anime list." });
    }
  
    next();
};

module.exports = UserAuthorization;
