import { User } from "../models/user.model.js";
import { verifyToken } from "../utils/index.js";

export const isAuthenticated = async (req, res, next) => {
    try {
        const token = req.cookies.token;

        if (!token) {
            // res.render('unauthorized')
            req.user = null
        } else {

            const decoded = verifyToken(token)


            const user = await User.findById(decoded.id).select('-password')


            req.user = user
        }
        next();
    } catch (error) {
        console.error(error, 'from middleware file isAuthenticated')
        res.render('unauthorized')
    }
}