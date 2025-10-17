function isLoggedIn(){
    return(req, res, next) => {
        const userID = parseInt(req.headers["id"]); 

        if(isNaN(userID)) return res.status(401).json({ msg: "Unauthorized: User not logged in or invalid ID" });
        else{
            next();
        }
    };
};

module.exports = {
    isLoggedIn,
}