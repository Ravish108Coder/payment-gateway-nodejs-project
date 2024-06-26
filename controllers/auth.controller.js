import { User } from "../models/user.model.js";
import { createToken, isValidPassword } from "../utils/index.js";

export const loginController = async (req, res) => {
    try {
        const { username, password } = req.body;
        if (!username || !password) {
            return res.render('auth/login', { errorMessage: 'Invalid Details' });
        }

        const userToBeFind = await User.findOne({ username: username });

        if (!userToBeFind) {
            return res.render('auth/login', { errorMessage: 'Need to Register First' });
        }

        const isValid = await isValidPassword(password, userToBeFind.password);

        if (!isValid || username !== userToBeFind.username) {
            return res.render('auth/login', { errorMessage: 'Invalid username or password' });
        }

        // Check payment status
        if (userToBeFind.paymentStatus === false) {
            return res.redirect(`/payment/${userToBeFind.id}`);
        }

        const token = createToken(userToBeFind.id, userToBeFind.username);

        res.cookie('token', token);
        res.redirect('/');
    } catch (error) {
        console.log(error.message);
        return res.render('auth/login', { errorMessage: error.message });
    }
};

export const signUpController = async (req, res) => {
    const { name, username, password, email, mobile, petroleumName, location } = req.body;
    try {
        // Check if user with given username or email already exists
        const existingUser = await User.findOne({ $or: [{ username }, { email }] });
        if (existingUser) {
            // If user exists, redirect to payment page
            if(existingUser.paymentStatus === false){
                return res.redirect(`/payment/${existingUser._id}`);
            }else{
                return res.render('auth/login', {errorMessage: 'Login if you have already account'})
            }
        }

        // If user does not exist, create a new user
        const newUser = new User({ name, username, password, email, mobile, petroleumName, location });
        await newUser.save();
        res.redirect(`/payment/${newUser._id}`);
    } catch (error) {
        res.render('auth/signup', { errorMessage: 'Error creating user. Please try again.' });
    }
};
