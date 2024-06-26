import express from 'express'
import { isAuthenticated } from '../middlewares/auth.middleware.js';
const router = express.Router();

router.get('/',isAuthenticated, (req, res) => {
    res.render('index', {user: req.user});
});

export default router;
