import express from 'express'
import {User} from '../models/user.model.js'
import jwt from 'jsonwebtoken'
import { verifyToken } from '../utils/index.js';

const router = express.Router();

// for setting token and hiding sensitive details
router.get('/payment/success1', async (req, res) => {
    try {
        const {payment_id, userId} = req.query;
        const token = jwt.sign({userId: userId, paymentId: payment_id}, process.env.JWT_SECRET, {expiresIn : '1h'})
        res.redirect(`/payment/success?token=${token}`)
    } catch (error) {
        res.redirect('/auth/login')
    }
})


router.get('/payment/success', async (req, res) => {
    try {
        const { token } = req.query;
        const decoded = verifyToken(token)

        const {userId, paymentId} = decoded
        const user = await User.findOneAndUpdate(
            { _id: userId },
            { paymentStatus: true },
            { new: true }
        );
        return res.render('payment-success', {payment_id: paymentId, username: user.username});
    } catch (error) {
        console.log(error.message)
        return res.render('unauthorized')
    }
});

router.get('/payment/:userId', async (req, res) => {
    try {
        const user = await User.findById(req.params.userId);
        res.render('payment', { key_id: process.env.RAZORPAY_KEY_ID, user });
    } catch (error) {
        req.errorMessage = "invalid userId"
        console.log('hiiiiiiiiiiiiii')
        return res.redirect('/auth/login')
    }
    
});




export default router;
