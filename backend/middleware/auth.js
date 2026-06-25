import User from "../models/User.js";
import jwt from 'jsonwebtoken';

const protect = async(req,res,next) => {
    let token;
    if(req.headers.authorization && req.headers.authorization.startsWith("Bearer"))
        try {
            token = req.headers.authorization.split(" ")[1]  //we need the 2nd argument Authorization: 01Bearer 12<token> 

            const decoded = jwt.verify(token, process.env.JWT_SECRET)
            req.user = await User.findById(decoded.id).select("-password")
            return next();
        } catch (err) {
            console.error("Token verification failed: ",err.message);
            return res.status(401).json({message:"Not authorized, Token failed"})
        }
        return res.status(401).json({message:"Not authorized, Token failed"});

}
export { protect };