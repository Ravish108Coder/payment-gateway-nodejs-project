import express from 'express';
import { loginController, signUpController } from '../controllers/auth.controller.js';

const router = express.Router();

router.get('/login', (req, res) => {
    const alreadyPresentTtoken = req.cookies.token;
    if(alreadyPresentTtoken) return res.redirect('/')
    res.render('auth/login');
});

router.post('/login', loginController);

router.get('/signup', (req, res) => {
    const alreadyPresentTtoken = req.cookies.token;
    if(alreadyPresentTtoken) return res.redirect('/')
    res.render('auth/signup');
});

router.post('/signup', signUpController);

router.post('/logout', async(req, res) => {
    res.clearCookie('token')

    res.render('auth/login')
})

export default router;
